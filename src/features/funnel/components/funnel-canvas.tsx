import {
  addEdge,
  Background,
  ConnectionLineType,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type NodeTypes,
} from '@xyflow/react'

import { StageNode } from '@/features/funnel/components/stage-node'
import { initialEdges, initialNodes } from '@/features/funnel/data/initial-elements'

const nodeTypes = {
  stage: StageNode,
} satisfies NodeTypes

export function FunnelCanvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const handleConnect = (connection: Connection) => {
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

  return (
    <div className="neo-dot-grid h-full w-full bg-[linear-gradient(180deg,#fff6ec_0%,#f5ebfa_100%)]">
      <ReactFlow
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
        edges={edges}
        minZoom={0.5}
        nodeTypes={nodeTypes}
        nodes={nodes}
        onConnect={handleConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
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
