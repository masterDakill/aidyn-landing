'use client'

import dynamic from 'next/dynamic'

const Dashboard3DWithFloors = dynamic(
  () => import('@/components/Dashboard3DWithFloors'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-400">Chargement Dashboard 3D avec Étages...</p>
        </div>
      </div>
    )
  }
)

export default function Dashboard3DTestPage() {
  return <Dashboard3DWithFloors />
}
