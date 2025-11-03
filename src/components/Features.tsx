'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Bot, Layers, Radar, Shield, Waves } from 'lucide-react'

const featureBlocks = [
  {
    icon: Radar,
    title: 'Vision IA contextualisée',
    description: 'YOLOv8 et logique d’urgence détectent chutes et immobilité, même en faible luminosité.',
    accent: 'from-cyan-500 to-sky-600'
  },
  {
    icon: Waves,
    title: 'Audio sensible à la détresse',
    description: 'Whisper optimisé edge isole cris et appels à l’aide en moins de cinq secondes.',
    accent: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Shield,
    title: 'Conformité incorporée',
    description: 'Anonymisation, chiffrement et journaux d’accès répondent aux attentes des résidences québécoises.',
    accent: 'from-emerald-500 to-teal-600'
  },
  {
    icon: AlertTriangle,
    title: 'Escalades sur mesure',
    description: 'Alertes SMS, Slack et tableau de bord s’adaptent au protocole clinique de chaque site.',
    accent: 'from-purple-500 to-fuchsia-600'
  },
  {
    icon: Layers,
    title: 'Edge + cloud maîtrisés',
    description: 'Modules Jetson au périmètre, FastAPI et PostgreSQL au centre pour une redondance complète.',
    accent: 'from-slate-500 to-slate-700'
  },
  {
    icon: Bot,
    title: 'Base pour les prochaines phases',
    description: 'Prépare assistants vocaux, analytics prédictives et certifications CE/RoHS.',
    accent: 'from-amber-500 to-orange-600'
  }
]

export default function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Ce que la Phase 1 met en production dès maintenant</h2>
          <p className="mt-4 text-lg text-slate-600">
            Ces capacités sont en cours de validation sur le pilote Auberge Boischatel et préparent l’expansion provinciale.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureBlocks.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} p-3 text-white`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
