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
    <div className={clsx('group inline-flex items-center gap-3', className)}>
      {/* SVG Logo - Based on AIDYN brand image */}
      <svg
        width={size}
        height={size * 1.4}
        viewBox="0 0 100 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:scale-110"
      >
        {/* Top sphere */}
        <ellipse
          cx="50"
          cy="25"
          rx="22"
          ry="22"
          fill="currentColor"
          className={clsx(
            'transition-colors duration-300',
            variant === 'light' ? 'text-slate-800' : 'text-white'
          )}
        />
        
        {/* Connection/neck */}
        <path
          d="M 35 35 Q 30 50 28 60 L 72 60 Q 70 50 65 35 Z"
          fill="currentColor"
          className={clsx(
            'transition-colors duration-300',
            variant === 'light' ? 'text-slate-800' : 'text-white'
          )}
        />
        
        {/* Bottom large sphere */}
        <ellipse
          cx="50"
          cy="85"
          rx="35"
          ry="35"
          fill="currentColor"
          className={clsx(
            'transition-colors duration-300',
            variant === 'light' ? 'text-slate-800' : 'text-white'
          )}
        />

        {/* Inner highlights for depth */}
        <ellipse
          cx="50"
          cy="25"
          rx="12"
          ry="12"
          fill="currentColor"
          opacity="0.3"
          className="text-cyan-400"
        />
        <ellipse
          cx="50"
          cy="85"
          rx="20"
          ry="20"
          fill="currentColor"
          opacity="0.2"
          className="text-cyan-400"
        />
      </svg>

      {/* Text */}
      {!compact && (
        <div className="flex flex-col">
          <span 
            className={clsx(
              'text-lg font-bold transition-colors duration-300',
              variant === 'light' ? 'text-slate-900' : 'text-white'
            )}
          >
            AiDYN
          </span>
        </div>
      )}
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
      
      {/* Fallback text for SEO */}
      <span className="sr-only">
        AIDYN Technologies - AI Vision UniFi
      </span>
    </div>
  )
}
