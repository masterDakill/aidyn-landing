import { Metadata } from 'next'
import Hero3D from '@/components/Hero3D'
import Innovation3DEnhanced from '@/components/Innovation3DEnhanced'

export const metadata: Metadata = {
  title: 'Démo 3D Interactive | AIDYN Technologies',
  description: 'Découvrez AIDYN Technologies avec des modèles 3D interactifs. Explorez notre logo animé, technologies avancées et innovations en temps réel.',
}

export default function Demo3DPage() {
  return (
    <main className="min-h-screen">
      {/* Hero with 3D Logo */}
      <Hero3D />

      {/* Innovation 3D with Dashboard Model */}
      <Innovation3DEnhanced />

      {/* CTA Section */}
      <section className="section-padding bg-slate-950">
        <div className="container-max">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Prêt à Explorer Plus?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Découvrez notre galerie complète de modèles 3D interactifs
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/modeles-3d"
                className="rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:scale-105"
              >
                Voir Tous les Modèles 3D
              </a>
              <a
                href="/"
                className="rounded-xl border-2 border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Retour à l&apos;Accueil
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
