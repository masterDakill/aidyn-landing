'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Bot, Cpu, Database, Layers, Shield, Video, Zap } from 'lucide-react'

const featureBlocks = [
  {
    icon: Video,
    title: 'Analyse Vidéo Temps Réel',
    description: 'Traitement des flux caméras existants avec intelligence artificielle avancée.',
    accent: 'from-cyan-500 to-sky-600'
  },
  {
    icon: Cpu,
    title: 'Traitement Edge Computing',
    description: 'Détection locale sur matériel optimisé pour des performances maximales.',
    accent: 'from-purple-500 to-fuchsia-600'
  },
  {
    icon: Zap,
    title: 'Alertes Instantanées',
    description: 'Notifications immédiates par multiples canaux lors de détection d\'incident.',
    accent: 'from-emerald-500 to-teal-600'
  },
  {
    icon: Shield,
    title: 'Sécurité & Confidentialité',
    description: 'Traitement local des données, conformité réglementaire, journalisation complète.',
    accent: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Database,
    title: 'Gestion de Données Robuste',
    description: 'Stockage sécurisé des événements et analyses avec hébergement local.',
    accent: 'from-slate-500 to-slate-700'
  },
  {
    icon: Bot,
    title: 'Interface Intuitive',
    description: 'Dashboard moderne pour surveillance multi-caméra et gestion des alertes.',
    accent: 'from-amber-500 to-orange-600'
  },
  {
    icon: Layers,
    title: 'Architecture Évolutive',
    description: 'Solution adaptable pour différentes tailles d\'installations et besoins.',
    accent: 'from-rose-500 to-pink-600'
  },
  {
    icon: AlertTriangle,
    title: 'Fiabilité Optimisée',
    description: 'Système intelligent pour minimiser les fausses alertes et amélioration continue.',
    accent: 'from-violet-500 to-purple-600'
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
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-600/40 bg-cyan-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Fonctionnalités Techniques Phase 1
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
            Stack IA moderne pour détection fiable
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Chaque composant technique est sélectionné pour la Phase 1 MVP : rapidité de déploiement, 
            performance prouvée et évolutivité future.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900">Budget & Équipe Phase 1</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-3xl font-bold text-cyan-600">Optimisé</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">Budget Efficace</div>
              <p className="mt-2 text-xs text-slate-600">
                Hardware edge computing, développement IA complet, validation terrain
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-3xl font-bold text-cyan-600">Rapide</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">Timeline MVP</div>
              <p className="mt-2 text-xs text-slate-600">
                Développement agile 2026 · Déploiement sur site pilote
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-3xl font-bold text-cyan-600">&gt;95%</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">Précision Visée</div>
              <p className="mt-2 text-xs text-slate-600">
                Haute fiabilité de détection avec faible taux d&apos;erreur
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
