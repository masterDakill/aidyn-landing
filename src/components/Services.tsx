'use client'

import { motion } from 'framer-motion'
import { Building, Home, ShieldCheck } from 'lucide-react'

const solutions = [
  {
    icon: ShieldCheck,
    title: 'Santé',
    description: 'Solutions IA sécurisées pour prévenir les incidents critiques et soutenir les équipes cliniques.',
    bullets: ['Surveillance intelligente des résidents', 'Détection audio/vidéo des situations de détresse', 'Tableaux de bord cliniques en temps réel']
  },
  {
    icon: Building,
    title: 'Automatisation RPA',
    description: 'Workflows intelligents pour optimiser les opérations et alléger la charge des équipes terrain.',
    bullets: ['Escalades et procédures standardisées', 'Rapports réglementaires instantanés', 'Coaching et formation continue']
  },
  {
    icon: Home,
    title: 'Immobilier',
    description: 'Technologie au service de l’habitat : sécurité, maintenance prédictive et efficacité énergétique.',
    bullets: ['Capteurs bâtiment + vision IA', 'Optimisation énergétique', 'Intégration avec systèmes existants']
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
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Des offres alignées sur la mission AIDYN</h2>
          <p className="mt-4 text-lg text-slate-600">
            Santé, automatisation RPA et immobilier responsable : trois verticales pour rendre les milieux de vie plus sûrs et plus humains.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {solutions.map((solution) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <solution.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-slate-900">{solution.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{solution.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-500">
                {solution.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
