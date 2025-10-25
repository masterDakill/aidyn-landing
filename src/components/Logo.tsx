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
    <div className={clsx('inline-flex items-center gap-2', className)}>
      <Image
        src={logoSrc}
        alt="AIDYN Technologies"
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        priority
        className={clsx(
          'object-contain transition-opacity duration-300',
          compact ? 'h-8 w-8' : 'h-10 w-10'
        )}
      />
      {!compact && (
        <span className="text-lg font-bold text-white">
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
