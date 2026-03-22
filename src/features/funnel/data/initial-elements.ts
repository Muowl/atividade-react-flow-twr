import { MarkerType, type Edge } from '@xyflow/react'

import { createStageNode } from '@/features/funnel/data/stage-catalog'
import type { FunnelStageNode } from '@/features/funnel/types'

export const initialNodes: FunnelStageNode[] = [
  createStageNode('ad', [], {
    positionY: 180,
    presetIndex: 0,
  }),
  createStageNode('landing-page', [], {
    positionY: 80,
    presetIndex: 0,
  }),
  createStageNode('form', [], {
    positionY: 180,
    presetIndex: 0,
  }),
  createStageNode('checkout', [], {
    positionY: 80,
    presetIndex: 0,
  }),
  createStageNode('thank-you', [], {
    positionY: 180,
    presetIndex: 0,
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
