'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// 3D Animated Logo Component
function AnimatedLogoMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation animation
      groupRef.current.rotation.y += 0.005
      
      // Floating effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      
      // Scale on hover
      const targetScale = hovered ? 1.1 : 1
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main sphere (top circle of logo) */}
      <mesh position={[0, 1.2, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#1D4E7A"
          metalness={0.7}
          roughness={0.2}
          emissive="#3B82F6"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Connection neck */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[0.3, 0.5, 1.2, 32]} />
        <meshStandardMaterial
          color="#1D4E7A"
          metalness={0.7}
          roughness={0.2}
          emissive="#3B82F6"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Bottom sphere (large circle of logo) */}
      <mesh position={[0, -0.5, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#1D4E7A"
          metalness={0.7}
          roughness={0.2}
          emissive="#3B82F6"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Glowing particles around logo */}
      {hovered && (
        <>
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2
            const radius = 2
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius * 0.5,
                  Math.sin(angle) * radius
                ]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#06B6D4" />
              </mesh>
            )
          })}
        </>
      )}
    </group>
  )
}

interface Logo3DProps {
  width?: number
  height?: number
  interactive?: boolean
  className?: string
}

export default function Logo3D({ 
  width = 200, 
  height = 200, 
  interactive = true,
  className = '' 
}: Logo3DProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div 
        className={className}
        style={{ width, height, background: 'transparent' }} 
      />
    )
  }

  return (
    <div className={className} style={{ width, height, position: 'relative' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#06B6D4" />
        
        {/* 3D Logo */}
        <AnimatedLogoMesh />
        
        {/* Controls */}
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  )
}
