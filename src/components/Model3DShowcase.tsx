'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Layers, Cpu, Zap } from 'lucide-react'

// Import dynamique pour éviter erreurs SSR avec Three.js
const Model3D = dynamic(() => import('./Model3D'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-900/50 backdrop-blur">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
        <p className="mt-4 text-sm text-slate-300">Chargement modèle 3D...</p>
      </div>
    </div>
  )
})

interface ModelConfig {
  id: string
  name: string
  description: string
  modelPath: string
  icon: typeof Box
  scale?: number
  rotation?: [number, number, number]
  position?: [number, number, number]
  cameraPosition?: [number, number, number]
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby'
}

const models: ModelConfig[] = [
  {
    id: 'logo',
    name: 'Logo AIDYN 3D',
    description: 'Logo animé interactif avec rotation automatique',
    modelPath: '/models/logo-aidyn.glb',
    icon: Layers,
    scale: 1.5,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    cameraPosition: [0, 0, 5],
    environmentPreset: 'studio'
  },
  {
    id: 'polycam',
    name: 'Scan Polycam 3D',
    description: 'Exemple de scan 3D photogramétrique avec textures réalistes',
    modelPath: '/models/polycam-example.glb',
    icon: Box,
    scale: 1.2,
    rotation: [0, 0, 0],
    position: [0, -0.5, 0],
    cameraPosition: [0, 0, 3],
    environmentPreset: 'sunset'
  },
  {
    id: 'device',
    name: 'Dispositif SerenaCare',
    description: 'Bracelet connecté IP67 avec capteurs biométriques',
    modelPath: '/models/serenacare-device.glb',
    icon: Box,
    scale: 2,
    rotation: [0.2, 0, 0],
    position: [0, -0.5, 0],
    cameraPosition: [0, 0, 4],
    environmentPreset: 'city'
  },
  {
    id: 'dashboard',
    name: 'Interface Dashboard 3D',
    description: 'Tableau de bord interactif avec visualisation données',
    modelPath: '/models/dashboard-3d.glb',
    icon: Cpu,
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    cameraPosition: [0, 2, 6],
    environmentPreset: 'warehouse'
  },
  {
    id: 'scene',
    name: 'Scène Complète',
    description: 'Environnement RPA avec système de surveillance',
    modelPath: '/models/scene.gltf',
    icon: Zap,
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, -1, 0],
    cameraPosition: [5, 3, 5],
    environmentPreset: 'apartment'
  }
]

export default function Model3DShowcase() {
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(models[0])
  const [autoRotate, setAutoRotate] = useState(true)
  const [showShadows, setShowShadows] = useState(true)

  return (
    <section className="section-padding bg-slate-950">
      <div className="container-max">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            <Layers className="h-4 w-4" /> Modèles 3D Interactifs
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl">
            Explorez Notre Technologie en <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">3D</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Interagissez avec nos produits et solutions en temps réel
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* Sélecteur de modèles */}
          <div className="space-y-4">
            {models.map((model) => {
              const Icon = model.icon
              const isActive = selectedModel.id === model.id
              
              return (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`group w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-sky-500/50 bg-sky-500/10 shadow-lg shadow-sky-500/20'
                      : 'border-white/10 bg-white/5 hover:border-sky-500/30 hover:bg-sky-500/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-xl p-2 transition-colors ${
                      isActive ? 'bg-sky-500/20 text-sky-300' : 'bg-white/10 text-slate-400 group-hover:bg-sky-500/10 group-hover:text-sky-400'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {model.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">{model.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Contrôles */}
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">Contrôles</h4>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={autoRotate}
                  onChange={(e) => setAutoRotate(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-300">Rotation automatique</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={showShadows}
                  onChange={(e) => setShowShadows(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-300">Afficher ombres</span>
              </label>

              <div className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-400">
                <p>🖱️ Clic + glisser: Rotation</p>
                <p>🔍 Molette: Zoom</p>
                <p>⌨️ Clic droit + glisser: Pan</p>
              </div>
            </div>
          </div>

          {/* Viewer 3D */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-4 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950">
              <Model3D
                modelPath={selectedModel.modelPath}
                scale={selectedModel.scale}
                rotation={selectedModel.rotation}
                position={selectedModel.position}
                cameraPosition={selectedModel.cameraPosition}
                autoRotate={autoRotate}
                enableZoom={true}
                showShadows={showShadows}
                environmentPreset={selectedModel.environmentPreset}
              />
            </div>
            
            {/* Info modèle actif */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <selectedModel.icon className="h-4 w-4 text-sky-400" />
                {selectedModel.name}
              </div>
              <p className="mt-2 text-sm text-slate-300">{selectedModel.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
