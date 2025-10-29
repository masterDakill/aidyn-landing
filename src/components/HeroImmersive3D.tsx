'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

// Dynamic imports for 3D components
import ParticleField from './3D/ParticleField'
import InteractiveModel from './3D/InteractiveModel'
import HolographicGrid from './3D/HolographicGrid'

// Loading component
function CanvasLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <Sparkles className="mx-auto h-12 w-12 animate-pulse text-cyan-400" />
        <p className="mt-4 text-sm text-slate-400">Chargement de l'expérience 3D...</p>
      </div>
    </div>
  )
}

export default function HeroImmersive3D() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          className="h-full w-full"
          gl={{ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]} // Responsive pixel ratio
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00ffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ff" />
          <pointLight position={[0, 0, 10]} intensity={2} color="#00ffff" distance={20} />
          
          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* 3D Content */}
          <Suspense fallback={null}>
            {/* Holographic Grid Background */}
            <HolographicGrid size={60} divisions={60} color="#00ffff" />
            
            {/* Particle Field */}
            <ParticleField count={1500} radius={20} speed={0.3} />
            
            {/* Interactive Logo Model */}
            <InteractiveModel
              modelPath="/models/aidyn_logo.glb"
              scale={1.5}
              autoRotate={true}
              mouseTracking={true}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 animate-pulse text-cyan-400" />
              <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                Phase 1 - 2026
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
            >
              Intelligence{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Artificielle
              </span>
              <br />
              au Service des{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Aînés
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 max-w-2xl text-xl text-slate-300 md:text-2xl"
            >
              Détection de chutes en <strong className="text-cyan-400">temps réel</strong> avec 
              vision IA avancée. Compatible avec vos caméras <strong className="text-emerald-400">UniFi existantes</strong>.
              Dashboard 3D immersif inclus dès Phase 1.
            </motion.p>

            {/* KPI Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex flex-wrap gap-8"
            >
              <div className="group">
                <div className="text-4xl font-bold text-cyan-400 transition-all duration-300 group-hover:scale-110">
                  ≥95%
                </div>
                <div className="text-sm text-slate-400">Précision IA</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-emerald-400 transition-all duration-300 group-hover:scale-110">
                  &lt;500ms
                </div>
                <div className="text-sm text-slate-400">Latence</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-purple-400 transition-all duration-300 group-hover:scale-110">
                  &lt;5%
                </div>
                <div className="text-sm text-slate-400">Faux Positifs</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Link
                href="#contact"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-8 py-4 font-bold text-white shadow-2xl shadow-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/70"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Demander une Démo
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <Link
                href="#how-it-works"
                className="group rounded-xl border-2 border-cyan-500/30 bg-cyan-500/5 px-8 py-4 font-bold text-cyan-300 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-500/10"
              >
                <span className="flex items-center gap-2">
                  Découvrir le Pipeline
                  <Sparkles className="h-5 w-5" />
                </span>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-20"
            >
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <span className="text-xs uppercase tracking-wider">Scroll pour découvrir</span>
                <div className="h-12 w-6 rounded-full border-2 border-slate-700 p-1">
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-cyan-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
