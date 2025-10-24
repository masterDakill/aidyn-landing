'use client'

import Image from 'next/image'
import clsx from 'clsx'

export type LogoVariant = 'light' | 'dark'

interface LogoProps {
  variant?: LogoVariant
  compact?: boolean
  className?: string
  showFullBrand?: boolean
}

export default function Logo({ 
  compact = false, 
  className,
  showFullBrand = false 
}: LogoProps) {
  // Use the official AIDYN logo images
  const logoSrc = showFullBrand 
    ? '/images/brand/aidyn-logo-full-dark.png' 
    : '/images/brand/aidyn-logo-dark.png'

  return (
    <div className={clsx('inline-flex items-center', className)}>
      <Image
        src={logoSrc}
        alt="AIDYN Technologies"
        width={compact ? 40 : showFullBrand ? 200 : 120}
        height={compact ? 40 : 40}
        priority
        className={clsx(
          'object-contain transition-opacity duration-300',
          compact ? 'h-10 w-10' : showFullBrand ? 'h-10 w-auto' : 'h-10 w-auto'
        )}
      />
      
      {/* Fallback text for SEO */}
      <span className="sr-only">
        AIDYN Technologies - SerenaCare AI
      </span>
    </div>
  )
}
