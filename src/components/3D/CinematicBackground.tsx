'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CinematicBackgroundProps {
  particleCount?: number
}

export default function CinematicBackground({
  particleCount = 200
}: CinematicBackgroundProps) {
  const perspectiveLinesRef = useRef<THREE.Group>(null)
  const starsRef = useRef<THREE.Points>(null)
  const glowSphereRef = useRef<THREE.Mesh>(null)
  const lensFlareRef = useRef<THREE.Group>(null)

  // Generate star field particles
  const stars = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      // Distribute stars in a large sphere
      const radius = 25 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 5
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      sizes[i] = Math.random() * 1.5 + 0.5
    }
    
    return { positions, sizes }
  }, [particleCount])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Animate stars with subtle twinkle
    if (starsRef.current) {
      const material = starsRef.current.material as THREE.PointsMaterial
      material.opacity = 0.6 + Math.sin(time * 0.5) * 0.2
    }

    // Rotate perspective lines slowly
    if (perspectiveLinesRef.current) {
      perspectiveLinesRef.current.rotation.y = time * 0.05
    }

    // Animate glow sphere pulsing
    if (glowSphereRef.current) {
      const scale = 1 + Math.sin(time * 0.8) * 0.15
      glowSphereRef.current.scale.set(scale, scale, scale)
      const material = glowSphereRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.15 + Math.sin(time * 0.8) * 0.05
    }

    // Animate lens flare rotation
    if (lensFlareRef.current) {
      lensFlareRef.current.rotation.z = time * 0.3
    }
  })

  return (
    <group>
      {/* Central Glow Sphere (like in the image) */}
      <mesh ref={glowSphereRef} position={[0, 2, -5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Lens Flare Elements */}
      <group ref={lensFlareRef} position={[0, 2, -5]}>
        {/* Main flare ring */}
        <mesh>
          <ringGeometry args={[2.2, 2.5, 64]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Secondary flare rings */}
        <mesh>
          <ringGeometry args={[3, 3.1, 64]} />
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Star Field Particles */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={stars.positions.length / 3}
            array={stars.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={stars.sizes.length}
            array={stars.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.15}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>

      {/* Perspective Lines (like flowing lines in the image bottom) */}
      <group ref={perspectiveLinesRef} position={[0, -6, 0]}>
        {/* Create radial perspective lines flowing from center */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const x = Math.cos(angle) * 15
          const z = Math.sin(angle) * 15
          
          return (
            <PerspectiveLine
              key={i}
              start={[0, 0, 0]}
              end={[x, -2, z]}
              color="#00d9ff"
              opacity={0.15}
            />
          )
        })}
      </group>

      {/* Ground Plane with Subtle Gradient Glow */}
      <mesh position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial
          color="#0a3d4f"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Additional atmospheric glow spheres (scattered) */}
      {[
        { pos: [-8, 0, -10], scale: 1.5, color: '#004d5f' },
        { pos: [10, -2, -8], scale: 1.2, color: '#00394f' },
        { pos: [0, 3, -15], scale: 2, color: '#00293f' }
      ].map((glow, i) => (
        <mesh key={i} position={glow.pos as [number, number, number]}>
          <sphereGeometry args={[glow.scale, 32, 32]} />
          <meshBasicMaterial
            color={glow.color}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// Component for perspective lines
function PerspectiveLine({
  start,
  end,
  color,
  opacity
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  opacity: number
}) {
  const lineRef = useRef<THREE.Line>(null)
  
  const line = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending
    })
    return new THREE.Line(geometry, material)
  }, [start, end, color, opacity])

  return <primitive ref={lineRef} object={line} />
}
