'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import { useSearchParams } from 'next/navigation'

const Model3D = dynamic(() => import('@/components/Model3D'), { ssr: false })

export const metadata = {
  title: 'Sandbox 3D | AIDYN Technologies',
  description: 'Espace expérimental 3D - Sandbox'
}

export default function SandboxPage() {
  const params = useSearchParams()
  const modelParam = params?.get('model') || 'mason'

  const modelMap: Record<string,string> = {
    aidyn: 'https://cdn.builder.io/o/assets%2F4db9e5299a5e4e3f8495bde095aca588%2F47b85673f6d147b08630ec4ed58d89c3?alt=media&token=ef195dc9-390c-4475-817d-b0e73e5ef8a3&apiKey=4db9e5299a5e4e3f8495bde095aca588',
    mason: 'https://cdn.builder.io/o/assets%2F4db9e5299a5e4e3f8495bde095aca588%2F0a3acfa4dacc4ac99df1c6b083d9485d?alt=media&token=fe2a2d65-f4b6-43e5-9dea-c4dcf2708a91&apiKey=4db9e5299a5e4e3f8495bde095aca588'
  }

  const modelPath = modelMap[modelParam] || modelMap['mason']

  return (
    <>
      <Navigation />
      <main className="relative min-h-screen bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          <h1 className="mb-6 text-3xl font-bold text-white">Sandbox 3D</h1>
          <p className="mb-6 text-slate-400">Mode: {modelParam}</p>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <Model3D
              modelPath={modelPath}
              scale={modelParam === 'aidyn' ? 1 : 0.9}
              position={[0, -0.2, 0]}
              rotation={[0, Math.PI / 4, 0]}
              autoRotate={modelParam !== 'aidyn'}
              autoRotateSpeed={0.5}
              enableDraco={true}
            />
          </div>
        </div>
      </main>
    </>
  )
}
