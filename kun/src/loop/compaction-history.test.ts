import { describe, expect, it } from 'vitest'
import { makeAssistantTextItem, makeCompactionItem, makeUserItem } from '../domain/item.js'
import {
  effectiveHistoryAfterLatestCompaction,
  insertCompactionIntoVisibleHistory
} from './compaction-history.js'

describe('compaction history projection', () => {
  it('keeps the full visible transcript while projecting model history from the latest compaction', () => {
    const threadId = 'thread_1'
    const turnId = 'turn_1'
    const headA = makeUserItem({ id: 'item_head_a', threadId, turnId, text: 'old user context' })
    const headB = makeAssistantTextItem({
      id: 'item_head_b',
      threadId,
      turnId,
      text: 'old assistant context',
      status: 'completed'
    })
    const previousSummary = makeCompactionItem({
      id: 'compaction_previous',
      threadId,
      turnId,
      summary: 'previous summary',
      replacedTokens: 100,
      pinnedConstraints: []
    })
    const tailA = makeUserItem({ id: 'item_tail_a', threadId, turnId, text: 'recent user context' })
    const tailB = makeAssistantTextItem({
      id: 'item_tail_b',
      threadId,
      turnId,
      text: 'recent assistant context',
      status: 'completed'
    })
    const nextSummary = makeCompactionItem({
      id: 'compaction_next',
      threadId,
      turnId,
      summary: 'next summary',
      replacedTokens: 200,
      pinnedConstraints: []
    })

    const visible = insertCompactionIntoVisibleHistory({
      visibleItems: [headA, headB, previousSummary, tailA, tailB],
      compactedItems: [nextSummary, tailA, tailB],
      summaryItem: nextSummary
    })

    expect(visible.map((item) => item.id)).toEqual([
      'item_head_a',
      'item_head_b',
      'compaction_previous',
      'compaction_next',
      'item_tail_a',
      'item_tail_b'
    ])
    expect(effectiveHistoryAfterLatestCompaction(visible).map((item) => item.id)).toEqual([
      'compaction_next',
      'item_tail_a',
      'item_tail_b'
    ])
  })
})
