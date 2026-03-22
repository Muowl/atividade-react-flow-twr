import { Database, Workflow } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { stageDefinitions } from '@/features/funnel/data/stage-catalog'

const overviewItems = [
  'Seleção visual clara de etapa e conexão.',
  'Persistência local automática no navegador.',
  'Ações de criação, edição e exclusão mais explícitas.',
]

export function FunnelOverview() {
  return (
    <>
      <Card className="bg-secondary">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Workflow className="size-4 text-primary" />
            <CardTitle>Experiência</CardTitle>
          </div>
          <CardDescription>Resumo do comportamento atual da interface.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {overviewItems.map((item) => (
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
    </>
  )
}
