'use client'

import clsx from 'clsx'

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
      {/* Ultra-light SVG Logo - No hover effects for performance */}
      <svg
        width={size}
        height={size * 1.4}
        viewBox="0 0 100 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Top sphere */}
        <ellipse
          cx="50"
          cy="25"
          rx="22"
          ry="22"
          fill="currentColor"
          className={variant === 'light' ? 'text-slate-800' : 'text-white'}
        />
        
        {/* Connection/neck */}
        <path
          d="M 35 35 Q 30 50 28 60 L 72 60 Q 70 50 65 35 Z"
          fill="currentColor"
          className={variant === 'light' ? 'text-slate-800' : 'text-white'}
        />
        
        {/* Bottom large sphere */}
        <ellipse
          cx="50"
          cy="85"
          rx="35"
          ry="35"
          fill="currentColor"
          className={variant === 'light' ? 'text-slate-800' : 'text-white'}
        />

        {/* Simple inner highlights */}
        <ellipse
          cx="50"
          cy="25"
          rx="12"
          ry="12"
          fill="#06B6D4"
          opacity="0.3"
        />
        <ellipse
          cx="50"
          cy="85"
          rx="20"
          ry="20"
          fill="#06B6D4"
          opacity="0.2"
        />
      </svg>

      {/* Text - no animations */}
      {!compact && (
        <span 
          className={clsx(
            'text-lg font-bold',
            variant === 'light' ? 'text-slate-900' : 'text-white'
          )}
        >
          AiDYN
        </span>
      )}
      
      {/* Fallback text for SEO */}
      <span className="sr-only">
        AIDYN Technologies - AI Vision UniFi
      </span>
    </div>
  )
}
