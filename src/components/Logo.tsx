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
  compact = false, 
  className
}: LogoProps) {
  const size = compact ? 32 : 40

  return (
    <div className={clsx('inline-flex items-center gap-3', className)}>
      {/* Logo 3D AIDYN - Image PNG */}
      <Image
        src="/images/brand/aidyn-logo-circle.png"
        alt="AIDYN Logo"
        width={size}
        height={size}
        className="shrink-0"
        priority
      />

      {/* Text - no animations */}
      {!compact && (
        <span 
          className={clsx(
            'text-lg font-bold',
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
