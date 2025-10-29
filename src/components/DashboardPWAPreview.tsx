'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Monitor, Smartphone, RefreshCw, Maximize2 } from 'lucide-react'

type DashboardVersion = 'classic' | 'modern'

export default function DashboardPWAPreview() {
  const [activeVersion, setActiveVersion] = useState<DashboardVersion>('modern')
  const [isLoading, setIsLoading] = useState(false)

  const dashboards = {
    classic: {
      url: 'https://3000-itgvpey3yma5988t57cxa-6532622b.e2b.dev/',
      title: 'Version Classique Améliorée',
      description: 'Interface traditionnelle optimisée avec fonctionnalités avancées',
      icon: Monitor,
      color: 'blue'
    },
    modern: {
      url: 'https://3000-itgvpey3yma5988t57cxa-6532622b.e2b.dev/modern-auberge-system.html',
      title: 'Version Moderne - Design Automne Québec',
      description: 'Interface moderne avec thème automnal du Québec',
      icon: Smartphone,
      color: 'amber'
    }
  }

  const currentDashboard = dashboards[activeVersion]

  const handleVersionChange = (version: DashboardVersion) => {
    setIsLoading(true)
    setActiveVersion(version)
    setTimeout(() => setIsLoading(false), 800)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="container relative mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
            <Monitor className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">
              Dashboard PWA Centralisé
            </span>
          </div>
          
          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Système de Gestion{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              en Temps Réel
            </span>
          </h2>
          
          <p className="mx-auto mt-4 max-w-3xl text-xl text-slate-400">
            Dashboard centralisé pour la gestion complète de la résidence - 
            Disponible en version classique et moderne
          </p>
        </motion.div>

        {/* Version Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center gap-4"
        >
          {(Object.keys(dashboards) as DashboardVersion[]).map((version) => {
            const dash = dashboards[version]
            const DashIcon = dash.icon
            const isActive = activeVersion === version

            return (
              <button
                key={version}
                onClick={() => handleVersionChange(version)}
                className={`group relative overflow-hidden rounded-xl border-2 px-6 py-4 transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/50'
                    : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <DashIcon className={`h-5 w-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className={`text-sm font-bold ${isActive ? 'text-cyan-400' : 'text-white'}`}>
                      {dash.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {dash.description}
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 border-2 border-cyan-500 rounded-xl"
                    />
                  )}
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* Preview Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto max-w-7xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl">
            {/* Browser Chrome */}
            <div className="mb-2 flex items-center gap-2 rounded-t-xl border-b border-slate-700 bg-slate-800/80 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="mx-4 flex flex-1 items-center gap-2 rounded-lg bg-slate-900/50 px-3 py-1.5 text-xs text-slate-400">
                <ExternalLink className="h-3 w-3" />
                <span className="truncate">{currentDashboard.url}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleVersionChange(activeVersion)}
                  className="rounded-lg bg-slate-700/50 p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                  title="Rafraîchir"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <a
                  href={currentDashboard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-cyan-500/20 p-1.5 text-cyan-400 transition-colors hover:bg-cyan-500/30"
                  title="Ouvrir dans un nouvel onglet"
                >
                  <Maximize2 className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-950">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                      <p className="mt-4 text-sm text-slate-400">Chargement du dashboard...</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.iframe
                    key={activeVersion}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={currentDashboard.url}
                    className="h-full w-full"
                    title={currentDashboard.title}
                    allow="fullscreen"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl">
              <Monitor className="mb-3 h-8 w-8 text-cyan-400" />
              <h3 className="mb-2 font-bold text-white">Interface Responsive</h3>
              <p className="text-sm text-slate-400">
                Optimisé pour tous les appareils - desktop, tablette, mobile
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl">
              <RefreshCw className="mb-3 h-8 w-8 text-emerald-400" />
              <h3 className="mb-2 font-bold text-white">Mise à Jour Temps Réel</h3>
              <p className="text-sm text-slate-400">
                Données synchronisées en direct depuis les caméras UniFi
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl">
              <Smartphone className="mb-3 h-8 w-8 text-purple-400" />
              <h3 className="mb-2 font-bold text-white">PWA Installable</h3>
              <p className="text-sm text-slate-400">
                Installation possible sur appareil pour accès hors ligne
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
