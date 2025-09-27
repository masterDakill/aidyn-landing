'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei'
import { motion } from 'framer-motion'

// Composant 3D pour le logo AIDYN flottant
function FloatingLogo() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <Center>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={5}
          position={[0, 0, 0]}
        >
          AIDYN
          <meshStandardMaterial color="#0ea5e9" />
        </Text3D>
      </Center>
    </Float>
  )
}

// Particules flottantes pour l'ambiance RPA
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <Float key={i} speed={1 + Math.random()} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={[
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#06b6d4" opacity={0.6} transparent />
      </mesh>
    </Float>
  ))

  return <>{particles}</>
}

// Composant bouton 3D interactif
function InteractiveButton({ onClick }: { onClick?: () => void }) {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh position={[2, -1, 0]} onClick={onClick}>
        <boxGeometry args={[1.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      <Center position={[2, -1, 0.11]}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.08}
          height={0.01}
        >
          Phase 1
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </Center>
    </Float>
  )
}

// Composant principal de la scène 3D
interface Scene3DProps {
  className?: string
  interactive?: boolean
  showLogo?: boolean
  theme?: 'light' | 'dark'
}

export default function Scene3D({
  className = "w-full h-96",
  interactive = true,
  showLogo = true,
  theme = 'light'
}: Scene3DProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Éclairage */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

          {/* Environnement */}
          <Environment preset={theme === 'dark' ? 'night' : 'dawn'} />

          {/* Contenu 3D */}
          {showLogo && <FloatingLogo />}
          <FloatingParticles />
          <InteractiveButton onClick={() => console.log('3D Button clicked!')} />

          {/* Contrôles */}
          {interactive && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              autoRotate
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </motion.div>
  )
}