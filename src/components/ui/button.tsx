import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[16px] border-[3px] border-[color:var(--color-ink)] text-sm font-bold uppercase tracking-[0.08em] transition-transform duration-150 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[6px_6px_0_0_var(--color-ink)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_var(--color-ink)]',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[6px_6px_0_0_var(--color-ink)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_var(--color-ink)]',
        ghost:
          'bg-background text-foreground shadow-[6px_6px_0_0_var(--color-ink)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-secondary hover:shadow-[8px_8px_0_0_var(--color-ink)]',
      },
      size: {
        default: 'h-12 px-5',
        sm: 'h-10 px-4 text-xs',
        lg: 'h-14 px-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({
  className,
  size,
  variant,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ size, variant }), className)}
      type={type}
      {...props}
    />
  )
}
