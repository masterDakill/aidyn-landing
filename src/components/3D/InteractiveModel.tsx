'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

interface InteractiveModelProps {
  modelPath: string
  scale?: number
  autoRotate?: boolean
  mouseTracking?: boolean
}

export default function InteractiveModel({
  modelPath,
  scale = 1,
  autoRotate = true,
  mouseTracking = true
}: InteractiveModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, modelPath)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // Track mouse position
  useEffect(() => {
    if (!mouseTracking) return

    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseTracking])

  // Apply premium materials with glow
  useEffect(() => {
    if (!gltf?.scene) return

    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          const material = child.material as THREE.MeshStandardMaterial
          
          // Enhanced material properties
          material.transparent = true
          material.opacity = 0.9
          material.metalness = 0.8
          material.roughness = 0.2
          material.envMapIntensity = 1.5
          
          // Add emissive glow
          material.emissive = new THREE.Color(0x00ffff)
          material.emissiveIntensity = 0.3
        }
      }
    })
  }, [gltf])

  // Smooth animation with mouse tracking
  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Auto rotation
    if (autoRotate) {
      groupRef.current.rotation.y = time * 0.2
    }

    // Mouse tracking with smooth interpolation
    if (mouseTracking) {
      const targetRotationY = mouse.x * 0.5
      const targetRotationX = mouse.y * 0.3

      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05
    }

    // Subtle floating animation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.3
    
    // Pulsing scale effect
    const pulseScale = 1 + Math.sin(time * 0.8) * 0.05
    groupRef.current.scale.setScalar(scale * pulseScale)
  })

  if (!gltf?.scene) return null

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene.clone()} />
    </group>
  )
}
