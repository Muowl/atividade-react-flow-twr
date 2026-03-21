import { Activity, Database, Workflow } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FunnelCanvas } from '@/features/funnel/components/funnel-canvas'

const baseItems = [
  'React 19 com TypeScript e Vite.',
  'Canvas com React Flow.',
  'Componentes base com shadcn/ui.',
]

const nextStepItems = [
  'criar, editar e remover etapas do funil',
  'persistir o estado no navegador',
  'refinar painel lateral e métricas simuladas',
]

export default function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="neo-panel grid gap-5 rounded-[28px] bg-primary p-5 text-primary-foreground xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
        <div className="space-y-3">
          <h1 className="max-w-4xl font-display text-4xl leading-[0.95] tracking-[0.01em] text-primary-foreground sm:text-5xl lg:text-6xl">
            Funil visual de campanhas.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-primary-foreground/88 sm:text-base">
            Estrutura inicial com canvas, componentes base e tema visual já
            definidos.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-[#ffcf56] text-[#062726]" disabled>
            Adicionar etapa
          </Button>
          <Button className="bg-[#fff6ec] text-[#102b3f]" disabled variant="secondary">
            Salvar localmente
          </Button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid gap-4">
          <Card className="bg-secondary">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <Workflow className="size-4" />
                <CardTitle>Base</CardTitle>
              </div>
              <CardDescription>O que já está configurado no projeto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {baseItems.map((item) => (
                <div
                  key={item}
                  className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-3 text-foreground"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#ffcf56]">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 text-foreground">
                <Activity className="size-4 text-accent" />
                <CardTitle>Próximos passos</CardTitle>
              </div>
              <CardDescription>Itens previstos para a próxima etapa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {nextStepItems.map((item, index) => (
                <div
                  key={item}
                  className="neo-inset flex items-center gap-3 rounded-[18px] bg-[#fff6ec] px-4 py-3 text-foreground"
                >
                  <span className="flex size-8 items-center justify-center rounded-[12px] border-[3px] border-[color:var(--color-ink)] bg-accent font-bold text-accent-foreground">
                    0{index + 2}
                  </span>
                  <span className="capitalize">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#d7eced]">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 text-foreground">
                <Database className="size-4 text-primary" />
                <CardTitle>Stack</CardTitle>
              </div>
              <CardDescription>Tecnologias usadas nesta base.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'React Flow', 'shadcn/ui', 'Tailwind v4'].map(
                (item) => (
                  <Badge key={item} variant="secondary" className="bg-[#fff6ec] text-foreground">
                    {item}
                  </Badge>
                ),
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="min-h-[640px] overflow-hidden bg-card">
          <CardHeader className="border-b-[3px] border-[color:var(--color-ink)] bg-[#fffdf8] pb-4">
            <div className="space-y-1">
              <CardTitle>Fluxo</CardTitle>
              <CardDescription>
                Exemplo inicial com etapas comuns de um funil.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[560px] p-0">
            <FunnelCanvas />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
