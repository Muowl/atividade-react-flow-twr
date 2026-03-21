import type { Edge } from '@xyflow/react'

import { initialEdges, initialNodes } from '@/features/funnel/data/initial-elements'
import type { FunnelStageNode } from '@/features/funnel/types'

const STORAGE_KEY = 'atividade-react-flow-twr:funnel-flow'

type StoredFlow = {
  edges: Edge[]
  nodes: FunnelStageNode[]
}

export function getDefaultFlow(): StoredFlow {
  return {
    nodes: initialNodes,
    edges: initialEdges,
  }
}

export function readStoredFlow(): StoredFlow {
  if (typeof window === 'undefined') {
    return getDefaultFlow()
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)

    if (!rawValue) {
      return getDefaultFlow()
    }

    const parsedValue = JSON.parse(rawValue) as Partial<StoredFlow>

    if (!Array.isArray(parsedValue.nodes) || !Array.isArray(parsedValue.edges)) {
      return getDefaultFlow()
    }

    return {
      nodes: parsedValue.nodes as FunnelStageNode[],
      edges: parsedValue.edges as Edge[],
    }
  } catch {
    return getDefaultFlow()
  }
}

export function writeStoredFlow(flow: StoredFlow) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(flow))
}

export function clearStoredFlow() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}
