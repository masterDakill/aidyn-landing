'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

interface ParticleFieldProps {
  count?: number
  radius?: number
  speed?: number
}

export default function ParticleField({ 
  count = 1000, 
  radius = 15,
  speed = 0.3
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null)
  const noise3D = useMemo(() => createNoise3D(), [])
  
  // Generate particle positions and colors
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Random position in sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.cbrt(Math.random()) * radius
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)
      
      // Gradient color (cyan to purple)
      const t = i / count
      colors[i3] = 0.2 + t * 0.6      // R: cyan->purple
      colors[i3 + 1] = 0.6 - t * 0.4  // G: fade out
      colors[i3 + 2] = 0.9            // B: high blue
    }
    
    return [positions, colors]
  }, [count, radius])

  // Animate particles with Perlin noise
  useFrame((state) => {
    if (!points.current) return
    
    const time = state.clock.elapsedTime * speed
    const positions = points.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      const z = positions[i3 + 2]
      
      // Apply Perlin noise for organic movement
      const noiseX = noise3D(x * 0.1, y * 0.1, time * 0.5) * 0.5
      const noiseY = noise3D(x * 0.1 + 100, y * 0.1, time * 0.5) * 0.5
      const noiseZ = noise3D(x * 0.1, y * 0.1 + 100, time * 0.5) * 0.5
      
      positions[i3] += noiseX * 0.01
      positions[i3 + 1] += noiseY * 0.01
      positions[i3 + 2] += noiseZ * 0.01
      
      // Keep particles within bounds
      const distance = Math.sqrt(x * x + y * y + z * z)
      if (distance > radius) {
        const factor = radius / distance
        positions[i3] *= factor
        positions[i3 + 1] *= factor
        positions[i3 + 2] *= factor
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true
    points.current.rotation.y += 0.0005
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
