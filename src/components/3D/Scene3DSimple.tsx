'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Composant 3D simple sans drei dependencies problématiques
function SimpleFloatingBox() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color="#0ea5e9" />
    </mesh>
  )
}

// Composant principal de scène 3D simplifiée
interface Scene3DSimpleProps {
  className?: string
  interactive?: boolean
  showLogo?: boolean
  theme?: 'light' | 'dark'
}

export default function Scene3DSimple({
  className = "w-full h-96",
  interactive = true,
  showLogo = true,
  theme = 'light'
}: Scene3DSimpleProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}
      >
        <Suspense fallback={null}>
          {/* Éclairage simple */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

          {/* Contenu 3D simple */}
          {showLogo && <SimpleFloatingBox />}
        </Suspense>
      </Canvas>

      {/* Watermark */}
      <div className="absolute bottom-4 right-4 text-gray-500 text-xs font-medium">
        AIDYN 3D Preview
      </div>
    </motion.div>
  )
}