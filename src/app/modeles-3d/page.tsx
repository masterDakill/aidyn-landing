import { Metadata } from 'next'
import Model3DShowcase from '@/components/Model3DShowcase'

export const metadata: Metadata = {
  title: 'Modèles 3D Interactifs | AIDYN Technologies',
  description: 'Explorez nos produits et solutions en 3D. Interagissez avec nos modèles de logo, dispositifs SerenaCare, dashboard et environnements RPA.',
}

export default function Modeles3DPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Model3DShowcase />
    </main>
  )
}
