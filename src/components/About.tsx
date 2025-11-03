'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, Award, Rocket } from 'lucide-react'

const highlights = [
  {
    icon: Target,
    title: 'Focus Stratégique',
    description: 'Solution IA de détection de chutes intégrable sur infrastructure existante - Approche pragmatique.'
  },
  {
    icon: TrendingUp,
    title: 'Marché Porteur',
    description: 'Secteur des résidences pour aînés en forte croissance avec besoins critiques en sécurité.'
  },
  {
    icon: Award,
    title: 'Avantage Compétitif',
    description: 'Intégration sur caméras existantes sans ajout de matériel coûteux - Intelligence edge computing.'
  },
  {
    icon: Rocket,
    title: 'Approche Agile',
    description: 'Développement itératif rapide avec validation continue sur sites pilotes.'
  }
]

const metrics = [
  { value: 'Optimisé', label: 'Budget Contrôlé', sublabel: 'Développement efficace' },
  { value: 'Rapide', label: 'Time-to-Market', sublabel: 'Déploiement 2026' },
  { value: '>95%', label: 'Précision IA', sublabel: 'Technologie validée' }
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-slate-50 to-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-600/30 bg-sky-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sky-600">
            À Propos · AIDYN Technologies
          </div>
          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Innovation IA pour la{' '}
            <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              sécurité des aînés
            </span>
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            AIDYN Technologies développe des solutions d&apos;intelligence artificielle pour prévenir les incidents critiques
            en résidences pour aînés, en commençant par la détection automatique de chutes.
          </p>
        </motion.div>

        {/* Key Highlights */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 p-3 text-white shadow-lg shadow-sky-500/30 transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-slate-900">Métriques Clés Phase 1</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-slate-900">{metric.label}</div>
                <div className="mt-1 text-xs text-slate-500">{metric.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 p-1 shadow-lg shadow-sky-500/30">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-4xl font-bold text-white">
                MC
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl font-bold text-slate-900">Mathieu Chamberland</h4>
              <p className="mt-1 text-sm font-semibold text-sky-600">CEO & Fondateur · AIDYN Technologies</p>
              <p className="mt-4 text-sm text-slate-600">
                Spécialiste en IA et systèmes d&apos;urgence pour RPA. Vision: Rendre la technologie de détection de chute
                accessible et abordable pour toutes les résidences au Québec.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
