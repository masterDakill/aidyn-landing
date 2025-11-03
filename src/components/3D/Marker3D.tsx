'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface Marker3DProps {
  position: [number, number, number]
  label: string
  color: string
  status?: 'safe' | 'alert' | 'incident'
  type?: 'resident' | 'staff' | 'incident'
  onClick?: () => void
}

const statusColors = {
  safe: '#10b981',    // emerald-500
  alert: '#f59e0b',   // amber-500
  incident: '#ef4444' // red-500
}

export default function Marker3D({
  position,
  label,
  color,
  status = 'safe',
  type = 'resident',
  onClick
}: Marker3DProps) {
  const markerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  
  const markerColor = status ? statusColors[status] : color

  // Pulsing animation
  useFrame((state) => {
    if (!markerRef.current || !ringRef.current) return

    const time = state.clock.elapsedTime
    
    // Floating animation
    markerRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1 + 0.5
    
    // Ring pulse
    const scale = 1 + Math.sin(time * 3) * 0.2
    ringRef.current.scale.set(scale, 1, scale)
    
    // Alert blink
    if (status === 'alert' || status === 'incident') {
      const opacity = 0.5 + Math.sin(time * 4) * 0.3
      const material = ringRef.current.material as THREE.MeshBasicMaterial
      material.opacity = opacity
    }
  })

  return (
    <group position={position}>
      {/* Base Ring */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <ringGeometry args={[0.3, 0.4, 32]} />
        <meshBasicMaterial
          color={markerColor}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vertical beam */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshBasicMaterial
          color={markerColor}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Main Marker Sphere */}
      <mesh
        ref={markerRef}
        position={[0, 1, 0]}
        onClick={onClick}
        onPointerOver={() => {
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'pointer'
          }
        }}
        onPointerOut={() => {
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'auto'
          }
        }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Icon (simplified) */}
      {type === 'resident' && (
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      )}

      {/* Label Text */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>

      {/* Status Badge */}
      {status !== 'safe' && (
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={status === 'alert' ? '#f59e0b' : '#ef4444'}
          />
        </mesh>
      )}
    </group>
  )
}
