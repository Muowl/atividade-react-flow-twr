import type { CSSProperties } from 'react'

import { Handle, Position, type NodeProps } from '@xyflow/react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { FunnelStageNode } from '@/features/funnel/types'

export function StageNode({ data }: NodeProps<FunnelStageNode>) {
  return (
    <Card
      className="stage-node w-[236px] rounded-[22px] bg-[#fff6ec]"
      style={{ '--stage-accent': data.accent } as CSSProperties}
    >
      <Handle className="stage-node__handle" position={Position.Left} type="target" />
      <CardContent className="space-y-4 p-0">
        <div className="border-b-[3px] border-[color:var(--color-ink)] bg-[color:var(--stage-accent)] px-4 py-3 text-white">
          <h3 className="font-display text-lg tracking-[0.02em]">{data.title}</h3>
        </div>

        <div className="space-y-3 px-4 pb-4">
          <Badge variant="secondary" className="bg-[#ffcf56] text-[#062726]">
            {data.kind}
          </Badge>

          <div className="neo-inset rounded-[18px] bg-muted px-3 py-3">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              {data.metricLabel}
            </span>
            <strong className="mt-1 block text-2xl font-bold text-foreground">
              {data.metricValue}
            </strong>
          </div>
        </div>
      </CardContent>
      <Handle className="stage-node__handle" position={Position.Right} type="source" />
    </Card>
  )
}
