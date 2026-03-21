import type { Node } from '@xyflow/react'

export type FunnelStageData = {
  title: string
  kind: string
  metricLabel: string
  metricValue: string
  accent: string
}

export type FunnelStageNode = Node<FunnelStageData, 'stage'>
