import { MarkerType, type Edge } from '@xyflow/react'

import { createStageNode } from '@/features/funnel/data/stage-catalog'
import type { FunnelStageNode } from '@/features/funnel/types'

export const initialNodes: FunnelStageNode[] = [
  createStageNode('ad', [], {
    index: 0,
    positionY: 180,
    metricValue: '12,4k',
  }),
  createStageNode('landing-page', [], {
    index: 0,
    positionY: 80,
    metricValue: '7,9k',
  }),
  createStageNode('form', [], {
    index: 0,
    positionY: 180,
    metricValue: '1,8k',
  }),
  createStageNode('checkout', [], {
    index: 0,
    positionY: 80,
    metricValue: '620',
  }),
  createStageNode('thank-you', [], {
    index: 0,
    positionY: 180,
    metricValue: '214',
  }),
]

export const initialEdges: Edge[] = [
  {
    id: 'ad-landing-page',
    source: initialNodes[0].id,
    target: initialNodes[1].id,
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'landing-page-form',
    source: initialNodes[1].id,
    target: initialNodes[2].id,
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'form-checkout',
    source: initialNodes[2].id,
    target: initialNodes[3].id,
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'checkout-thank-you',
    source: initialNodes[3].id,
    target: initialNodes[4].id,
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
]
