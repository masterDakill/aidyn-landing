'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Bot, Layers, Radar, Shield, Waves } from 'lucide-react'

const featureBlocks = [
  {
    icon: Radar,
    title: 'Détection de chutes & immobilité',
    description: 'Modèles YOLOv8 pose et logique d’urgence pour déclencher une assistance immédiate.',
    accent: 'from-cyan-500 to-sky-600'
  },
  {
    icon: Waves,
    title: 'Analyse audio de détresse',
    description: 'Modèle Whisper optimisé edge pour reconnaître cris et appels à l’aide en moins de 5 secondes.',
    accent: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Shield,
    title: 'Protection des données',
    description: 'Chiffrement, anonymisation et journalisation des accès pour respecter vie privée et conformité.',
    accent: 'from-emerald-500 to-teal-600'
  },
  {
    icon: AlertTriangle,
    title: 'Escalade intelligente',
    description: 'Alertes temps réel via SMS, Slack et tableau de bord avec scénarios personnalisables par établissement.',
    accent: 'from-purple-500 to-fuchsia-600'
  },
  {
    icon: Layers,
    title: 'Architecture hybride edge/cloud',
    description: 'Modules Jetson pour le traitement local, FastAPI + PostgreSQL/Redis pour la centralisation sécurisée.',
    accent: 'from-slate-500 to-slate-700'
  },
  {
    icon: Bot,
    title: 'Préparation Phase 2',
    description: 'Base technique prête pour assistant vocal, analytics avancée et certifications CE/RoHS.',
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
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Fondations techniques de la Phase 1</h2>
          <p className="mt-4 text-lg text-slate-600">
            Chaque fonctionnalité s’aligne sur la feuille de route 2025-2026 : fiabilité terrain, conformité et évolutivité.
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
