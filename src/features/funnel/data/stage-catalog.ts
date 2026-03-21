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
        label: 'Cliques',
        sampleValues: ['12,4k', '9,8k', '15,1k', '11,6k'],
      },
      {
        label: 'CTR',
        sampleValues: ['3,8%', '2,9%', '4,2%', '3,4%'],
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
        sampleValues: ['7,9k', '6,3k', '8,8k', '7,1k'],
      },
      {
        label: 'Conversões',
        sampleValues: ['1,2k', '980', '1,5k', '1,1k'],
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
        label: 'Taxa envio',
        sampleValues: ['22%', '19%', '24%', '21%'],
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
        sampleValues: ['R$ 18k', 'R$ 14k', 'R$ 21k', 'R$ 16k'],
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
  index: number
  positionY?: number
  title?: string
  metrics?: string[]
}

function buildMetrics(
  definition: FunnelStageDefinition,
  index: number,
  overrideMetrics?: string[],
): FunnelStageMetric[] {
  return definition.metrics.map((metric, metricIndex) => ({
    label: metric.label,
    value:
      overrideMetrics?.[metricIndex] ??
      metric.sampleValues[index % metric.sampleValues.length],
  }))
}

export function createStageData(
  stageType: FunnelStageType,
  index: number,
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
    metrics: buildMetrics(definition, index, options?.metrics),
  }
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

  return {
    id: `${stageType}-${stageCount}-${existingNodes.length + 1}`,
    type: 'stage',
    position: {
      x: definition.canvasX,
      y: options.positionY ?? 360 + stackedRow * 190,
    },
    data: createStageData(stageType, options.index, {
      title:
        options.title ??
        (stageCount > 1 ? `${definition.label} ${stageCount}` : definition.label),
      metrics: options.metrics,
    }),
  } satisfies FunnelStageNode
}
