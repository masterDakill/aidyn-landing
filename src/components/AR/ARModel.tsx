'use client'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

interface ARModelProps {
  modelPath: string
}

export default function ARModel({ modelPath }: ARModelProps) {
  // Load GLTF model with Draco compression support
  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/')
    loader.setDRACOLoader(dracoLoader)
  })

  if (!gltf?.scene) {
    return null
  }

  return <primitive object={gltf.scene} />
}
