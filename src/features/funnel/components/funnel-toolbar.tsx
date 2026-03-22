import { Plus, RotateCcw } from 'lucide-react'

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
    <div className="flex w-full flex-col gap-3">
      {/* Row 1: Stats inline + Restore button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="neo-inset rounded-[14px] bg-[#fff6ec] px-3 py-1.5 text-[#102b3f]">
            <span className="mr-1.5 text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
              Etapas
            </span>
            <strong className="text-base font-bold">{nodeCount}</strong>
          </Badge>
          <Badge className="neo-inset rounded-[14px] bg-[#ffcf56] px-3 py-1.5 text-[#062726]">
            <span className="mr-1.5 text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
              Conexões
            </span>
            <strong className="text-base font-bold">{edgeCount}</strong>
          </Badge>
        </div>

        <Button
          className="bg-[#fff6ec] text-[#102b3f]"
          size="sm"
          title="Restaura o fluxo inicial e limpa o estado salvo"
          variant="secondary"
          onClick={onResetFlow}
        >
          <RotateCcw className="mr-1.5 size-3.5" />
          Restaurar
        </Button>
      </div>

      {/* Row 2: Add stage buttons inline */}
      <div className="flex flex-wrap items-center gap-2">
        {creatableStageTypes.map((stageType) => (
          <Button
            key={stageType}
            className="bg-[#fff6ec] text-[#102b3f]"
            size="sm"
            title={`Adicionar etapa do tipo ${stageDefinitions[stageType].label}`}
            variant="secondary"
            onClick={() => onAddStage(stageType)}
          >
            <Plus className="mr-1 size-3.5" />
            {stageDefinitions[stageType].label}
          </Button>
        ))}
      </div>

      {/* Row 3: Help text - subtle */}
      <p className="text-xs leading-5 text-primary-foreground/60">
        Clique em uma etapa para editar, em uma conexão para removê-la e no
        fundo do canvas para limpar a seleção.
      </p>
    </div>
  )
}
