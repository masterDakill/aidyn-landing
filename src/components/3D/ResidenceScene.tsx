/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as THREE from 'three'

export default function ResidenceScene() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Grid lines on floor */}
      <gridHelper
        args={[20, 20, '#334155', '#1e293b']}
        position={[0, 0.01, 0]}
      />

      {/* Walls - Simplified floor plan */}
      {/* Outer walls */}
      <Wall position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={10} />
      <Wall position={[5, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={10} />
      <Wall position={[0, 0, -5]} rotation={[0, 0, 0]} length={10} />
      <Wall position={[0, 0, 5]} rotation={[0, 0, 0]} length={10} />

      {/* Room dividers */}
      <Wall position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={5} height={1.5} />
      <Wall position={[2, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={5} height={1.5} />
      
      {/* Room labels (simple boxes for now) */}
      <RoomLabel position={[-3, 0.1, 3]} label="Chambre 101" />
      <RoomLabel position={[3, 0.1, 3]} label="Chambre 102" />
      <RoomLabel position={[-3, 0.1, -3]} label="Chambre 103" />
      <RoomLabel position={[3, 0.1, -3]} label="Chambre 104" />
      <RoomLabel position={[0, 0.1, 0]} label="Corridor" />

      {/* Ambient objects */}
      <Furniture position={[-3.5, 0, 3.5]} type="bed" />
      <Furniture position={[3.5, 0, 3.5]} type="bed" />
      <Furniture position={[-3.5, 0, -3.5]} type="bed" />
      <Furniture position={[3.5, 0, -3.5]} type="bed" />
    </group>
  )
}

// Wall component
function Wall({
  position,
  rotation = [0, 0, 0],
  length = 5,
  height = 2
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  length?: number
  height?: number
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[length, height, 0.1]} />
      <meshStandardMaterial
        color="#334155"
        transparent
        opacity={0.5}
        roughness={0.7}
      />
    </mesh>
  )
}

// Room label (floor text)
function RoomLabel({
  position,
  label
}: {
  position: [number, number, number]
  label: string
}) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.5, 0.5]} />
      <meshBasicMaterial
        color="#475569"
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

// Simple furniture representation
function Furniture({
  position,
  type
}: {
  position: [number, number, number]
  type: 'bed' | 'chair' | 'table'
}) {
  const dimensions: Record<string, [number, number, number]> = {
    bed: [1.5, 0.5, 2],
    chair: [0.5, 0.8, 0.5],
    table: [1, 0.7, 1]
  }

  const size = dimensions[type] || [1, 1, 1]

  return (
    <mesh position={[position[0], size[1] / 2, position[2]]}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#475569"
        transparent
        opacity={0.4}
        roughness={0.8}
      />
    </mesh>
  )
}
