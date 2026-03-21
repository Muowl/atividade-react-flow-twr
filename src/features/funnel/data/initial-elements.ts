import { MarkerType, type Edge } from '@xyflow/react'

import type { FunnelStageNode } from '@/features/funnel/types'

export const initialNodes: FunnelStageNode[] = [
  {
    id: 'ad',
    type: 'stage',
    position: { x: 40, y: 180 },
    data: {
      title: 'Anúncio',
      kind: 'Aquisição',
      metricLabel: 'Cliques',
      metricValue: '12,4k',
      accent: '#6247AA',
    },
  },
  {
    id: 'landing-page',
    type: 'stage',
    position: { x: 320, y: 80 },
    data: {
      title: 'Landing Page',
      kind: 'Conversão inicial',
      metricLabel: 'Visitas',
      metricValue: '7,9k',
      accent: '#A06CD5',
    },
  },
  {
    id: 'form',
    type: 'stage',
    position: { x: 620, y: 180 },
    data: {
      title: 'Formulário',
      kind: 'Captação',
      metricLabel: 'Leads',
      metricValue: '1,8k',
      accent: '#8B5FBF',
    },
  },
  {
    id: 'checkout',
    type: 'stage',
    position: { x: 920, y: 80 },
    data: {
      title: 'Checkout',
      kind: 'Oferta',
      metricLabel: 'Inícios',
      metricValue: '620',
      accent: '#102B3F',
    },
  },
  {
    id: 'thank-you',
    type: 'stage',
    position: { x: 1220, y: 180 },
    data: {
      title: 'Página de Obrigado',
      kind: 'Pós-conversão',
      metricLabel: 'Vendas',
      metricValue: '214',
      accent: '#062726',
    },
  },
]

export const initialEdges: Edge[] = [
  {
    id: 'ad-landing-page',
    source: 'ad',
    target: 'landing-page',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'landing-page-form',
    source: 'landing-page',
    target: 'form',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'form-checkout',
    source: 'form',
    target: 'checkout',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'checkout-thank-you',
    source: 'checkout',
    target: 'thank-you',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
]
