import {
  addEdge,
  MarkerType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Connection,
} from '@xyflow/react'
import { Database, PencilLine, Workflow } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FunnelCanvas } from '@/features/funnel/components/funnel-canvas'
import {
  creatableStageTypes,
  createStageData,
  createStageNode,
  stageDefinitions,
} from '@/features/funnel/data/stage-catalog'
import { initialEdges, initialNodes } from '@/features/funnel/data/initial-elements'
import { isValidFunnelConnection } from '@/features/funnel/lib/connection-validation'
import type { FunnelStageType } from '@/features/funnel/types'

const baseItems = [
  'Seleção de etapa direto no canvas.',
  'Edição lateral sem recriar o nó.',
  'Atualização imediata do estado.',
]

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    initialNodes[0]?.id ?? null,
  )

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null

  const handleValidateConnection = (
    connection: Connection | { source: string | null; target: string | null },
  ) => isValidFunnelConnection(connection, edges)

  const handleConnect = (connection: Connection) => {
    if (!handleValidateConnection(connection)) {
      return
    }

    setEdges((currentEdges) =>
      addEdge(
        {
          ...connection,
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        currentEdges,
      ),
    )
  }

  const handleAddStage = (stageType: FunnelStageType) => {
    setNodes((currentNodes) => {
      const newNode = createStageNode(stageType, currentNodes, {
        index: currentNodes.length,
      })

      setSelectedNodeId(newNode.id)

      return [...currentNodes, newNode]
    })
  }

  const updateSelectedNode = (
    callback: (node: (typeof nodes)[number]) => (typeof nodes)[number],
  ) => {
    if (!selectedNodeId) {
      return
    }

    setNodes((currentNodes) =>
      currentNodes.map((node) => (node.id === selectedNodeId ? callback(node) : node)),
    )
  }

  const handleSelectedNodeNameChange = (value: string) => {
    updateSelectedNode((node) => ({
      ...node,
      data: {
        ...node.data,
        title: value,
      },
    }))
  }

  const handleSelectedNodeTypeChange = (nextType: FunnelStageType) => {
    updateSelectedNode((node) => {
      const nextData = createStageData(nextType, 0, {
        title: node.data.title,
        metrics: node.data.metrics.map((metric) => metric.value),
      })

      return {
        ...node,
        position: {
          ...node.position,
          x: stageDefinitions[nextType].canvasX,
        },
        data: nextData,
      }
    })
  }

  const handleSelectedMetricChange = (metricIndex: number, value: string) => {
    updateSelectedNode((node) => ({
      ...node,
      data: {
        ...node.data,
        metrics: node.data.metrics.map((metric, currentIndex) =>
          currentIndex === metricIndex ? { ...metric, value } : metric,
        ),
      },
    }))
  }

  return (
    <ReactFlowProvider>
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="neo-panel flex flex-col gap-4 rounded-[28px] bg-primary p-5 text-primary-foreground lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[#ffcf56] text-[#062726]">TWR</Badge>
              <Badge className="bg-[#fff6ec] text-[#102b3f]">Funil de campanhas</Badge>
            </div>
            <div className="space-y-1">
              <h1 className="font-display text-3xl leading-none tracking-[0.01em] sm:text-4xl">
                Editor visual
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-primary-foreground/88">
                Selecione uma etapa no fluxo para editar nome, tipo e métricas.
              </p>
            </div>
          </div>

          <div className="flex max-w-[40rem] flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-3 text-[#102b3f]">
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">
                  Etapas
                </span>
                <strong className="block text-xl font-bold">{nodes.length}</strong>
              </div>
              <div className="neo-inset rounded-[18px] bg-[#ffcf56] px-4 py-3 text-[#062726]">
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">
                  Conexões
                </span>
                <strong className="block text-xl font-bold">{edges.length}</strong>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {creatableStageTypes.map((stageType) => (
                <Button
                  key={stageType}
                  className="bg-[#fff6ec] text-[#102b3f]"
                  size="sm"
                  variant="secondary"
                  onClick={() => handleAddStage(stageType)}
                >
                  + {stageDefinitions[stageType].label}
                </Button>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="grid gap-4">
            <Card className="bg-[#ffcf56]">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 text-foreground">
                  <PencilLine className="size-4 text-accent" />
                  <CardTitle>Editar etapa</CardTitle>
                </div>
                <CardDescription>
                  {selectedNode
                    ? 'Altere os dados da etapa selecionada.'
                    : 'Selecione um nó no canvas para editar.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedNode ? (
                  <>
                    <div className="space-y-2">
                      <label
                        className="block text-[11px] font-bold uppercase tracking-[0.12em] text-foreground"
                        htmlFor="stage-name"
                      >
                        Nome
                      </label>
                      <input
                        id="stage-name"
                        className="neo-field"
                        value={selectedNode.data.title}
                        onChange={(event) => handleSelectedNodeNameChange(event.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        className="block text-[11px] font-bold uppercase tracking-[0.12em] text-foreground"
                        htmlFor="stage-type"
                      >
                        Tipo
                      </label>
                      <select
                        id="stage-type"
                        className="neo-field"
                        value={selectedNode.data.stageType}
                        onChange={(event) =>
                          handleSelectedNodeTypeChange(event.target.value as FunnelStageType)
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
                        Métricas
                      </span>
                      {selectedNode.data.metrics.map((metric, index) => (
                        <div key={`${selectedNode.id}-${metric.label}`} className="space-y-2">
                          <label className="block text-xs font-medium text-muted-foreground">
                            {metric.label}
                          </label>
                          <input
                            className="neo-field"
                            value={metric.value}
                            onChange={(event) =>
                              handleSelectedMetricChange(index, event.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-5 text-sm text-foreground">
                    Clique em uma etapa do funil para abrir a edição.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-secondary">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Workflow className="size-4" />
                  <CardTitle>Base</CardTitle>
                </div>
                <CardDescription>O que já está configurado no projeto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {baseItems.map((item) => (
                  <div
                    key={item}
                    className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-3 text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-[#d7eced]">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 text-foreground">
                  <Database className="size-4 text-primary" />
                  <CardTitle>Tipos de etapa</CardTitle>
                </div>
                <CardDescription>
                  Etapas disponíveis para criação e edição.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {Object.values(stageDefinitions).map((definition) => (
                  <Badge
                    key={definition.type}
                    variant="secondary"
                    className="bg-[#fff6ec] text-foreground"
                  >
                    {definition.label}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="min-h-[640px] overflow-hidden bg-card">
            <CardHeader className="border-b-[3px] border-[color:var(--color-ink)] bg-[#fffdf8] pb-4">
              <div className="space-y-1">
                <CardTitle>Fluxo</CardTitle>
                <CardDescription>
                  Clique em uma etapa para abrir a edição lateral.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="h-[560px] p-0">
              <FunnelCanvas
                edges={edges}
                isValidConnection={handleValidateConnection}
                nodes={nodes}
                onConnect={handleConnect}
                onEdgesChange={onEdgesChange}
                onNodeClick={(_, node) => setSelectedNodeId(node.id)}
                onNodesChange={onNodesChange}
                onPaneClick={() => setSelectedNodeId(null)}
              />
            </CardContent>
          </Card>
        </section>
      </main>
    </ReactFlowProvider>
  )
}
