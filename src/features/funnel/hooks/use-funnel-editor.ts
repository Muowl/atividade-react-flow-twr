import {
  addEdge,
  MarkerType,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
} from '@xyflow/react'
import { useEffect, useState } from 'react'

import {
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

type ConnectionCandidate = Connection | { source: string | null; target: string | null }

export function useFunnelEditor() {
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

  const validateConnection = (connection: ConnectionCandidate) =>
    isValidFunnelConnection(connection, edges)

  const connectStages = (connection: Connection) => {
    if (!validateConnection(connection)) {
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

  const addStage = (stageType: FunnelStageType) => {
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

  const renameSelectedNode = (value: string) => {
    updateSelectedNode((node) => ({
      ...node,
      data: {
        ...node.data,
        title: value,
      },
    }))
  }

  const changeSelectedNodeType = (nextType: FunnelStageType) => {
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

  const updateSelectedMetric = (metricIndex: number, value: string) => {
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

  const removeSelectedNode = () => {
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

  const removeSelectedEdge = () => {
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

  const resetFlow = () => {
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

  const selectNode = (nodeId: string) => {
    setSelectedEdgeId(null)
    setSelectedNodeId(nodeId)
  }

  const selectEdge = (edgeId: string) => {
    setSelectedNodeId(null)
    setSelectedEdgeId(edgeId)
  }

  const clearSelection = () => {
    setSelectedNodeId(null)
    setSelectedEdgeId(null)
  }

  return {
    clearSelection,
    connectStages,
    displayedEdges,
    edges,
    nodes,
    onEdgesChange,
    onNodesChange,
    removeSelectedEdge,
    removeSelectedNode,
    renameSelectedNode,
    resetFlow,
    selectEdge,
    selectNode,
    selectedEdge,
    selectedNode,
    selectedEdgeId,
    selectedNodeId,
    updateSelectedMetric,
    updateSelectedNode,
    changeSelectedNodeType,
    addStage,
    validateConnection,
  }
}
