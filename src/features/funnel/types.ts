import type { Node } from '@xyflow/react'

export type FunnelStageType =
  | 'ad'
  | 'landing-page'
  | 'form'
  | 'checkout'
  | 'thank-you'

export type FunnelStageData = {
  stageType: FunnelStageType
  title: string
  kind: string
  metricLabel: string
  metricValue: string
  accent: string
}

export type FunnelStageDefinition = {
  type: FunnelStageType
  label: string
  kind: string
  metricLabel: string
  accent: string
  sampleValues: string[]
  canvasX: number
}

export type FunnelStageNode = Node<FunnelStageData, 'stage'>
