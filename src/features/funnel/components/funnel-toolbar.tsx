import { RotateCcw } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { creatableStageTypes, stageDefinitions } from '@/features/funnel/data/stage-catalog'
import type { FunnelStageType } from '@/features/funnel/types'

type FunnelToolbarProps = {
  edgeCount: number
  nodeCount: number
  onAddStage: (stageType: FunnelStageType) => void
  onResetFlow: () => void
}

export function FunnelToolbar({
  edgeCount,
  nodeCount,
  onAddStage,
  onResetFlow,
}: FunnelToolbarProps) {
  return (
    <div className="flex max-w-[44rem] flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="neo-inset rounded-[18px] bg-[#fff6ec] px-4 py-3 text-[#102b3f]"
          title="Quantidade total de etapas no funil"
        >
          <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">
            Etapas
          </span>
          <strong className="block text-xl font-bold">{nodeCount}</strong>
        </div>
        <div
          className="neo-inset rounded-[18px] bg-[#ffcf56] px-4 py-3 text-[#062726]"
          title="Quantidade total de conexões entre etapas"
        >
          <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">
            Conexões
          </span>
          <strong className="block text-xl font-bold">{edgeCount}</strong>
        </div>
        <Button
          className="bg-[#fff6ec] text-[#102b3f]"
          size="sm"
          title="Restaura o fluxo inicial e limpa o estado salvo"
          variant="secondary"
          onClick={onResetFlow}
        >
          <RotateCcw className="mr-2 size-4" />
          Restaurar fluxo
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {creatableStageTypes.map((stageType) => (
          <Button
            key={stageType}
            className="bg-[#fff6ec] text-[#102b3f]"
            size="sm"
            title={`Adicionar etapa do tipo ${stageDefinitions[stageType].label}`}
            variant="secondary"
            onClick={() => onAddStage(stageType)}
          >
            + {stageDefinitions[stageType].label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-[#fff6ec] text-[#102b3f]">Ações rápidas</Badge>
        <p className="text-xs leading-5 text-primary-foreground/80">
          Clique em uma etapa para editar, em uma conexão para removê-la e no
          fundo do canvas para limpar a seleção.
        </p>
      </div>
    </div>
  )
}
