/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Eye, 
  Users,
  Clock,
  AlertTriangle,
  MapPin
} from 'lucide-react'

// 3D Components
import ResidenceSceneOptimized from './3D/ResidenceSceneOptimized'
import Marker3D from './3D/Marker3D'
import Heatmap3D from './3D/Heatmap3D'

// Store
import { useDashboardStore } from '@/stores/dashboardStore'

function Dashboard3DScene() {
  const { residents, staff, heatmap, showHeatmap, selectedResident, setSelectedResident } = useDashboardStore()

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#00ffff" />
      
      {/* Environment */}
      <Environment preset="city" />

      {/* Residence Floor Plan - Optimized */}
      <ResidenceSceneOptimized />

      {/* Residents Markers */}
      {residents.map((resident) => (
        <Marker3D
          key={resident.id}
          position={resident.position}
          label={resident.name}
          color="#10b981"
          status={resident.status}
          type="resident"
          onClick={() => setSelectedResident(resident.id)}
        />
      ))}

      {/* Staff Markers */}
      {staff.map((person) => (
        <Marker3D
          key={person.id}
          position={person.position}
          label={person.name}
          color="#3b82f6"
          type="staff"
        />
      ))}

      {/* Heatmap */}
      {showHeatmap && <Heatmap3D data={heatmap} opacity={0.5} />}

      {/* Camera Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={5}
        maxDistance={30}
      />
    </>
  )
}

export default function Dashboard3D() {
  const {
    residents,
    incidents,
    isPlaying,
    showHeatmap,
    currentTime,
    togglePlayback,
    toggleHeatmap,
    setCurrentTime
  } = useDashboardStore()

  const [selectedView, setSelectedView] = useState<'3d' | 'top'>('3d')

  const statsCards = [
    {
      icon: Users,
      label: 'Résidents Actifs',
      value: residents.length,
      color: 'text-emerald-400'
    },
    {
      icon: AlertTriangle,
      label: 'Incidents (24h)',
      value: incidents.length,
      color: 'text-amber-400'
    },
    {
      icon: MapPin,
      label: 'Zones Actives',
      value: '12',
      color: 'text-cyan-400'
    },
    {
      icon: Clock,
      label: 'Temps Moyen',
      value: '< 3 min',
      color: 'text-purple-400'
    }
  ]

  return (
    <section className="relative min-h-screen bg-slate-950 py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
            <Eye className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-300">
              Dashboard 3D - Jumeau Numérique
            </span>
          </div>
          
          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Visualisation{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Temps Réel
            </span>
          </h2>
          
          <p className="mt-4 text-lg text-slate-300">
            Résidence en 3D interactive • Positions live • Replay incidents • Zones à risque
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {statsCards.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-slate-900/80 shadow-2xl backdrop-blur-xl"
        >
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-4">
            <div className="flex gap-2">
              <button
                onClick={togglePlayback}
                className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <button
                onClick={() => setCurrentTime(0)}
                className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleHeatmap}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                  showHeatmap
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                    : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Layers className="h-4 w-4" />
                Heatmap
              </button>
              
              <button
                onClick={() => setSelectedView(selectedView === '3d' ? 'top' : '3d')}
                className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
              >
                <Eye className="h-4 w-4" />
                {selectedView === '3d' ? 'Vue 3D' : 'Vue Dessus'}
              </button>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="relative aspect-[16/9] bg-slate-950">
            <Canvas
              shadows
              gl={{ antialias: true, alpha: false }}
              dpr={[1, 2]}
              onCreated={(state) => {
                try {
                  const gl = state.gl
                  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
                  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'unknown'
                  const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'unknown'
                  // eslint-disable-next-line no-console
                  console.info('R3F Canvas created', { renderer, vendor, webgl2: !!(gl && (gl as any).getExtension), glContext: !!gl })
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.warn('Error reading WebGL info', e)
                }
              }}
            >
              <PerspectiveCamera
                makeDefault
                position={selectedView === 'top' ? [0, 20, 0.1] : [10, 10, 10]}
                fov={60}
              />
              
              <Suspense fallback={null}>
                <Dashboard3DScene />
              </Suspense>
            </Canvas>

            {/* Overlay Info */}
            <div className="absolute bottom-4 right-4 rounded-lg border border-white/10 bg-slate-900/90 p-3 backdrop-blur-xl">
              <p className="text-xs text-slate-400">
                Temps: <span className="font-bold text-emerald-400">{currentTime.toFixed(1)}s</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">
                FPS: <span className="font-bold text-cyan-400">60</span>
              </p>
            </div>
          </div>

          {/* Timeline (simplified) */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-400">Timeline</span>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  style={{ width: `${(currentTime % 10) * 10}%` }}
                />
              </div>
              <span className="text-sm font-mono text-slate-400">
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl"
        >
          <h3 className="mb-4 text-lg font-bold text-white">Légende</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-300">Résidents (Sécuritaire)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-300">Alerte (Surveillance)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm text-slate-300">Incident (Intervention)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-300">Personnel (Actif)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-red-500" />
              <span className="text-sm text-slate-300">Heatmap (Zones à Risque)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
