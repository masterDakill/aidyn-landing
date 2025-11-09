'use client'

import clsx from 'clsx'
import Image from 'next/image'

export type LogoVariant = 'light' | 'dark'

interface LogoProps {
  variant?: LogoVariant
  compact?: boolean
  className?: string
}

export default function Logo({
  variant = 'dark',
  compact = true,
  className
}: LogoProps) {
  const size = compact ? 32 : 40

  const logoSrc = variant === 'light' ? '/images/brand/aidyn-logo-dark.png' : '/images/brand/aidyn-logo-circle.png'

  return (
    <div className={clsx('inline-flex items-center gap-3', className)}>
      {/* Vector/PNG logo image. Background should be transparent in assets. */}
      <Image
        src={logoSrc}
        alt="AIDYN Logo"
        width={size}
        height={size}
        className="shrink-0"
        priority
      />

      {/* Text - hidden by default to keep label off; use compact={false} to show */}
      {!compact && (
        <span
          className={clsx(
            'text-lg font-bold transition-colors',
            variant === 'light' ? 'text-slate-900' : 'text-white'
          )}
        >
          AIDYN
        </span>
      )}

      {/* Fallback text for SEO */}
      <span className="sr-only">
        AIDYN Technologies - AI Vision UniFi
      </span>
    </div>
  )
}
