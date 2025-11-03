'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
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
  autoRotateSpeed?: number // Vitesse de rotation (0.1 = très lent, 1 = normal, 2 = rapide)
  scrollAnimation?: boolean // Animation réactive au scroll
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
  autoRotate = false,
  autoRotateSpeed = 0.5,
  scrollAnimation = false
}: Omit<Model3DProps, 'className' | 'cameraPosition' | 'enableZoom' | 'showShadows' | 'environmentPreset'>) {
  const meshRef = useRef<THREE.Group>(null)
  const [scrollY, setScrollY] = useState(0)

  // Charger le modèle GLTF/GLB - MUST be called unconditionally
  const gltf = useLoader(GLTFLoader, modelPath)

  // Écouter le scroll de la page (uniquement côté client)
  useEffect(() => {
    if (!scrollAnimation) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollAnimation])

  // Animation de rotation automatique + réaction au scroll
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (scrollAnimation) {
        // Rotation basée sur le scroll (plus fluide et naturel)
        meshRef.current.rotation.y = scrollY * 0.002
        meshRef.current.rotation.x = Math.sin(scrollY * 0.001) * 0.1
      } else if (autoRotate) {
        // Rotation automatique lente
        meshRef.current.rotation.y += delta * autoRotateSpeed
      }
    }
  })

  if (!gltf?.scene) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" wireframe />
      </mesh>
    )
  }

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
  autoRotateSpeed = 0.5,
  scrollAnimation = false,
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
            autoRotateSpeed={autoRotateSpeed}
            scrollAnimation={scrollAnimation}
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
          autoRotateSpeed={autoRotateSpeed * 4} // OrbitControls utilise une échelle différente
        />
      </Canvas>
    </div>
  )
}
