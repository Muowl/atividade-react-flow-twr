import type {
  FunnelStageData,
  FunnelStageDefinition,
  FunnelStageMetric,
  FunnelStageNode,
  FunnelStageType,
} from '@/features/funnel/types'

export const stageDefinitions: Record<FunnelStageType, FunnelStageDefinition> = {
  ad: {
    type: 'ad',
    label: 'Anúncio',
    kind: 'Aquisição',
    accent: '#6247AA',
    metrics: [
      {
        label: 'Impressões',
        sampleValues: ['128k', '96k', '142k', '108k'],
      },
      {
        label: 'Cliques',
        sampleValues: ['12,4k', '9,8k', '15,1k', '11,6k'],
      },
    ],
    canvasX: 40,
  },
  'landing-page': {
    type: 'landing-page',
    label: 'Landing Page',
    kind: 'Conversão inicial',
    accent: '#A06CD5',
    metrics: [
      {
        label: 'Visitas',
        sampleValues: ['12,4k', '9,8k', '15,1k', '11,6k'],
      },
      {
        label: 'Leads',
        sampleValues: ['1,8k', '1,2k', '2,1k', '1,5k'],
      },
    ],
    canvasX: 320,
  },
  form: {
    type: 'form',
    label: 'Formulário',
    kind: 'Captação',
    accent: '#8B5FBF',
    metrics: [
      {
        label: 'Leads',
        sampleValues: ['1,8k', '1,2k', '2,1k', '1,5k'],
      },
      {
        label: 'Qualificados',
        sampleValues: ['620', '410', '730', '540'],
      },
    ],
    canvasX: 620,
  },
  checkout: {
    type: 'checkout',
    label: 'Checkout',
    kind: 'Oferta',
    accent: '#102B3F',
    metrics: [
      {
        label: 'Inícios',
        sampleValues: ['620', '410', '730', '540'],
      },
      {
        label: 'Compras',
        sampleValues: ['214', '176', '248', '201'],
      },
    ],
    canvasX: 920,
  },
  'thank-you': {
    type: 'thank-you',
    label: 'Página de Obrigado',
    kind: 'Pós-conversão',
    accent: '#062726',
    metrics: [
      {
        label: 'Vendas',
        sampleValues: ['214', '176', '248', '201'],
      },
      {
        label: 'Receita',
        sampleValues: ['R$ 18,1k', 'R$ 14,9k', 'R$ 21,4k', 'R$ 17,2k'],
      },
    ],
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
  positionY?: number
  presetIndex?: number
  title?: string
  metrics?: string[]
}

function buildMetrics(
  definition: FunnelStageDefinition,
  presetIndex: number,
  overrideMetrics?: string[],
): FunnelStageMetric[] {
  return definition.metrics.map((metric, metricIndex) => ({
    label: metric.label,
    value:
      overrideMetrics?.[metricIndex] ??
      metric.sampleValues[presetIndex % metric.sampleValues.length],
  }))
}

export function createStageData(
  stageType: FunnelStageType,
  presetIndex: number,
  options?: {
    title?: string
    metrics?: string[]
  },
): FunnelStageData {
  const definition = stageDefinitions[stageType]

  return {
    stageType,
    title: options?.title ?? definition.label,
    kind: definition.kind,
    accent: definition.accent,
    metrics: buildMetrics(definition, presetIndex, options?.metrics),
  }
}

export function createStageNode(
  stageType: FunnelStageType,
  existingNodes: FunnelStageNode[],
  options: CreateStageNodeOptions = {},
) {
  const definition = stageDefinitions[stageType]
  const stageNodes = existingNodes.filter((node) => node.data.stageType === stageType)
  const stageCount = stageNodes.length + 1
  const stackedRow = Math.max(stageNodes.length - 1, 0)
  const presetIndex = options.presetIndex ?? stageNodes.length

  return {
    id: `${stageType}-${stageCount}-${existingNodes.length + 1}`,
    type: 'stage',
    position: {
      x: definition.canvasX,
      y: options.positionY ?? 360 + stackedRow * 190,
    },
    data: createStageData(stageType, presetIndex, {
      title:
        options.title ??
        (stageCount > 1 ? `${definition.label} ${stageCount}` : definition.label),
      metrics: options.metrics,
    }),
  } satisfies FunnelStageNode
}
