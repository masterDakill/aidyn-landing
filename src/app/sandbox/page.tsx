'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import { useSearchParams } from 'next/navigation'

const Model3D = dynamic(() => import('@/components/Model3D'), { ssr: false })

function SandboxContent() {
  const params = useSearchParams()
  const modelParam = params?.get('model') || 'mason'

  const ORIGIN = process.env.NEXT_PUBLIC_ASSET_ORIGIN || '/assets/models'
  const modelMap: Record<string,string> = {
    aidyn: `${ORIGIN}/aidyn-dashboard.glb`,
    mason: `${ORIGIN}/mason-sterling-logo-original.glb`
  }

  const modelPath = modelMap[modelParam] || modelMap['mason']

  return (
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
          />
        </div>
      </div>
    </main>
  )
}

export default function SandboxPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={
        <main className="relative min-h-screen bg-slate-950 py-20">
          <div className="container mx-auto px-6">
            <h1 className="mb-6 text-3xl font-bold text-white">Sandbox 3D</h1>
            <p className="mb-6 text-slate-400">Chargement...</p>
          </div>
        </main>
      }>
        <SandboxContent />
      </Suspense>
    </>
  )
}
