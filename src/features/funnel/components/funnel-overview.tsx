import { Database } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { stageDefinitions } from '@/features/funnel/data/stage-catalog'

export function FunnelOverview() {
  return (
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
  )
}
