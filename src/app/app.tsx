import { ReactFlowProvider } from '@xyflow/react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FunnelCanvas } from '@/features/funnel/components/funnel-canvas'
import { FunnelInspector } from '@/features/funnel/components/funnel-inspector'
import { FunnelToolbar } from '@/features/funnel/components/funnel-toolbar'
import { useFunnelEditor } from '@/features/funnel/hooks/use-funnel-editor'

export default function App() {
  const funnelEditor = useFunnelEditor()

  return (
    <ReactFlowProvider>
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="neo-panel flex flex-col gap-3 rounded-[24px] bg-primary px-5 py-4 text-primary-foreground">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex items-end gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="brand-title">
                  <span className="brand-title__prefix">de_</span>
                  <span className="brand-title__word">funil</span>
                </h1>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/72">
                  editor visual de campanhas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full border border-primary-foreground/16 bg-primary-foreground/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/60 sm:inline">
                auto-save
              </span>
              <span className="hidden text-xs text-primary-foreground/50 sm:inline">
                salvo automaticamente
              </span>
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

          <Card className="min-h-[640px] overflow-hidden bg-card">
            <CardHeader className="border-b-[3px] border-[color:var(--color-ink)] bg-[#fffdf8] pb-4">
              <div className="space-y-1">
                <CardTitle>Fluxo</CardTitle>
                <CardDescription>
                  O estado do canvas e salvo automaticamente no navegador.
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
