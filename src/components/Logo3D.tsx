'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// 3D Animated Logo Component with mouse tracking
function AnimatedLogoMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Mouse-reactive rotation with smooth interpolation - INCREASED SENSITIVITY
      const targetRotationY = state.clock.elapsedTime * 0.05 + mouseRef.current.x * 0.8
      const targetRotationX = mouseRef.current.y * 0.6

      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.08
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.08

      // Floating effect - AMPLIFIED
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.25

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

      {/* Glowing particles around logo - INCREASED COUNT */}
      {hovered && (
        <>
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * Math.PI * 2
            const radius = 2 + Math.sin(i * 0.5) * 0.3
            const height = Math.cos(i * 0.8) * 0.4
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius * 0.5 + height,
                  Math.sin(angle) * radius
                ]}
              >
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color={i % 2 === 0 ? "#06B6D4" : "#3B82F6"} />
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
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
        
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
            autoRotateSpeed={0.8}
            rotateSpeed={1.5}
            enableDamping
            dampingFactor={0.05}
          />
        )}
      </Canvas>
    </div>
  )
}
