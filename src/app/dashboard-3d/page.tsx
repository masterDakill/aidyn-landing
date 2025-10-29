import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'

// Load Dashboard3D with SSR disabled
const Dashboard3D = dynamic(
  () => import('@/components/Dashboard3D'),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-400">Chargement du Dashboard 3D...</p>
        </div>
      </div>
    )
  }
)

export const metadata = {
  title: 'Dashboard 3D | AIDYN Technologies',
  description: 'Jumeau Numérique - Visualisation 3D temps réel de la résidence'
}

export default function Dashboard3DPage() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <Dashboard3D />
      </main>
    </>
  )
}
