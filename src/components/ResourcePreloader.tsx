'use client'

import { useEffect } from 'react'

// Critical assets to preload for faster initial render
const CRITICAL_IMAGES = [
  '/images/AIDYN_Hero_Dark_-_Variante_Optimise_Alternative.png',
  '/images/brand/aidyn-logo-full-dark.png',
  '/icon.png',
]

const CRITICAL_MODELS = [
  '/models/aidyn_logo_optimized.glb',
]

/**
 * Preloads critical resources for optimal performance
 * - Images: Hero image, logo, icons
 * - 3D Models: Logo model for above-the-fold 3D content
 * - Fonts: Already handled by Next.js font optimization
 */
export default function ResourcePreloader() {
  useEffect(() => {
    // Preload critical images
    CRITICAL_IMAGES.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      // Add fetchpriority for the most critical image
      if (src.includes('Hero')) {
        link.setAttribute('fetchpriority', 'high')
      }
      document.head.appendChild(link)
    })

    // Preload 3D models if WebGL is supported
    if (typeof window !== 'undefined' && 'WebGLRenderingContext' in window) {
      CRITICAL_MODELS.forEach((src) => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'fetch'
        link.href = src
        link.setAttribute('crossOrigin', 'anonymous')
        document.head.appendChild(link)
      })
    }

    // Preload Draco decoder if using compressed models
    const dracoLink = document.createElement('link')
    dracoLink.rel = 'dns-prefetch'
    dracoLink.href = 'https://www.gstatic.com'
    document.head.appendChild(dracoLink)

    // Prefetch next.js chunks for faster navigation
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Prefetch critical routes
        const routes = ['/demo-videos', '/sandbox']
        routes.forEach((route) => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.href = route
          document.head.appendChild(link)
        })
      })
    }
  }, [])

  return null
}
