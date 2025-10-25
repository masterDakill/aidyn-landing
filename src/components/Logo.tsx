'use client'

import Image from 'next/image'
import clsx from 'clsx'

export type LogoVariant = 'light' | 'dark'

interface LogoProps {
  variant?: LogoVariant
  compact?: boolean
  className?: string
}

export default function Logo({ 
  compact = false, 
  className
}: LogoProps) {
  // Use the official AIDYN circle logo
  const logoSrc = '/images/brand/aidyn-logo-circle.png'

  return (
    <div className={clsx('inline-flex items-center gap-3', className)}>
      <Image
        src={logoSrc}
        alt="AIDYN Technologies"
        width={compact ? 40 : 50}
        height={compact ? 40 : 50}
        priority
        className={clsx(
          'object-contain transition-opacity duration-300',
          compact ? 'h-10 w-10' : 'h-12 w-12'
        )}
      />
      {!compact && (
        <span className="text-xl font-bold text-white">
          AIDYN
        </span>
      )}
      
      {/* Fallback text for SEO */}
      <span className="sr-only">
        AIDYN Technologies - SerenaCare AI
      </span>
    </div>
  )
}
