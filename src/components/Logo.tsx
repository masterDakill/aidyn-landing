'use client'

import clsx from 'clsx'

export type LogoVariant = 'light' | 'dark'

interface LogoProps {
  variant?: LogoVariant
  compact?: boolean
  className?: string
}

export default function Logo({ variant = 'dark', compact = false, className }: LogoProps) {
  const isDark = variant === 'dark'
  const markClasses = clsx(
    'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-300',
    isDark ? 'bg-white/10 text-white ring-1 ring-white/20' : 'bg-slate-950 text-white ring-1 ring-slate-900/15'
  )

  const wordmarkClasses = clsx(
    'flex flex-col leading-none transition-colors duration-300',
    isDark ? 'text-white' : 'text-slate-900'
  )

  const subtitleClasses = clsx(
    'text-[11px] font-medium uppercase tracking-[0.38em]',
    isDark ? 'text-slate-300/90' : 'text-slate-500'
  )

  return (
    <span className={clsx('inline-flex items-center gap-3', className)}>
      <span className={markClasses} aria-hidden>
        <span className="absolute inset-px rounded-[1.05rem] bg-gradient-to-br from-sky-500/80 via-cyan-400/90 to-emerald-400/80 blur-sm" />
        <span className="relative flex h-full w-full items-center justify-center rounded-[0.95rem] bg-slate-950 text-base font-semibold tracking-widest">
          AI
        </span>
      </span>

      {!compact && (
        <span className={wordmarkClasses}>
          <span className="flex items-baseline gap-1 text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">AIDYN</span>
            <span>Technologies</span>
          </span>
          <span className={subtitleClasses}>SerenaCare AI</span>
        </span>
      )}
    </span>
  )
}
