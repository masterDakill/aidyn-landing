'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

interface Model3DProps {
  modelPath: string
  scale?: number
  rotation?: [number, number, number]
  position?: [number, number, number]
  autoRotate?: boolean
  className?: string
  cameraPosition?: [number, number, number]
  enableZoom?: boolean
  showShadows?: boolean
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby'
}

function Model({ 
  modelPath, 
  scale = 1, 
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  autoRotate = false 
}: Omit<Model3DProps, 'className' | 'cameraPosition' | 'enableZoom' | 'showShadows' | 'environmentPreset'>) {
  const meshRef = useRef<THREE.Group>(null)
  const [error, setError] = useState<string | null>(null)

  // Charger le modèle GLTF/GLB
  let gltf
  try {
    gltf = useLoader(GLTFLoader, modelPath)
  } catch (err) {
    setError(`Erreur de chargement: ${err}`)
    console.error('Erreur chargement modèle 3D:', err)
  }

  // Animation de rotation automatique
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" wireframe />
      </mesh>
    )
  }

  if (!gltf) return null

  return (
    <group 
      ref={meshRef} 
      scale={scale}
      rotation={rotation}
      position={position}
    >
      <primitive object={gltf.scene} />
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#38bdf8" wireframe />
    </mesh>
  )
}

export default function Model3D({
  modelPath,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  autoRotate = true,
  className = '',
  cameraPosition = [0, 0, 5],
  enableZoom = true,
  showShadows = true,
  environmentPreset = 'studio'
}: Model3DProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas shadows={showShadows}>
        {/* Caméra */}
        <PerspectiveCamera makeDefault position={cameraPosition} />
        
        {/* Lumières */}
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1}
          castShadow={showShadows}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Environnement (réflexions réalistes) */}
        <Environment preset={environmentPreset} />

        {/* Modèle 3D avec fallback loading */}
        <Suspense fallback={<LoadingFallback />}>
          <Model 
            modelPath={modelPath}
            scale={scale}
            rotation={rotation}
            position={position}
            autoRotate={autoRotate}
          />
        </Suspense>

        {/* Ombres au sol */}
        {showShadows && (
          <ContactShadows 
            position={[0, -1.4, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2.5} 
          />
        )}

        {/* Contrôles souris (rotation, zoom, pan) */}
        <OrbitControls 
          enableZoom={enableZoom}
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  )
}
