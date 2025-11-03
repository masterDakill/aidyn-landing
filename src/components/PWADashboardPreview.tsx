'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Monitor, Smartphone, Tablet, Maximize2, X } from 'lucide-react'

const dashboardVersions = [
  {
    id: 'classic',
    name: 'Version Classique Améliorée',
    description: 'Interface intuitive avec suivi en temps réel',
    url: 'https://3000-itgvpey3yma5988t57cxa-6532622b.e2b.dev/',
    icon: Monitor,
    color: 'blue'
  },
  {
    id: 'modern',
    name: 'Version Moderne (Design Automne Québec)',
    description: 'Interface premium avec thème saisonnier',
    url: 'https://3000-itgvpey3yma5988t57cxa-6532622b.e2b.dev/modern-auberge-system.html',
    icon: Smartphone,
    color: 'amber'
  }
]

export default function PWADashboardPreview() {
  const [selectedVersion, setSelectedVersion] = useState(dashboardVersions[0])
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
            <Tablet className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">
              Dashboard PWA Centralisé
            </span>
          </div>
          <h2 className="mt-6 text-5xl font-bold text-white">
            Aperçu du{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Système Existant
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-400">
            Système de suivi en temps réel déjà déployé à L&apos;Auberge Boischatel
          </p>
        </motion.div>

        {/* Version Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center gap-4"
        >
          {dashboardVersions.map((version) => {
            const Icon = version.icon
            const isActive = selectedVersion.id === version.id
            
            return (
              <button
                key={version.id}
                onClick={() => setSelectedVersion(version)}
                className={`flex items-center gap-3 rounded-xl border-2 px-6 py-4 transition-all ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-bold">{version.name}</div>
                  <div className="text-xs opacity-80">{version.description}</div>
                </div>
                {isActive && (
                  <div className="ml-2 h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Preview Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1 text-sm text-slate-400">
                  <span className="text-emerald-400">🔒</span>
                  <span className="font-mono">{selectedVersion.url}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedVersion.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-cyan-600"
                >
                  <ExternalLink className="inline h-4 w-4 mr-2" />
                  Ouvrir
                </a>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="rounded-lg bg-slate-700 p-2 text-slate-400 transition-colors hover:bg-slate-600 hover:text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* iframe Preview */}
            <div className="relative bg-white" style={{ height: isFullscreen ? '80vh' : '600px' }}>
              <iframe
                src={selectedVersion.url}
                title={selectedVersion.name}
                className="h-full w-full"
                sandbox="allow-scripts allow-same-origin allow-forms"
                loading="lazy"
              />
              
              {/* Loading Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900 pointer-events-none opacity-0 transition-opacity duration-300">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
                  <p className="mt-4 text-slate-400">Chargement...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-2 text-2xl">📊</div>
              <h3 className="mb-2 font-bold text-white">Suivi Temps Réel</h3>
              <p className="text-sm text-slate-400">
                Monitoring continu des résidents et du personnel avec localisation GPS
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-2 text-2xl">⚠️</div>
              <h3 className="mb-2 font-bold text-white">Alertes Instantanées</h3>
              <p className="text-sm text-slate-400">
                Notifications immédiates en cas d&apos;incident ou de situation à risque
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <div className="mb-2 text-2xl">📱</div>
              <h3 className="mb-2 font-bold text-white">PWA Multi-Device</h3>
              <p className="text-sm text-slate-400">
                Accessible sur mobile, tablette et desktop avec mode hors-ligne
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-6 text-center backdrop-blur-xl"
        >
          <p className="text-lg text-cyan-300">
            <strong>Phase 1 (2026)</strong> intégrera la détection IA de chutes dans ce système existant + Dashboard 3D immersif
          </p>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-6 py-4">
              <h3 className="text-xl font-bold text-white">{selectedVersion.name}</h3>
              <button
                onClick={() => setIsFullscreen(false)}
                className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Full iframe */}
            <div className="flex-1">
              <iframe
                src={selectedVersion.url}
                title={selectedVersion.name}
                className="h-full w-full"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
