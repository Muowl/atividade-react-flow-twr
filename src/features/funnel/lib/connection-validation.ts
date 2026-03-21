import type { Edge } from '@xyflow/react'

function hasPath(
  edges: Edge[],
  startId: string,
  targetId: string,
  visited = new Set<string>(),
): boolean {
  if (startId === targetId) {
    return true
  }

  if (visited.has(startId)) {
    return false
  }

  visited.add(startId)

  const nextTargets = edges
    .filter((edge) => edge.source === startId)
    .map((edge) => edge.target)

  return nextTargets.some((nextTarget) => hasPath(edges, nextTarget, targetId, visited))
}

export function isValidFunnelConnection(
  connection: {
    source: string | null | undefined
    target: string | null | undefined
  },
  edges: Edge[],
): boolean {
  const { source, target } = connection

  if (!source || !target) {
    return false
  }

  if (source === target) {
    return false
  }

  const alreadyExists = edges.some(
    (edge) => edge.source === source && edge.target === target,
  )

  if (alreadyExists) {
    return false
  }

  // Prevent cycles so the funnel remains a readable directional flow.
  return !hasPath(edges, target, source)
}
