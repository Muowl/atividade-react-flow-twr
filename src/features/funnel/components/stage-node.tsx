import type { CSSProperties } from 'react'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import { BarChart3 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { FunnelStageNode } from '@/features/funnel/types'

export function StageNode({ data }: NodeProps<FunnelStageNode>) {
  return (
    <Card
      className="stage-node w-[264px] rounded-[24px] bg-[#fff6ec]"
      style={{ '--stage-accent': data.accent } as CSSProperties}
    >
      <Handle className="stage-node__handle" position={Position.Left} type="target" />

      <CardContent className="space-y-4 p-0">
        <div className="border-b-[3px] border-[color:var(--color-ink)] bg-[color:var(--stage-accent)] px-4 py-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">
                Nome da etapa
              </span>
              <h3 className="font-display text-lg tracking-[0.02em]">{data.title}</h3>
            </div>
            <span className="rounded-[12px] border-[3px] border-white/90 bg-[#ffcf56] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#062726]">
              {data.stageType.replace('-', ' ')}
            </span>
          </div>
        </div>

        <div className="space-y-4 px-4 pb-4">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary" className="bg-[#ffcf56] text-[#062726]">
              {data.kind}
            </Badge>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              <BarChart3 className="size-3.5" />
              Métricas
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {data.metrics.map((metric) => (
              <div
                key={metric.label}
                className="neo-inset rounded-[18px] bg-muted px-3 py-3"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {metric.label}
                </span>
                <strong className="mt-1 block text-xl font-bold text-foreground">
                  {metric.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <Handle className="stage-node__handle" position={Position.Right} type="source" />
    </Card>
  )
}
