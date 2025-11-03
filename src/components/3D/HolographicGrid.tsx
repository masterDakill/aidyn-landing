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
  divisions = 50
}: HolographicGridProps) {
  // Using soft cyan color: '#00d9ff'
  const gridRef = useRef<THREE.GridHelper>(null)
  const scanlineRef = useRef<THREE.Mesh>(null)
  const groundPlaneRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Subtle animated grid opacity
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.Material
      material.opacity = 0.08 + Math.sin(time * 0.3) * 0.03
    }

    // Very subtle scanline (barely visible)
    if (scanlineRef.current) {
      scanlineRef.current.position.y = (time * 3) % 15 - 7
      const material = scanlineRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.05 + Math.sin(time * 2) * 0.03
    }

    // Animate ground plane glow
    if (groundPlaneRef.current) {
      const material = groundPlaneRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.03 + Math.sin(time * 0.5) * 0.01
    }
  })

  return (
    <group>
      {/* Ground Plane with Subtle Glow */}
      <mesh ref={groundPlaneRef} position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size * 1.5, size * 1.5]} />
        <meshBasicMaterial
          color="#0a4f5f"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Grid - Very Fine and Subtle */}
      <gridHelper
        ref={gridRef}
        args={[size, divisions * 2, '#00d9ff', '#00d9ff']}
        position={[0, -5.9, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Subtle Horizon Lines */}
      {[-15, -10, -5, 0, 5].map((z, i) => (
        <mesh key={i} position={[0, -5.8, z]} rotation={[0, 0, 0]}>
          <planeGeometry args={[size, 0.05]} />
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Very Subtle Scanline */}
      <mesh ref={scanlineRef} position={[0, 0, 0]}>
        <planeGeometry args={[size * 1.2, 0.2]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle Ripple Rings - Only 2 */}
      {[0, 1].map((i) => (
        <RippleRing key={i} delay={i * 1.5} color="#00d9ff" />
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
    const scale = ((time * 1) % 15) + 1
    const opacity = 1 - ((time * 1) % 15) / 15

    ringRef.current.scale.set(scale, scale, 1)
    const material = ringRef.current.material as THREE.MeshBasicMaterial
    material.opacity = opacity * 0.08
  })

  return (
    <mesh ref={ringRef} position={[0, -5.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1, 1.05, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
