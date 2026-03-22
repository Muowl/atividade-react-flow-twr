import {
  addEdge,
  MarkerType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
} from '@xyflow/react'
import { Database, Link2, PencilLine, RotateCcw, Trash2, Workflow } from 'lucide-react'
import { useEffect, useState } from 'react'

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
import { isValidFunnelConnection } from '@/features/funnel/lib/connection-validation'
import {
  clearStoredFlow,
  getDefaultFlow,
  readStoredFlow,
  writeStoredFlow,
} from '@/features/funnel/lib/storage'
import type { FunnelStageType } from '@/features/funnel/types'

const baseItems = [
  'Seleção visual clara de etapa e conexão.',
  'Persistência local automática no navegador.',
  'Ações de criação, edição e exclusão mais explícitas.',
]

export default function App() {
  const [initialFlow] = useState(() => readStoredFlow())
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlow.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlow.edges)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    initialFlow.nodes[0]?.id ?? null,
  )
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)

  useEffect(() => {
    writeStoredFlow({ nodes, edges })
  }, [edges, nodes])

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null
  const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId) ?? null

  const displayedEdges: Edge[] = edges.map((edge) => ({
    ...edge,
    animated: edge.id === selectedEdgeId,
    style:
      edge.id === selectedEdgeId
        ? { stroke: '#A06CD5', strokeWidth: 4 }
        : undefined,
  }))

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
      const newNode = createStageNode(stageType, currentNodes)

      setSelectedEdgeId(null)
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

  const handleDeleteSelectedNode = () => {
    if (!selectedNode) {
      return
    }

    const confirmed = window.confirm(
      `Remover a etapa "${selectedNode.data.title}" e suas conexões?`,
    )

    if (!confirmed) {
      return
    }

    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== selectedNode.id))
    setEdges((currentEdges) =>
      currentEdges.filter(
        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id,
      ),
    )
    setSelectedNodeId(null)
    setSelectedEdgeId(null)
  }

  const handleDeleteSelectedEdge = () => {
    if (!selectedEdge) {
      return
    }

    const confirmed = window.confirm('Remover a conexão selecionada?')

    if (!confirmed) {
      return
    }

    setEdges((currentEdges) => currentEdges.filter((edge) => edge.id !== selectedEdge.id))
    setSelectedEdgeId(null)
  }

  const handleResetFlow = () => {
    const confirmed = window.confirm('Restaurar o funil inicial salvo no projeto?')

    if (!confirmed) {
      return
    }

    const defaultFlow = getDefaultFlow()

    clearStoredFlow()
    setNodes(defaultFlow.nodes)
    setEdges(defaultFlow.edges)
    setSelectedNodeId(defaultFlow.nodes[0]?.id ?? null)
    setSelectedEdgeId(null)
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
                O funil fica salvo no navegador e volta automaticamente ao recarregar.
              </p>
            </div>
          </div>

          <div className="flex max-w-[44rem] flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-3 text-[#102b3f]"
                title="Quantidade total de etapas no funil"
              >
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">
                  Etapas
                </span>
                <strong className="block text-xl font-bold">{nodes.length}</strong>
              </div>
              <div
                className="neo-inset rounded-[18px] bg-[#ffcf56] px-4 py-3 text-[#062726]"
                title="Quantidade total de conexões entre etapas"
              >
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">
                  Conexões
                </span>
                <strong className="block text-xl font-bold">{edges.length}</strong>
              </div>
              <Button
                className="bg-[#fff6ec] text-[#102b3f]"
                size="sm"
                title="Restaura o fluxo inicial e limpa o estado salvo"
                variant="secondary"
                onClick={handleResetFlow}
              >
                <RotateCcw className="mr-2 size-4" />
                Restaurar fluxo
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {creatableStageTypes.map((stageType) => (
                <Button
                  key={stageType}
                  className="bg-[#fff6ec] text-[#102b3f]"
                  size="sm"
                  title={`Adicionar etapa do tipo ${stageDefinitions[stageType].label}`}
                  variant="secondary"
                  onClick={() => handleAddStage(stageType)}
                >
                  + {stageDefinitions[stageType].label}
                </Button>
              ))}
            </div>
            <p className="text-xs leading-5 text-primary-foreground/80">
              Dica: clique em uma etapa para editar, em uma conexão para removê-la
              e no fundo do canvas para limpar a seleção.
            </p>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="grid gap-4">
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
                    {selectedNode ? 'Etapa selecionada' : selectedEdge ? 'Conexão selecionada' : 'Sem seleção'}
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
                        onChange={(event) => handleSelectedNodeNameChange(event.target.value)}
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
                            onChange={(event) =>
                              handleSelectedMetricChange(index, event.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-[#f04438] text-white"
                      title="Remove a etapa selecionada e todas as conexões ligadas a ela"
                      onClick={handleDeleteSelectedNode}
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
                      onClick={handleDeleteSelectedEdge}
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

            <Card className="bg-secondary">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Workflow className="size-4 text-primary" />
                  <CardTitle>Experiência</CardTitle>
                </div>
                <CardDescription>Resumo do comportamento atual da interface.</CardDescription>
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
                  O estado do canvas é salvo automaticamente no navegador.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="h-[560px] p-0 sm:h-[620px]">
              <FunnelCanvas
                edges={displayedEdges}
                isValidConnection={handleValidateConnection}
                nodes={nodes}
                onConnect={handleConnect}
                onEdgeClick={(_, edge) => {
                  setSelectedNodeId(null)
                  setSelectedEdgeId(edge.id)
                }}
                onEdgesChange={onEdgesChange}
                onNodeClick={(_, node) => {
                  setSelectedEdgeId(null)
                  setSelectedNodeId(node.id)
                }}
                onNodesChange={onNodesChange}
                onPaneClick={() => {
                  setSelectedNodeId(null)
                  setSelectedEdgeId(null)
                }}
              />
            </CardContent>
          </Card>
        </section>
      </main>
    </ReactFlowProvider>
  )
}
