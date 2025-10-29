/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { 
  Building,
  Building2,
  Warehouse,
  Home,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

// 3D Components
import ResidenceSceneWithFloorPlans from './3D/ResidenceSceneWithFloorPlans'
import Marker3D from './3D/Marker3D'
import Heatmap3D from './3D/Heatmap3D'
import PolycamModel from './3D/PolycamModel'

// Store
import { useDashboardStore } from '@/stores/dashboardStore'

type FloorType = 'basement' | 'ground' | 'first' | 'second'

function Dashboard3DScene({ currentFloor, usePolycamModel }: { currentFloor: FloorType; usePolycamModel: boolean }) {
  const { residents, staff, heatmap, showHeatmap } = useDashboardStore()

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

      {/* Residence Floor Plan - Switch between simple and Polycam model */}
      {usePolycamModel ? (
        <PolycamModel polycamId="097328f4-7a14-453e-88a5-e0aaee44bdf9" scale={0.1} />
      ) : (
        <ResidenceSceneWithFloorPlans currentFloor={currentFloor} />
      )}

      {/* Residents Markers - filtrés par étage */}
      {residents.map((resident) => (
        <Marker3D
          key={resident.id}
          position={resident.position}
          label={resident.name}
          color="#3b82f6"
          status={resident.status}
          type="resident"
        />
      ))}

      {/* Staff Markers */}
      {staff.map((s) => (
        <Marker3D
          key={s.id}
          position={s.position}
          label={s.name}
          color="#10b981"
          status="safe"
          type="staff"
        />
      ))}

      {/* Heatmap 3D */}
      {showHeatmap && <Heatmap3D data={heatmap} opacity={0.5} />}

      {/* Camera Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  )
}

export default function Dashboard3DWithFloors() {
  const [currentFloor, setCurrentFloor] = useState<FloorType>('ground')
  const [usePolycamModel, setUsePolycamModel] = useState(false)
  const { toggleHeatmap, showHeatmap } = useDashboardStore()

  const floors = [
    { id: 'second' as FloorType, name: '2e Étage', icon: Building, color: 'purple' },
    { id: 'first' as FloorType, name: '1er Étage', icon: Building2, color: 'blue' },
    { id: 'ground' as FloorType, name: 'RDC', icon: Home, color: 'emerald' },
    { id: 'basement' as FloorType, name: 'Sous-sol', icon: Warehouse, color: 'slate' }
  ]

  return (
    <div className="relative h-screen w-full bg-slate-950">
      {/* 3D Canvas */}
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />
        <Suspense fallback={null}>
          <Dashboard3DScene currentFloor={currentFloor} usePolycamModel={usePolycamModel} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="pointer-events-none absolute inset-0">
        {/* Header */}
        <div className="pointer-events-auto flex items-center justify-between border-b border-slate-700 bg-slate-900/90 px-6 py-4 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Dashboard 3D - Jumeau Numérique
            </h1>
            <p className="text-sm text-slate-400">
              L&apos;Auberge Boischatel - Vue {floors.find(f => f.id === currentFloor)?.name}
            </p>
          </div>

          {/* Heatmap Toggle */}
          <button
            onClick={toggleHeatmap}
            className={`rounded-lg px-4 py-2 font-semibold transition-all ${
              showHeatmap
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {showHeatmap ? '🗺️ Heatmap ON' : '🗺️ Heatmap OFF'}
          </button>
        </div>

        {/* Floor Selector - Right Side */}
        <div className="pointer-events-auto absolute right-6 top-24 flex flex-col gap-2">
          {floors.map((floor) => {
            const Icon = floor.icon
            const isActive = currentFloor === floor.id
            
            return (
              <motion.button
                key={floor.id}
                onClick={() => setCurrentFloor(floor.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 font-semibold backdrop-blur-xl transition-all ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                    : 'border-slate-700 bg-slate-900/80 text-slate-400 hover:border-slate-600 hover:bg-slate-800/80'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm">{floor.name}</span>
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Quick Stats - Bottom Left */}
        <div className="pointer-events-auto absolute bottom-6 left-6 flex gap-4">
          <div className="rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 backdrop-blur-xl">
            <div className="text-2xl font-bold text-blue-400">12</div>
            <div className="text-xs text-slate-400">Résidents</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 backdrop-blur-xl">
            <div className="text-2xl font-bold text-green-400">5</div>
            <div className="text-xs text-slate-400">Personnel</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 backdrop-blur-xl">
            <div className="text-2xl font-bold text-amber-400">2</div>
            <div className="text-xs text-slate-400">Alertes</div>
          </div>
        </div>

        {/* Controls Info - Bottom Right */}
        <div className="pointer-events-auto absolute bottom-6 right-6 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 backdrop-blur-xl">
          <div className="text-xs text-slate-400">
            <div className="mb-1 font-bold text-cyan-400">Contrôles</div>
            <div>🖱️ Clic gauche + glisser = Rotation</div>
            <div>🖱️ Molette = Zoom</div>
            <div>🖱️ Clic droit + glisser = Pan</div>
          </div>
        </div>

        {/* TEST Badge */}
        <div className="pointer-events-none absolute left-6 top-24">
          <div className="rounded-lg border-2 border-amber-500 bg-amber-500/20 px-3 py-1 font-bold text-amber-400 backdrop-blur-xl">
            🚧 TEST ÉBAUCHE
          </div>
        </div>
      </div>
    </div>
  )
}
