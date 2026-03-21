import {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
  type EdgeMouseHandler,
  type IsValidConnection,
  type Connection,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type NodeMouseHandler,
  type NodeTypes,
} from '@xyflow/react'

import { StageNode } from '@/features/funnel/components/stage-node'
import type { FunnelStageNode } from '@/features/funnel/types'

const nodeTypes = {
  stage: StageNode,
} satisfies NodeTypes

type FunnelCanvasProps = {
  edges: Edge[]
  isValidConnection: IsValidConnection<Edge>
  nodes: FunnelStageNode[]
  onEdgeClick: EdgeMouseHandler<Edge>
  onNodeClick: NodeMouseHandler<FunnelStageNode>
  onConnect: (connection: Connection) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onNodesChange: (changes: NodeChange<FunnelStageNode>[]) => void
  onPaneClick: () => void
}

export function FunnelCanvas({
  edges,
  isValidConnection,
  nodes,
  onEdgeClick,
  onNodeClick,
  onConnect,
  onEdgesChange,
  onNodesChange,
  onPaneClick,
}: FunnelCanvasProps) {
  return (
    <div className="neo-dot-grid h-full w-full bg-[linear-gradient(180deg,#fff6ec_0%,#f5ebfa_100%)]">
      <ReactFlow
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
        }}
        edges={edges}
        isValidConnection={isValidConnection}
        minZoom={0.5}
        nodeTypes={nodeTypes}
        nodes={nodes}
        onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onPaneClick={onPaneClick}
        panOnScroll
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--color-border)" gap={24} size={1.2} />
        <MiniMap
          pannable
          zoomable
          className="!rounded-[18px] !border-[3px] !border-[color:var(--color-ink)] !bg-[#fff6ec] !shadow-[6px_6px_0_0_var(--color-ink)]"
          maskColor="rgba(6, 39, 38, 0.08)"
          nodeColor="var(--color-primary)"
        />
        <Controls className="react-flow__controls-shell" showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
