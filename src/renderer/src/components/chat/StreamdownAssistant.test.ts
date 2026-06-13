import { describe, expect, it } from 'vitest'
import { STREAMING_ANIMATED } from './StreamdownAssistant'

describe('STREAMING_ANIMATED', () => {
  it('never staggers chars — staggering queues bursty SSE chunks and looks choppy', () => {
    expect(STREAMING_ANIMATED).not.toHaveProperty('stagger')
  })

  it('keeps a long overlap window so consecutive chunks blend into one reveal', () => {
    expect(STREAMING_ANIMATED.duration).toBeGreaterThanOrEqual(400)
    expect(STREAMING_ANIMATED.sep).toBe('char')
  })
})
