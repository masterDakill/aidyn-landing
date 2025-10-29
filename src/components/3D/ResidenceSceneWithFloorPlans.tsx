/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { useTexture } from '@react-three/drei'

interface ResidenceSceneWithFloorPlansProps {
  currentFloor: 'basement' | 'ground' | 'first' | 'second'
}

export default function ResidenceSceneWithFloorPlans({
  currentFloor = 'ground'
}: ResidenceSceneWithFloorPlansProps) {
  
  // Pour l'instant, on va créer une ébauche simple
  // Plus tard, vous fournirez les vraies images pour les textures
  
  const floorSize = 24 // Taille du plan
  
  return (
    <group>
      {/* Floor avec texture (ébauche - couleur unie pour test) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[floorSize, floorSize]} />
        <meshStandardMaterial
          color={
            currentFloor === 'basement' ? '#3a3a4a' :
            currentFloor === 'ground' ? '#2d3748' :
            currentFloor === 'first' ? '#2a4365' :
            '#2c5282'
          }
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Grid pour référence */}
      <gridHelper
        args={[floorSize, 48, '#4a5568', '#2d3748']}
        position={[0, 0.01, 0]}
      />

      {/* Indicateur de niveau au centre */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 1]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Walls simplifiés - Layout de test basé sur les images */}
      {currentFloor === 'ground' && (
        <>
          {/* Murs extérieurs */}
          <WallSimple position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} />
          <WallSimple position={[6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} />
          <WallSimple position={[0, 0, -6]} rotation={[0, 0, 0]} length={12} />
          <WallSimple position={[0, 0, 6]} rotation={[0, 0, 0]} length={12} />
          
          {/* Murs intérieurs - approximation */}
          <WallSimple position={[0, 0, 2]} rotation={[0, 0, 0]} length={8} height={2} opacity={0.6} />
          <WallSimple position={[0, 0, -2]} rotation={[0, 0, 0]} length={8} height={2} opacity={0.6} />
          <WallSimple position={[-3, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={6} height={2} opacity={0.6} />
          <WallSimple position={[3, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={6} height={2} opacity={0.6} />
        </>
      )}

      {currentFloor === 'basement' && (
        <>
          {/* Layout sous-sol simplifié */}
          <WallSimple position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} />
          <WallSimple position={[6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} />
          <WallSimple position={[0, 0, -6]} rotation={[0, 0, 0]} length={12} />
          <WallSimple position={[0, 0, 6]} rotation={[0, 0, 0]} length={12} />
        </>
      )}

      {currentFloor === 'first' && (
        <>
          {/* 1er étage - chambres */}
          <WallSimple position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} />
          <WallSimple position={[6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} />
          <WallSimple position={[0, 0, -6]} rotation={[0, 0, 0]} length={12} />
          <WallSimple position={[0, 0, 6]} rotation={[0, 0, 0]} length={12} />
          
          {/* Dividers chambres */}
          <WallSimple position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} height={2} opacity={0.6} />
          <WallSimple position={[-3, 0, 3]} rotation={[0, 0, 0]} length={6} height={2} opacity={0.6} />
          <WallSimple position={[3, 0, 3]} rotation={[0, 0, 0]} length={6} height={2} opacity={0.6} />
        </>
      )}

      {currentFloor === 'second' && (
        <>
          {/* 2e étage - chambres */}
          <WallSimple position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} />
          <WallSimple position={[6, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} />
          <WallSimple position={[0, 0, -6]} rotation={[0, 0, 0]} length={12} />
          <WallSimple position={[0, 0, 6]} rotation={[0, 0, 0]} length={12} />
          
          {/* Dividers chambres */}
          <WallSimple position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={12} height={2} opacity={0.6} />
          <WallSimple position={[-3, 0, -3]} rotation={[0, 0, 0]} length={6} height={2} opacity={0.6} />
          <WallSimple position={[3, 0, -3]} rotation={[0, 0, 0]} length={6} height={2} opacity={0.6} />
        </>
      )}
    </group>
  )
}

// Composant mur simplifié
function WallSimple({
  position,
  rotation = [0, 0, 0],
  length = 5,
  height = 2.5,
  opacity = 0.7
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  length?: number
  height?: number
  opacity?: number
}) {
  return (
    <mesh position={[position[0], height / 2, position[2]]} rotation={rotation} castShadow>
      <boxGeometry args={[length, height, 0.15]} />
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
