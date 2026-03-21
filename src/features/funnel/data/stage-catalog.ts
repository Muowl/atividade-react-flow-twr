import type {
  FunnelStageDefinition,
  FunnelStageNode,
  FunnelStageType,
} from '@/features/funnel/types'

export const stageDefinitions: Record<FunnelStageType, FunnelStageDefinition> = {
  ad: {
    type: 'ad',
    label: 'Anúncio',
    kind: 'Aquisição',
    metricLabel: 'Cliques',
    accent: '#6247AA',
    sampleValues: ['12,4k', '9,8k', '15,1k', '11,6k'],
    canvasX: 40,
  },
  'landing-page': {
    type: 'landing-page',
    label: 'Landing Page',
    kind: 'Conversão inicial',
    metricLabel: 'Visitas',
    accent: '#A06CD5',
    sampleValues: ['7,9k', '6,3k', '8,8k', '7,1k'],
    canvasX: 320,
  },
  form: {
    type: 'form',
    label: 'Formulário',
    kind: 'Captação',
    metricLabel: 'Leads',
    accent: '#8B5FBF',
    sampleValues: ['1,8k', '1,2k', '2,1k', '1,5k'],
    canvasX: 620,
  },
  checkout: {
    type: 'checkout',
    label: 'Checkout',
    kind: 'Oferta',
    metricLabel: 'Inícios',
    accent: '#102B3F',
    sampleValues: ['620', '410', '730', '540'],
    canvasX: 920,
  },
  'thank-you': {
    type: 'thank-you',
    label: 'Página de Obrigado',
    kind: 'Pós-conversão',
    metricLabel: 'Vendas',
    accent: '#062726',
    sampleValues: ['214', '176', '248', '201'],
    canvasX: 1220,
  },
}

export const creatableStageTypes: FunnelStageType[] = [
  'ad',
  'landing-page',
  'form',
  'checkout',
]

type CreateStageNodeOptions = {
  index: number
  positionY?: number
  title?: string
  metricValue?: string
}

export function createStageNode(
  stageType: FunnelStageType,
  existingNodes: FunnelStageNode[],
  options: CreateStageNodeOptions = { index: 0 },
) {
  const definition = stageDefinitions[stageType]
  const stageNodes = existingNodes.filter((node) => node.data.stageType === stageType)
  const stageCount = stageNodes.length + 1
  const stackedRow = Math.max(stageNodes.length - 1, 0)
  const sampleValue =
    options.metricValue ??
    definition.sampleValues[options.index % definition.sampleValues.length]

  return {
    id: `${stageType}-${stageCount}-${existingNodes.length + 1}`,
    type: 'stage',
    position: {
      x: definition.canvasX,
      y: options.positionY ?? 360 + stackedRow * 190,
    },
    data: {
      stageType,
      title: options.title ?? (stageCount > 1 ? `${definition.label} ${stageCount}` : definition.label),
      kind: definition.kind,
      metricLabel: definition.metricLabel,
      metricValue: sampleValue,
      accent: definition.accent,
    },
  } satisfies FunnelStageNode
}
