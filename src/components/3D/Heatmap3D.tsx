'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { HeatmapData } from '@/stores/dashboardStore'

interface Heatmap3DProps {
  data: HeatmapData[]
  opacity?: number
}

export default function Heatmap3D({ data, opacity = 0.6 }: Heatmap3DProps) {
  // Generate heatmap visualization
  const heatmapElements = useMemo(() => {
    return data.map((point, index) => {
      // Color based on intensity (green -> yellow -> red)
      const color = new THREE.Color()
      if (point.intensity < 0.5) {
        color.setHSL(0.33, 1, 0.5) // Green
      } else if (point.intensity < 0.75) {
        color.setHSL(0.16, 1, 0.5) // Yellow
      } else {
        color.setHSL(0, 1, 0.5) // Red
      }

      // Height based on intensity
      const height = point.intensity * 2

      return (
        <group key={index} position={point.position}>
          {/* Cylindrical heatmap pillar */}
          <mesh position={[0, height / 2, 0]}>
            <cylinderGeometry args={[0.3, 0.4, height, 16]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={opacity}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Base circle */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <circleGeometry args={[0.4, 32]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity * 0.5}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Glow ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <ringGeometry args={[0.4, 0.6, 32]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity * 0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Top cap */}
          <mesh position={[0, height, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={opacity * 0.8}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      )
    })
  }, [data, opacity])

  return <group>{heatmapElements}</group>
}
