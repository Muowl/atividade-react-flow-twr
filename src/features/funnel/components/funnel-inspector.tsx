import type { Edge } from '@xyflow/react'
import { Link2, PencilLine, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { stageDefinitions } from '@/features/funnel/data/stage-catalog'
import type { FunnelStageNode, FunnelStageType } from '@/features/funnel/types'

type FunnelInspectorProps = {
  nodes: FunnelStageNode[]
  selectedEdge: Edge | null
  selectedNode: FunnelStageNode | null
  onDeleteSelectedEdge: () => void
  onDeleteSelectedNode: () => void
  onSelectedMetricChange: (metricIndex: number, value: string) => void
  onSelectedNodeNameChange: (value: string) => void
  onSelectedNodeTypeChange: (stageType: FunnelStageType) => void
}

export function FunnelInspector({
  nodes,
  selectedEdge,
  selectedNode,
  onDeleteSelectedEdge,
  onDeleteSelectedNode,
  onSelectedMetricChange,
  onSelectedNodeNameChange,
  onSelectedNodeTypeChange,
}: FunnelInspectorProps) {
  return (
    <Card className="bg-[#ffcf56]">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-foreground">
          {selectedEdge ? (
            <Link2 className="size-4 text-accent" />
          ) : (
            <PencilLine className="size-4 text-accent" />
          )}
          <CardTitle>{selectedEdge ? 'Painel da conexão' : 'Painel da etapa'}</CardTitle>
          <Badge className="bg-[#fff6ec] text-[#102b3f]">
            {selectedNode
              ? 'Etapa selecionada'
              : selectedEdge
                ? 'Conexão selecionada'
                : 'Sem seleção'}
          </Badge>
        </div>
        <CardDescription>
          {selectedNode
            ? 'Atualize nome, tipo e métricas simuladas da etapa.'
            : selectedEdge
              ? 'Revise a conexão selecionada ou remova-a.'
              : 'Selecione um nó ou conexão no canvas para abrir ações.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedNode ? (
          <>
            <div className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-3 text-foreground">
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Etapa ativa
              </span>
              <strong className="mt-1 block text-base font-bold">
                {selectedNode.data.title}
              </strong>
            </div>

            <div className="space-y-2">
              <label
                className="block text-[11px] font-bold uppercase tracking-[0.12em] text-foreground"
                htmlFor="stage-name"
              >
                Nome da etapa
              </label>
              <input
                id="stage-name"
                className="neo-field"
                value={selectedNode.data.title}
                onChange={(event) => onSelectedNodeNameChange(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-[11px] font-bold uppercase tracking-[0.12em] text-foreground"
                htmlFor="stage-type"
              >
                Tipo da etapa
              </label>
              <select
                id="stage-type"
                className="neo-field"
                value={selectedNode.data.stageType}
                onChange={(event) =>
                  onSelectedNodeTypeChange(event.target.value as FunnelStageType)
                }
              >
                {Object.values(stageDefinitions).map((definition) => (
                  <option key={definition.type} value={definition.type}>
                    {definition.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                Métricas simuladas
              </span>
              {selectedNode.data.metrics.map((metric, index) => (
                <div key={`${selectedNode.id}-${metric.label}`} className="space-y-2">
                  <label className="block text-xs font-medium text-muted-foreground">
                    {metric.label}
                  </label>
                  <input
                    className="neo-field"
                    value={metric.value}
                    onChange={(event) => onSelectedMetricChange(index, event.target.value)}
                  />
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-[#f04438] text-white"
              title="Remove a etapa selecionada e todas as conexões ligadas a ela"
              onClick={onDeleteSelectedNode}
            >
              <Trash2 className="mr-2 size-4" />
              Remover etapa
            </Button>
          </>
        ) : selectedEdge ? (
          <>
            <div className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-4 text-sm text-foreground">
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Origem
              </span>
              <strong className="mt-1 block text-base font-bold">
                {nodes.find((node) => node.id === selectedEdge.source)?.data.title ??
                  selectedEdge.source}
              </strong>
            </div>

            <div className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-4 text-sm text-foreground">
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Destino
              </span>
              <strong className="mt-1 block text-base font-bold">
                {nodes.find((node) => node.id === selectedEdge.target)?.data.title ??
                  selectedEdge.target}
              </strong>
            </div>

            <Button
              className="w-full bg-[#f04438] text-white"
              title="Remove apenas a conexão selecionada"
              onClick={onDeleteSelectedEdge}
            >
              <Trash2 className="mr-2 size-4" />
              Remover conexão
            </Button>
          </>
        ) : (
          <div className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-5 text-sm text-foreground">
            Nada selecionado. Clique em uma etapa para editar ou em uma conexão
            para revisar e remover.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
