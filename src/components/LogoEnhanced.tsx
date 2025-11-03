'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

// Lazy load 3D logo for performance
const Logo3D = dynamic(() => import('./Logo3D'), { 
  ssr: false,
  loading: () => <div className="h-10 w-10 animate-pulse rounded-full bg-gradient-to-br from-blue-900 to-cyan-500" />
})

export type LogoVariant = 'light' | 'dark'
export type LogoMode = '2d' | '3d' | 'hybrid'

interface LogoEnhancedProps {
  variant?: LogoVariant
  mode?: LogoMode
  compact?: boolean
  className?: string
  showText?: boolean
  interactive?: boolean
}

export default function LogoEnhanced({ 
  variant = 'dark',
  mode = '2d',
  compact = false, 
  className = '',
  showText = true,
  interactive = false
}: LogoEnhancedProps) {
  const [is3DActive, setIs3DActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const size = compact ? 32 : 40

  // SVG Logo (optimized inline SVG based on your image)
  const SVGLogo = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300"
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

      {/* Inner highlight for depth */}
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
  )

  return (
    <div className={clsx('inline-flex items-center gap-3', className)}>
      {/* Logo Icon */}
      <div 
        className={clsx(
          'relative transition-all duration-300',
          interactive && 'cursor-pointer',
          is3DActive && mode !== '2d' && 'scale-110'
        )}
        onMouseEnter={() => mode === 'hybrid' && setIs3DActive(true)}
        onMouseLeave={() => mode === 'hybrid' && setIs3DActive(false)}
        onClick={() => mode === '3d' && setIs3DActive(!is3DActive)}
      >
        {mode === '3d' || (mode === 'hybrid' && is3DActive && mounted) ? (
          <Logo3D 
            width={size * 2} 
            height={size * 2} 
            interactive={interactive}
            className="absolute -top-4 -left-4 z-10"
          />
        ) : (
          <div 
            className={clsx(
              'relative transition-all duration-300',
              interactive && 'hover:scale-110 hover:rotate-3'
            )}
          >
            <SVGLogo />
            
            {/* Glow effect on hover */}
            {interactive && (
              <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />
            )}
          </div>
        )}
      </div>

      {/* Text */}
      {showText && !compact && (
        <div className="flex flex-col">
          <span 
            className={clsx(
              'text-xl font-bold transition-colors duration-300',
              variant === 'light' ? 'text-slate-900' : 'text-white'
            )}
          >
            AiDYN
          </span>
          <span 
            className={clsx(
              'text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300',
              variant === 'light' ? 'text-slate-600' : 'text-slate-400'
            )}
          >
            TECHNOLOGIES INC.
          </span>
        </div>
      )}
      
      {/* Fallback text for SEO */}
      <span className="sr-only">
        AIDYN Technologies Inc. - AI Vision UniFi
      </span>
    </div>
  )
}
