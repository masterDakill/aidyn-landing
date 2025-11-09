/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { Scan, AlertCircle } from 'lucide-react'

interface ARViewerProps {
  modelPath: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  title?: string
}

// Note: Full AR implementation will be added in future iteration
// For now, this is a placeholder with browser support detection
export default function ARViewer({
  modelPath,
  scale = 0.5,
  position = [0, 0, -1.5],
  rotation = [0, 0, 0],
  title = 'Voir en AR'
}: ARViewerProps) {
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if WebXR is supported
    if (typeof navigator !== 'undefined' && 'xr' in navigator) {
      navigator.xr?.isSessionSupported('immersive-ar').then((supported) => {
        setIsARSupported(supported)
      }).catch(() => {
        setIsARSupported(false)
      })
    } else {
      setIsARSupported(false)
    }
  }, [])

  if (isARSupported === null) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-sm text-slate-300">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
        <span>Vérification AR...</span>
      </div>
    )
  }

  if (!isARSupported) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
        <AlertCircle className="h-4 w-4" />
        <span>AR non disponible sur cet appareil</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          // For now, show a message that AR needs to be opened in a compatible browser
          alert('Pour utiliser la Réalité Augmentée:\n\n1. Ouvrez ce site sur un appareil mobile (Android/iOS)\n2. Utilisez Chrome ou Safari\n3. La fonctionnalité AR sera disponible automatiquement!')
        }}
        className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:from-cyan-400 hover:to-blue-400 hover:shadow-cyan-500/50"
      >
        <Scan className="h-5 w-5" />
        {title}
      </button>
    </div>
  )
}
