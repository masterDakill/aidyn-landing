import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Modèles 3D - En Développement | AIDYN Technologies',
  description: 'Notre galerie 3D interactive est en cours de développement. Revenez bientôt pour découvrir nos produits en 3D.',
}

export default function Modeles3DPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          {/* Icon */}
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 backdrop-blur-xl">
            <Wrench className="h-12 w-12 text-sky-400" />
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Galerie 3D
            </span>
            <br />
            En Développement
          </h1>

          {/* Description */}
          <p className="mb-8 text-lg text-slate-300">
            Notre galerie de modèles 3D interactifs est actuellement en cours de développement. 
            Nous travaillons à vous offrir une expérience immersive pour explorer nos produits en 3D.
          </p>

          <p className="mb-12 text-slate-400">
            En attendant, découvrez notre logo 3D interactif directement sur la page d&apos;accueil!
          </p>

          {/* CTA Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/50"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Retour à l&apos;accueil
          </Link>

          {/* Timeline hint */}
          <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Bientôt disponible
          </div>
        </div>
      </div>
    </main>
  )
}
