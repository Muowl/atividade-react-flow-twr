import type { Node } from '@xyflow/react'

export type FunnelStageType =
  | 'ad'
  | 'landing-page'
  | 'form'
  | 'checkout'
  | 'thank-you'

export type FunnelStageMetric = {
  label: string
  value: string
}

export type FunnelStageData = {
  stageType: FunnelStageType
  title: string
  kind: string
  accent: string
  metrics: FunnelStageMetric[]
}

export type FunnelStageDefinition = {
  type: FunnelStageType
  label: string
  kind: string
  accent: string
  metrics: Array<{
    label: string
    sampleValues: string[]
  }>
  canvasX: number
}

export type FunnelStageNode = Node<FunnelStageData, 'stage'>
