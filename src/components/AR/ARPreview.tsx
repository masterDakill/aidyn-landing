'use client'

import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, PerspectiveCamera } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Maximize2, RotateCcw, Layers, Smartphone } from 'lucide-react'
import * as THREE from 'three'

// Composant pour un modèle 3D de bouton IP67
function IP67ButtonModel({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Corps principal du bouton */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.8, 0.9, 0.3, 32]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Surface pressable */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Indicateur LED */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
      </mesh>

      {/* Label flottant */}
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-semibold text-gray-800 shadow-lg">
          Bouton IP67
        </div>
      </Html>
    </group>
  )
}

// Composant dashboard 3D flottant
function Dashboard3D({ position = [2, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Écran principal */}
      <mesh>
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Contenu de l'écran */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.8, 1]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.3} />
      </mesh>

      {/* Données en temps réel */}
      <Html position={[0, 0, 0.02]} transform>
        <div className="w-48 h-28 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-lg p-3 text-white text-xs">
          <div className="flex justify-between mb-2">
            <span>RPA Status</span>
            <span className="text-green-400">●</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Uptime:</span>
              <span>99.9%</span>
            </div>
            <div className="flex justify-between">
              <span>Réponse:</span>
              <span>&lt;2s</span>
            </div>
            <div className="flex justify-between">
              <span>Alertes:</span>
              <span className="text-yellow-400">0</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

interface ARPreviewProps {
  mode?: 'button' | 'dashboard' | 'full'
  className?: string
  showControls?: boolean
}

export default function ARPreview({
  mode = 'full',
  className = "w-full h-96",
  showControls = true
}: ARPreviewProps) {
  const [isARMode, setIsARMode] = useState(false)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 2, 5])
  const [showHints, setShowHints] = useState(true)

  useEffect(() => {
    // Simuler la détection AR après 3 secondes
    const timer = setTimeout(() => {
      setShowHints(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const resetCamera = () => {
    setCameraPosition([0, 2, 5])
  }

  const toggleARMode = () => {
    setIsARMode(!isARMode)
    if (!isARMode) {
      setCameraPosition([0, 1, 3])
    } else {
      setCameraPosition([0, 2, 5])
    }
  }

  return (
    <div className={`relative ${className} rounded-2xl overflow-hidden shadow-modern-xl`}>
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: cameraPosition, fov: 75 }}
        style={{
          background: isARMode
            ? 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        }}
      >
        {/* Éclairage */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#0ea5e9" />

        {/* Contenu 3D selon le mode */}
        {(mode === 'button' || mode === 'full') && <IP67ButtonModel position={[-1.5, 0, 0]} />}
        {(mode === 'dashboard' || mode === 'full') && <Dashboard3D position={[1.5, 0, 0]} />}

        {/* Grille de sol pour l'effet AR */}
        {isARMode && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial
              color="#0ea5e9"
              transparent
              opacity={0.1}
              wireframe
            />
          </mesh>
        )}

        {/* Contrôles */}
        <OrbitControls
          enablePan={isARMode}
          enableZoom={true}
          maxDistance={10}
          minDistance={2}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hints AR */}
        <AnimatePresence>
          {showHints && isARMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-gray-800 shadow-lg pointer-events-auto"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Détection AR active - Bougez votre appareil
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contrôles */}
        {showControls && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleARMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isARMode
                  ? 'bg-green-500 text-white shadow-glow'
                  : 'bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              {isARMode ? 'Mode AR' : 'Activer AR'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetCamera}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-800 hover:bg-white transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-800 hover:bg-white transition-all duration-200"
            >
              <Layers className="w-4 h-4" />
            </motion.button>
          </div>
        )}

        {/* Indicateurs de performance */}
        <div className="absolute top-4 right-4 space-y-2 pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium text-gray-800 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              60 FPS
            </div>
          </div>
          {isARMode && (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium text-gray-800 shadow-lg">
              <div className="flex items-center gap-2">
                <Camera className="w-3 h-3" />
                Caméra active
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Watermark AIDYN */}
      <div className="absolute bottom-4 right-4 text-white/60 text-xs font-medium pointer-events-none">
        AIDYN AR Preview
      </div>
    </div>
  )
}