import { describe, expect, it } from 'vitest'
import { CompatModelClient } from './compat-model-client.js'
import type { ModelCapabilityMetadata } from '../../contracts/capabilities.js'
import type { ModelEndpointFormat } from '../../contracts/model-endpoint-format.js'
import type { ModelRequest, ModelStreamChunk } from '../../ports/model-client.js'
import type { TurnItem } from '../../contracts/items.js'

const SHOT = 'SCREENSHOTBASE64DATA'

type CapturedCall = { url: string; body: Record<string, unknown> }

function caps(vision: boolean, endpointFormat?: ModelEndpointFormat): (model: string) => ModelCapabilityMetadata {
  return (model) => ({
    id: model,
    inputModalities: vision ? ['text', 'image'] : ['text'],
    outputModalities: ['text'],
    supportsToolCalling: true,
    messageParts: vision ? ['text', 'image_url'] : ['text'],
    ...(endpointFormat ? { endpointFormat } : {})
  })
}

function fakeFetch(calls: CapturedCall[]): typeof fetch {
  return (async (url: string, init: { body: string }) => {
    const target = String(url)
    calls.push({ url: target, body: JSON.parse(init.body) as Record<string, unknown> })
    const json = target.endsWith('/messages')
      ? { content: [{ type: 'text', text: 'ok' }], stop_reason: 'end_turn' }
      : { choices: [{ index: 0, finish_reason: 'stop', message: { content: 'ok' } }] }
    return new Response(JSON.stringify(json), { status: 200, headers: { 'content-type': 'application/json' } })
  }) as unknown as typeof fetch
}

function screenshotHistory(): TurnItem[] {
  const base = { turnId: 'u1', threadId: 't1', status: 'completed' as const, createdAt: '2026-01-01T00:00:00.000Z' }
  const toolCall: TurnItem = {
    ...base,
    id: 'i1',
    role: 'assistant',
    kind: 'tool_call',
    toolName: 'computer_use',
    callId: 'c1',
    toolKind: 'command_execution',
    arguments: { action: 'screenshot' }
  }
  const toolResult: TurnItem = {
    ...base,
    id: 'i2',
    role: 'tool',
    kind: 'tool_result',
    toolName: 'computer_use',
    callId: 'c1',
    toolKind: 'command_execution',
    isError: false,
    output: {
      kind: 'computer_screenshot',
      action: 'screenshot',
      screen: { width: 1280, height: 800 },
      images: [{ mime_type: 'image/png', data_base64: SHOT, width: 1280, height: 800 }]
    }
  }
  return [toolCall, toolResult]
}

function request(model: string): ModelRequest {
  return {
    threadId: 't1',
    turnId: 'u1',
    model,
    systemPrompt: 'sys',
    prefix: [],
    history: screenshotHistory(),
    tools: [],
    abortSignal: new AbortController().signal
  }
}

async function drain(iterable: AsyncIterable<ModelStreamChunk>): Promise<void> {
  for await (const _ of iterable) void _
}

function jsonString(value: unknown): string {
  return JSON.stringify(value)
}

describe('CompatModelClient tool-result image forwarding', () => {
  it('forwards a screenshot as an image_url user message for a vision model (chat_completions)', async () => {
    const calls: CapturedCall[] = []
    const client = new CompatModelClient({
      baseUrl: 'https://api.example.com/v1',
      apiKey: 'sk',
      model: 'vision-model',
      endpointFormat: 'chat_completions',
      nonStreaming: true,
      fetchImpl: fakeFetch(calls),
      modelCapabilities: caps(true)
    })
    await drain(client.stream(request('vision-model')))
    const messages = calls[0].body.messages as Array<{ role: string; content: unknown }>
    // The tool message stays text-only; the image rides in a following user message.
    const toolMsg = messages.find((m) => m.role === 'tool')
    expect(typeof toolMsg?.content).toBe('string')
    expect(jsonString(toolMsg?.content)).not.toContain(SHOT)
    const userImg = messages.find(
      (m) => m.role === 'user' && Array.isArray(m.content) &&
        (m.content as Array<{ type: string }>).some((p) => p.type === 'image_url')
    )
    expect(userImg).toBeDefined()
    expect(jsonString(userImg?.content)).toContain(`data:image/png;base64,${SHOT}`)
  })

  it('embeds the screenshot in the tool_result block for a vision model (anthropic messages)', async () => {
    const calls: CapturedCall[] = []
    const client = new CompatModelClient({
      baseUrl: 'https://api.example.com/v1',
      apiKey: 'sk',
      model: 'claude-vision',
      endpointFormat: 'messages',
      nonStreaming: true,
      fetchImpl: fakeFetch(calls),
      modelCapabilities: caps(true, 'messages')
    })
    await drain(client.stream(request('claude-vision')))
    expect(calls[0].url).toMatch(/\/messages$/)
    const body = jsonString(calls[0].body)
    // Anthropic tool_result carries an inline base64 image source.
    expect(body).toContain('tool_result')
    expect(body).toContain(`"data":"${SHOT}"`)
    expect(body).toContain('"media_type":"image/png"')
  })

  it('does NOT send image parts to a non-vision model (text-only tool result)', async () => {
    const calls: CapturedCall[] = []
    const client = new CompatModelClient({
      baseUrl: 'https://api.example.com/v1',
      apiKey: 'sk',
      model: 'text-model',
      endpointFormat: 'chat_completions',
      nonStreaming: true,
      fetchImpl: fakeFetch(calls),
      modelCapabilities: caps(false)
    })
    await drain(client.stream(request('text-model')))
    const body = jsonString(calls[0].body)
    expect(body).not.toContain('image_url')
    expect(body).not.toContain(SHOT)
    // Metadata (the screen size) still reaches the model as text.
    expect(body).toContain('computer_screenshot')
  })
})
