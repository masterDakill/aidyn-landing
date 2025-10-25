'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, TrendingUp } from 'lucide-react'

const solutions = [
  {
    icon: Shield,
    title: 'Phase 1: Détection Chute IA',
    subtitle: '2026 · MVP UniFi',
    description: 'Intégration IA sur caméras UniFi existantes pour détection automatique des chutes en temps réel.',
    highlights: [
      'YOLOv8 + Jetson edge processing',
      'Dashboard React temps réel',
      'Alertes Slack/Email instantanées',
      'Budget: 36-54k$ · 4-6 mois'
    ],
    accent: 'from-sky-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'Phase 2: Assistant Vocal IA',
    subtitle: '2027 · Expansion',
    description: 'Assistant vocal intelligent pour interaction résidents et automatisation des alertes vocales.',
    highlights: [
      'Reconnaissance vocale multilingue',
      'Compréhension contextuelle IA',
      'Intégration systèmes existants',
      'Expansion multi-sites RPA'
    ],
    accent: 'from-emerald-500 to-teal-500'
  },
  {
    icon: TrendingUp,
    title: 'Phase 3: Plateforme Complète',
    subtitle: '2028+ · Scale',
    description: 'Plateforme SaaS complète pour gestion sécurité et bien-être des résidents à grande échelle.',
    highlights: [
      'Multi-détection (chutes, errance, détresse)',
      'Analytics prédictive',
      'Certification CE/RoHS',
      'Marché: 50,000+ lits Québec'
    ],
    accent: 'from-purple-500 to-pink-500'
  }
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-slate-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Roadmap Produit
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
            Vision à <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">3 phases</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            De la détection IA sur UniFi (2026) à une plateforme SaaS complète pour le marché RPA québécois.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {solutions.map((solution, idx) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/20"
            >
              {/* Accent Bar */}
              <div className={`h-2 bg-gradient-to-r ${solution.accent}`} />

              <div className="flex flex-1 flex-col p-8">
                {/* Icon */}
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${solution.accent} p-4 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <solution.icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900">{solution.title}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">{solution.subtitle}</p>
                <p className="mt-4 text-slate-600">{solution.description}</p>

                {/* Highlights */}
                <ul className="mt-6 space-y-2">
                  {solution.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${solution.accent}`} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-600">
            Phase 1 (2026) est notre focus immédiat. Pilote Auberge Boischatel 50 lits.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
