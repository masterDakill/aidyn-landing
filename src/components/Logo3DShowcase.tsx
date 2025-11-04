'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Sparkles, Zap } from 'lucide-react'

// Enhanced 3D Logo with more sophisticated design and mouse tracking
function EnhancedLogoMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Mouse-reactive rotation with base animation - INCREASED SENSITIVITY, SLOWER AUTO
      const baseRotation = Math.sin(state.clock.elapsedTime * 0.15) * 0.2
      const targetRotationY = baseRotation + mouseRef.current.x * 0.9
      const targetRotationX = mouseRef.current.y * 0.7

      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1

      // Floating effect - AMPLIFIED
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.35

      // Scale on hover
      const targetScale = hovered ? 1.15 : 1
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  // AIDYN Blue color palette
  const primaryColor = '#1D4E7A'
  const accentColor = '#3B82F6'
  const highlightColor = '#06B6D4'

  return (
    <group ref={groupRef}>
      {/* Top sphere with metallic finish */}
      <mesh 
        position={[0, 1.5, 0]} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          color={primaryColor}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>

      {/* Connecting neck with smooth transition */}
      <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
        <cylinderGeometry args={[0.35, 0.6, 1.5, 32]} />
        <meshPhysicalMaterial
          color={primaryColor}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>

      {/* Bottom large sphere */}
      <mesh 
        position={[0, -0.5, 0]} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshPhysicalMaterial
          color={primaryColor}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>

      {/* Glowing ring particles - INCREASED COUNT & VARIETY */}
      {hovered && (
        <group>
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * Math.PI * 2
            const layer = Math.floor(i / 30)
            const radius = 2.5 + layer * 0.5
            const height = Math.sin(angle * 3 + layer) * 0.6
            const size = 0.08 + Math.random() * 0.04
            const colorIndex = i % 3
            const colors = [highlightColor, accentColor, '#10B981']
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  height,
                  Math.sin(angle) * radius
                ]}
              >
                <sphereGeometry args={[size, 16, 16]} />
                <meshBasicMaterial color={colors[colorIndex]} />
              </mesh>
            )
          })}
        </group>
      )}

      {/* Inner glow spheres */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

interface Logo3DShowcaseProps {
  className?: string
}

export default function Logo3DShowcase({ className = '' }: Logo3DShowcaseProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 ${className}`}>
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(29,78,122,0.2),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container-max relative px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: 3D Logo Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Glow effect behind canvas */}
              <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-500/30 blur-3xl" />
              
              <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={40} />
                
                {/* Advanced Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight 
                  position={[10, 10, 5]} 
                  intensity={1.5} 
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
                <pointLight position={[0, 0, 5]} intensity={1} color="#06B6D4" />
                <pointLight position={[5, 5, 0]} intensity={0.8} color="#3B82F6" />
                
                {/* Environment for reflections */}
                <Environment preset="city" />
                
                {/* 3D Logo */}
                <EnhancedLogoMesh />
                
                {/* Contact shadows for realism */}
                <ContactShadows
                  position={[0, -3, 0]}
                  opacity={0.5}
                  scale={10}
                  blur={2}
                  far={4}
                />
                
                {/* Interactive controls */}
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                  autoRotate
                  autoRotateSpeed={0.8}
                  rotateSpeed={2.0}
                  enableDamping
                  dampingFactor={0.05}
                />
              </Canvas>
            </div>

            {/* Interactive hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-cyan-400 flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 animate-pulse" />
                Glissez pour faire pivoter · Survolez pour animer
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 animate-pulse text-cyan-400" />
              <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                Innovation 3D Interactive
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Logo AIDYN{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                en 3D Temps Réel
              </span>
            </h2>

            <p className="mt-6 text-lg text-slate-300">
              Notre identité visuelle prend vie avec la technologie{' '}
              <strong className="text-cyan-400">WebGL</strong> et{' '}
              <strong className="text-cyan-400">Three.js</strong>.
              Une expérience interactive qui reflète notre expertise en vision par ordinateur et IA 3D.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div>
                  <h3 className="font-semibold text-white">Rendu 3D Physique</h3>
                  <p className="text-sm text-slate-400">
                    Materials métalliques réalistes avec reflets environnementaux
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
                <div>
                  <h3 className="font-semibold text-white">Interactions Intuitives</h3>
                  <p className="text-sm text-slate-400">
                    Rotation automatique, effets au survol, contrôles orbitaux
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
                <div>
                  <h3 className="font-semibold text-white">Performance Optimisée</h3>
                  <p className="text-sm text-slate-400">
                    60 FPS constant grâce à React Three Fiber
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['WebGL', 'Three.js', 'React Three Fiber', 'PBR Materials'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 text-sm font-semibold text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
