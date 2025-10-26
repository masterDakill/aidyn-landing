'use client'

import { motion } from 'framer-motion'
import { Brain, Box, Eye, Layers } from 'lucide-react'
import dynamic from 'next/dynamic'

const Model3D = dynamic(() => import('./Model3D'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
    </div>
  )
})

const innovations = [
  {
    icon: Brain,
    title: 'Analyse Posturale Prédictive',
    description: 'Détection AVANT la chute grâce au scoring de risque prédictif basé sur l&apos;IA',
    metric: '>60% réduction incidents',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Box,
    title: 'Carte Thermique 3D Intelligente',
    description: 'Reconstruction spatiale 3D avec prédiction des zones futures à risque',
    metric: 'Précision ±10cm',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Eye,
    title: 'Vision Multi-Caméra Fusionnée',
    description: 'Tracking seamless 360° entre caméras avec position 3D temps réel',
    metric: '>98% précision',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Layers,
    title: 'Jumeau Numérique Temps Réel',
    description: 'Réplique 3D complète de la résidence avec overlay résidents et personnel',
    metric: 'WebGL temps réel',
    color: 'from-sky-500 to-indigo-500'
  }
]

export default function Innovation3DEnhanced() {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="container-max relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
            <Layers className="h-4 w-4" /> Innovation 3D
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl">
            Technologies <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">3D Avancées</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Au-delà de la simple détection: vision 3D, analyse prédictive et jumeaux numériques
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Modèle 3D Interactif */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/50 to-slate-950/50 p-4 shadow-2xl shadow-purple-500/20 backdrop-blur">
              <Model3D 
                modelPath="/models/dashboard-3d.glb"
                scale={1.5}
                autoRotate={true}
                cameraPosition={[0, 2, 6]}
                environmentPreset="warehouse"
                showShadows={true}
                className="h-full w-full"
              />
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                  <Box className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Dashboard 3D Interactif</p>
                  <p className="text-xs text-slate-400">🖱️ Cliquez et glissez pour explorer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Innovation Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {innovations.map((innovation, index) => (
              <motion.div
                key={innovation.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/20"
              >
                {/* Gradient accent */}
                <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${innovation.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${innovation.color} p-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <innovation.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{innovation.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{innovation.description}</p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-purple-300">
                      {innovation.metric}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-950/30 to-cyan-950/30 p-6 backdrop-blur"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
            <span className="font-semibold text-white">Stack 3D:</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">YOLOv8 Pose</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">MediaPipe 3D</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">Multi-View Geometry</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">WebGL / Three.js</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">Spatial Computing</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
