/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { Text } from '@react-three/drei'

export default function ResidenceSceneOptimized() {
  return (
    <group>
      {/* Enhanced Floor with texture pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial
          color="#2d3748"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Grid lines - more detailed */}
      <gridHelper
        args={[24, 48, '#4a5568', '#2d3748']}
        position={[0, 0.01, 0]}
      />

      {/* Outer walls - thicker and more realistic */}
      <WallEnhanced position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} height={2.5} thickness={0.2} />
      <WallEnhanced position={[6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} height={2.5} thickness={0.2} />
      <WallEnhanced position={[0, 0, -6]} rotation={[0, 0, 0]} length={12} height={2.5} thickness={0.2} />
      <WallEnhanced position={[0, 0, 6]} rotation={[0, 0, 0]} length={12} height={2.5} thickness={0.2} />

      {/* Room dividers - interior walls */}
      <WallEnhanced position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} height={2.5} thickness={0.15} opacity={0.7} />
      <WallEnhanced position={[-3, 0, 3]} rotation={[0, 0, 0]} length={6} height={2.5} thickness={0.15} opacity={0.7} />
      <WallEnhanced position={[3, 0, 3]} rotation={[0, 0, 0]} length={6} height={2.5} thickness={0.15} opacity={0.7} />
      <WallEnhanced position={[-3, 0, -3]} rotation={[0, 0, 0]} length={6} height={2.5} thickness={0.15} opacity={0.7} />
      <WallEnhanced position={[3, 0, -3]} rotation={[0, 0, 0]} length={6} height={2.5} thickness={0.15} opacity={0.7} />

      {/* Room floor zones with different colors */}
      <RoomFloor position={[-3, 0.02, 4.5]} size={[5.8, 5.8]} color="#1e3a5f" label="Chambre 101" />
      <RoomFloor position={[3, 0.02, 4.5]} size={[5.8, 5.8]} color="#1e3a5f" label="Chambre 102" />
      <RoomFloor position={[-3, 0.02, -4.5]} size={[5.8, 5.8]} color="#1e3a5f" label="Chambre 103" />
      <RoomFloor position={[3, 0.02, -4.5]} size={[5.8, 5.8]} color="#1e3a5f" label="Chambre 104" />
      <RoomFloor position={[0, 0.02, 0]} size={[5.8, 11.8]} color="#2d1e3f" label="Corridor" />

      {/* Detailed Furniture */}
      {/* Room 101 */}
      <BedDetailed position={[-3.5, 0, 5]} rotation={0} />
      <NightstandDetailed position={[-2.5, 0, 5.5]} />
      <ChairDetailed position={[-4, 0, 4]} />

      {/* Room 102 */}
      <BedDetailed position={[3.5, 0, 5]} rotation={Math.PI} />
      <NightstandDetailed position={[2.5, 0, 5.5]} />
      <ChairDetailed position={[4, 0, 4]} />

      {/* Room 103 */}
      <BedDetailed position={[-3.5, 0, -5]} rotation={0} />
      <NightstandDetailed position={[-2.5, 0, -4.5]} />
      <ChairDetailed position={[-4, 0, -4]} />

      {/* Room 104 */}
      <BedDetailed position={[3.5, 0, -5]} rotation={Math.PI} />
      <NightstandDetailed position={[2.5, 0, -4.5]} />
      <ChairDetailed position={[4, 0, -4]} />

      {/* Corridor furniture */}
      <TableDetailed position={[0, 0, 2]} />
      <ChairDetailed position={[-0.7, 0, 2]} />
      <ChairDetailed position={[0.7, 0, 2]} />

      {/* Doors */}
      <Door position={[-3, 0, 1.5]} rotation={[0, 0, 0]} />
      <Door position={[3, 0, 1.5]} rotation={[0, 0, 0]} />
      <Door position={[-3, 0, -1.5]} rotation={[0, 0, 0]} />
      <Door position={[3, 0, -1.5]} rotation={[0, 0, 0]} />

      {/* Lighting fixtures */}
      <CeilingLight position={[-3, 2.3, 4.5]} />
      <CeilingLight position={[3, 2.3, 4.5]} />
      <CeilingLight position={[-3, 2.3, -4.5]} />
      <CeilingLight position={[3, 2.3, -4.5]} />
      <CeilingLight position={[0, 2.3, 0]} />
    </group>
  )
}

// Enhanced Wall component
function WallEnhanced({
  position,
  rotation = [0, 0, 0],
  length = 5,
  height = 2.5,
  thickness = 0.2,
  opacity = 0.8
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  length?: number
  height?: number
  thickness?: number
  opacity?: number
}) {
  return (
    <mesh position={[position[0], height / 2, position[2]]} rotation={rotation} castShadow>
      <boxGeometry args={[length, height, thickness]} />
      <meshStandardMaterial
        color="#4a5568"
        transparent
        opacity={opacity}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

// Room floor zone with label
function RoomFloor({
  position,
  size,
  color,
  label
}: {
  position: [number, number, number]
  size: [number, number]
  color: string
  label: string
}) {
  return (
    <group>
      <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={size} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          roughness={0.9}
        />
      </mesh>
      <Text
        position={[position[0], 0.05, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  )
}

// Detailed Bed
function BedDetailed({
  position,
  rotation = 0
}: {
  position: [number, number, number]
  rotation?: number
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Mattress */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.2, 0.3, 2]} />
        <meshStandardMaterial color="#5a6b7f" roughness={0.9} />
      </mesh>
      {/* Pillow */}
      <mesh position={[0, 0.55, -0.7]} castShadow>
        <boxGeometry args={[0.8, 0.15, 0.4]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      {/* Bed frame */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[1.3, 0.3, 2.1]} />
        <meshStandardMaterial color="#374151" roughness={0.7} metalness={0.3} />
      </mesh>
    </group>
  )
}

// Nightstand
function NightstandDetailed({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={[position[0], 0.3, position[2]]} castShadow>
      <boxGeometry args={[0.4, 0.6, 0.4]} />
      <meshStandardMaterial color="#475569" roughness={0.7} metalness={0.2} />
    </mesh>
  )
}

// Chair
function ChairDetailed({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.7, -0.2]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.1]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>
      {/* Legs */}
      {[-0.2, 0.2].map((x, i) =>
        [-0.2, 0.2].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.2, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color="#475569" metalness={0.5} />
          </mesh>
        ))
      )}
    </group>
  )
}

// Table
function TableDetailed({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tabletop */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Legs */}
      {[-0.6, 0.6].map((x, i) =>
        [-0.4, 0.4].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.35, z]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.7]} />
            <meshStandardMaterial color="#475569" metalness={0.5} />
          </mesh>
        ))
      )}
    </group>
  )
}

// Door
function Door({
  position,
  rotation
}: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <mesh position={[position[0], 1, position[2]]} rotation={rotation} castShadow>
      <boxGeometry args={[0.8, 2, 0.05]} />
      <meshStandardMaterial color="#5a6b7f" roughness={0.6} metalness={0.2} />
    </mesh>
  )
}

// Ceiling Light
function CeilingLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Light fixture */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial
          color="#f1f5f9"
          emissive="#fbbf24"
          emissiveIntensity={0.5}
          roughness={0.3}
        />
      </mesh>
      {/* Point light */}
      <pointLight
        intensity={0.5}
        distance={8}
        decay={2}
        color="#fbbf24"
      />
    </group>
  )
}
