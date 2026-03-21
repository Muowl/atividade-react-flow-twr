import { ReactFlowProvider } from '@xyflow/react'
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
      <header className="neo-panel flex flex-col gap-4 rounded-[28px] bg-primary p-5 text-primary-foreground lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-[#ffcf56] text-[#062726]">TWR</Badge>
            <Badge className="bg-[#fff6ec] text-[#102b3f]">Funil de campanhas</Badge>
          </div>
          <div className="space-y-1">
            <h1 className="font-display text-3xl leading-none tracking-[0.01em] sm:text-4xl">
              Editor visual
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-primary-foreground/88">
              Layout base com toolbar, área de apoio e canvas principal.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-3 text-[#102b3f]">
            <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">
              Etapas
            </span>
            <strong className="block text-xl font-bold">5</strong>
          </div>
          <div className="neo-inset rounded-[18px] bg-[#ffcf56] px-4 py-3 text-[#062726]">
            <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">
              Conexões
            </span>
            <strong className="block text-xl font-bold">4</strong>
          </div>
          <Button className="bg-[#ffcf56] text-[#062726]" disabled>
            Adicionar etapa
          </Button>
          <Button className="bg-[#fff6ec] text-[#102b3f]" disabled variant="secondary">
            Salvar localmente
          </Button>
        </div>
      </header>

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
            <ReactFlowProvider>
              <FunnelCanvas />
            </ReactFlowProvider>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
