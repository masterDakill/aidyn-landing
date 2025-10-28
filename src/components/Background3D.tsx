'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

interface Background3DProps {
  modelPath: string
  opacity?: number
  scale?: number
  scrollSpeed?: number
}

function BackgroundModel({ 
  modelPath, 
  scale = 1,
  scrollSpeed = 0.001
}: { 
  modelPath: string
  scale: number
  scrollSpeed: number
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [scrollY, setScrollY] = useState(0)

  // Charger le modèle
  const gltf = useLoader(GLTFLoader, modelPath)

  // Écouter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animation basée sur le scroll
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollY * scrollSpeed
      meshRef.current.rotation.x = Math.sin(scrollY * scrollSpeed * 0.5) * 0.1
    }
  })

  if (!gltf?.scene) return null

  // Appliquer l'opacité à tous les matériaux
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.material) {
        const material = child.material as THREE.MeshStandardMaterial
        material.transparent = true
        material.opacity = 0.15
        material.depthWrite = false
      }
    }
  })

  return (
    <group ref={meshRef} scale={scale} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export default function Background3D({
  modelPath,
  opacity = 0.15,
  scale = 3,
  scrollSpeed = 0.001
}: Background3DProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        className="h-full w-full"
        gl={{ alpha: true, antialias: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        
        {/* Lumières douces */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        
        {/* Environnement subtil */}
        <Environment preset="studio" />

        {/* Modèle 3D en fond */}
        <Suspense fallback={null}>
          <BackgroundModel 
            modelPath={modelPath}
            scale={scale}
            scrollSpeed={scrollSpeed}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
