import { ReactFlowProvider } from '@xyflow/react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FunnelCanvas } from '@/features/funnel/components/funnel-canvas'
import { FunnelInspector } from '@/features/funnel/components/funnel-inspector'
import { FunnelOverview } from '@/features/funnel/components/funnel-overview'
import { FunnelToolbar } from '@/features/funnel/components/funnel-toolbar'
import { useFunnelEditor } from '@/features/funnel/hooks/use-funnel-editor'

export default function App() {
  const funnelEditor = useFunnelEditor()

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

          <FunnelToolbar
            edgeCount={funnelEditor.edges.length}
            nodeCount={funnelEditor.nodes.length}
            onAddStage={funnelEditor.addStage}
            onResetFlow={funnelEditor.resetFlow}
          />
        </header>

        <section className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="grid gap-4">
            <FunnelInspector
              nodes={funnelEditor.nodes}
              selectedEdge={funnelEditor.selectedEdge}
              selectedNode={funnelEditor.selectedNode}
              onDeleteSelectedEdge={funnelEditor.removeSelectedEdge}
              onDeleteSelectedNode={funnelEditor.removeSelectedNode}
              onSelectedMetricChange={funnelEditor.updateSelectedMetric}
              onSelectedNodeNameChange={funnelEditor.renameSelectedNode}
              onSelectedNodeTypeChange={funnelEditor.changeSelectedNodeType}
            />
            <FunnelOverview />
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
                edges={funnelEditor.displayedEdges}
                isValidConnection={funnelEditor.validateConnection}
                nodes={funnelEditor.nodes}
                onConnect={funnelEditor.connectStages}
                onEdgeClick={(_, edge) => funnelEditor.selectEdge(edge.id)}
                onEdgesChange={funnelEditor.onEdgesChange}
                onNodeClick={(_, node) => funnelEditor.selectNode(node.id)}
                onNodesChange={funnelEditor.onNodesChange}
                onPaneClick={funnelEditor.clearSelection}
              />
            </CardContent>
          </Card>
        </section>
      </main>
    </ReactFlowProvider>
  )
}
