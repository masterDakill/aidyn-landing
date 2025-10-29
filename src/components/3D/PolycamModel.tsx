'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PolycamModelProps {
  polycamId?: string
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  showWireframe?: boolean
}

export default function PolycamModel({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  showWireframe = false
}: PolycamModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Auto-rotation lente
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Pour l'instant, on affiche un placeholder */}
      {/* Le vrai modèle Polycam sera chargé via leur API ou GLB téléchargé */}
      
      {/* Placeholder - Forme architecturale */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[15, 0.2, 15]} />
        <meshStandardMaterial
          color="#2d3748"
          roughness={0.8}
          metalness={0.2}
          wireframe={showWireframe}
        />
      </mesh>

      {/* Murs placeholder */}
      <mesh position={[0, 1.5, 7.5]} castShadow>
        <boxGeometry args={[15, 3, 0.2]} />
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.7}
          wireframe={showWireframe}
        />
      </mesh>

      <mesh position={[0, 1.5, -7.5]} castShadow>
        <boxGeometry args={[15, 3, 0.2]} />
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.7}
          wireframe={showWireframe}
        />
      </mesh>

      <mesh position={[7.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[15, 3, 0.2]} />
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.7}
          wireframe={showWireframe}
        />
      </mesh>

      <mesh position={[-7.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[15, 3, 0.2]} />
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.7}
          wireframe={showWireframe}
        />
      </mesh>

      {/* Info badge - Polycam metadata */}
      <mesh position={[0, 3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 1]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Grid floor */}
      <gridHelper args={[15, 30, '#4a5568', '#2d3748']} position={[0, 0.01, 0]} />
    </group>
  )
}

// Composant pour iframe Polycam embed
export function PolycamEmbed({ polycamId }: { polycamId: string }) {
  return (
    <div className="relative h-full w-full">
      <iframe
        src={`https://poly.cam/capture/${polycamId}/embed`}
        title="Polycam 3D Model"
        className="h-full w-full border-0"
        style={{
          minHeight: '400px',
          minWidth: '400px'
        }}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
