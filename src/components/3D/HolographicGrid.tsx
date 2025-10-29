'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HolographicGridProps {
  size?: number
  divisions?: number
  color?: string
}

export default function HolographicGrid({
  size = 50,
  divisions = 50,
  color = '#00ffff'
}: HolographicGridProps) {
  const gridRef = useRef<THREE.GridHelper>(null)
  const scanlineRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Animated grid opacity with wave effect
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.Material
      material.opacity = 0.2 + Math.sin(time * 0.5) * 0.1
    }

    // Scanline animation
    if (scanlineRef.current) {
      scanlineRef.current.position.y = (time * 5) % 20 - 10
      const material = scanlineRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.3 + Math.sin(time * 3) * 0.2
    }
  })

  return (
    <group>
      {/* Main Grid */}
      <gridHelper
        ref={gridRef}
        args={[size, divisions, color, color]}
        position={[0, -5, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Secondary Grid (Rotated) */}
      <gridHelper
        args={[size, divisions, color, color]}
        position={[0, -5, 0]}
        rotation={[0, Math.PI / 4, 0]}
        material-opacity={0.1}
        material-transparent
      />

      {/* Vertical Grid */}
      <gridHelper
        args={[size, divisions, color, color]}
        position={[0, 0, -10]}
        rotation={[Math.PI / 2, 0, 0]}
        material-opacity={0.15}
        material-transparent
      />

      {/* Scanline Effect */}
      <mesh ref={scanlineRef} position={[0, 0, 0]}>
        <planeGeometry args={[size, 0.5]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ripple Rings */}
      {[0, 1, 2, 3].map((i) => (
        <RippleRing key={i} delay={i * 0.5} color={color} />
      ))}
    </group>
  )
}

// Ripple Ring Component
function RippleRing({ delay, color }: { delay: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ringRef.current) return

    const time = state.clock.elapsedTime + delay
    const scale = ((time * 2) % 10) + 1
    const opacity = 1 - ((time * 2) % 10) / 10

    ringRef.current.scale.set(scale, scale, 1)
    const material = ringRef.current.material as THREE.MeshBasicMaterial
    material.opacity = opacity * 0.3
  })

  return (
    <mesh ref={ringRef} position={[0, -4.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1, 1.1, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
