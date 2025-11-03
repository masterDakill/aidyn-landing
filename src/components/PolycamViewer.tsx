'use client'

import { useState } from 'react'
import { Maximize2, Download, Info, Box } from 'lucide-react'

interface PolycamViewerProps {
  captureId: string
  title?: string
  description?: string
}

export default function PolycamViewer({
  captureId,
  title = 'Modèle 3D Polycam',
  description = 'Exploration interactive du modèle'
}: PolycamViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const polycamUrl = `https://poly.cam/capture/${captureId}/embed`
  const polycamPageUrl = `https://poly.cam/capture/${captureId}`

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/50 p-4 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-500/20 p-2">
            <Box className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            title="Plein écran"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <a
            href={polycamPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400 transition-colors hover:bg-cyan-500/30"
            title="Voir sur Polycam"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Polycam Iframe */}
      <div className={`relative overflow-hidden rounded-xl bg-slate-950 ${
        isFullscreen ? 'fixed inset-4 z-50' : 'aspect-video'
      }`}>
        <iframe
          src={polycamUrl}
          title={title}
          className="h-full w-full"
          allow="fullscreen; xr-spatial-tracking"
          style={{
            minHeight: isFullscreen ? '100%' : '400px',
            minWidth: '280px',
            maxHeight: isFullscreen ? '100%' : '720px',
            maxWidth: isFullscreen ? '100%' : '1280px'
          }}
        />

        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute right-4 top-4 rounded-lg bg-slate-900/90 px-4 py-2 font-semibold text-white backdrop-blur-xl hover:bg-slate-800"
          >
            Fermer
          </button>
        )}
      </div>

      {/* Info Panel */}
      <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 shrink-0 text-cyan-400" />
          <div className="text-sm text-slate-300">
            <p className="mb-2 font-semibold text-white">Contrôles du modèle 3D:</p>
            <ul className="space-y-1 text-slate-400">
              <li>🖱️ <strong>Clic gauche + glisser:</strong> Rotation du modèle</li>
              <li>🖱️ <strong>Molette:</strong> Zoom avant/arrière</li>
              <li>🖱️ <strong>Clic droit + glisser:</strong> Déplacer la vue</li>
              <li>📐 <strong>Métadonnées:</strong> Dimensions incluses dans le modèle</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="mt-4 flex gap-3">
        <a
          href={polycamPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 font-semibold text-white transition-all hover:border-cyan-500/50 hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />
          Télécharger GLB
        </a>
        <a
          href={polycamPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold text-white transition-all hover:from-cyan-600 hover:to-blue-600"
        >
          <Box className="h-4 w-4" />
          Voir sur Polycam
        </a>
      </div>
    </div>
  )
}
