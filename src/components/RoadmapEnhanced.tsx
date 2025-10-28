'use client'

import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, Clock, Sparkles, Target, TrendingUp, Zap } from 'lucide-react'

const phases = [
  {
    phase: 'Phase 1',
    year: '2026',
    title: 'Détection IA & Jumeau Numérique',
    status: 'En développement',
    budget: '180K$ - 250K$',
    duration: '4-6 mois',
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'emerald',
    features: [
      'Détection chutes automatique (YOLOv8-Pose)',
      'Jumeau Numérique 3D temps réel',
      'Dashboard superviseur & alertes multi-canaux',
      'Intégration UniFi Protect sans matériel neuf'
    ],
    sprints: [
      { name: 'Sprint 1', task: 'Prototype IA + infrastructure' },
      { name: 'Sprint 2', task: 'Dashboard & intégration backend' },
      { name: 'Sprint 3', task: 'Jumeau 3D + optimisation' },
      { name: 'Sprint 4', task: 'Déploiement pilote & formation' }
    ],
    funding: ['MAPAQ Innovation', 'CRSNG Alliance', 'AGE-WELL']
  },
  {
    phase: 'Phase 2',
    year: '2027',
    title: 'Analyse Prédictive & Assistant Vocal',
    status: 'Planifiée',
    budget: '300K$ - 400K$',
    duration: '6-8 mois',
    color: 'from-purple-500 to-pink-500',
    glowColor: 'purple',
    features: [
      'Analyse posturale prédictive (détection avant chute)',
      'Assistant vocal conversationnel IA',
      'ML personnalisé par résident (profils de risque)',
      'API publique pour intégrations tierces'
    ],
    sprints: [
      { name: 'Sprint 5', task: 'Modèle ML prédictif' },
      { name: 'Sprint 6', task: 'Assistant vocal + NLP' },
      { name: 'Sprint 7', task: 'Personnalisation IA' },
      { name: 'Sprint 8', task: 'API & documentation' }
    ],
    funding: ['CRSNG CCI', 'Investissement Québec', 'Mitacs Accélération']
  },
  {
    phase: 'Phase 3',
    year: '2028',
    title: 'Plateforme SaaS Multi-Résidences',
    status: 'Vision',
    budget: '500K$ - 800K$',
    duration: '8-12 mois',
    color: 'from-cyan-500 to-blue-500',
    glowColor: 'cyan',
    features: [
      'Plateforme SaaS multi-tenants',
      'Analytics prédictif avancé (Big Data)',
      'Marketplace modules & intégrations',
      'Formation virtuelle immersive (VR/AR)'
    ],
    sprints: [
      { name: 'Sprint 9-10', task: 'Architecture SaaS scalable' },
      { name: 'Sprint 11-12', task: 'Big Data pipeline & analytics' },
      { name: 'Sprint 13-14', task: 'Marketplace & billing' },
      { name: 'Sprint 15-16', task: 'VR/AR training modules' }
    ],
    funding: ['Série A', 'BDC Capital', 'Fonds FTQ']
  }
]

export default function RoadmapEnhanced() {
  return (
    <section id="roadmap" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 py-24 text-white">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container-max relative px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            <Calendar className="h-4 w-4" />
            Feuille de Route 2026-2028
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Vision{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              3 Phases
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            De la détection IA locale vers une plateforme SaaS complète pour tout le réseau de résidences.
            <strong className="text-white"> Financement subventions disponibles à chaque phase.</strong>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 hidden h-full w-1 bg-gradient-to-b from-emerald-500 via-purple-500 to-cyan-500 opacity-20 lg:block" />

          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Phase Card */}
              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl lg:ml-20 lg:p-10">
                {/* Timeline dot */}
                <div className="absolute -left-4 top-8 hidden h-8 w-8 rounded-full border-4 border-slate-950 bg-gradient-to-br from-emerald-500 to-cyan-500 lg:block" />

                {/* Header */}
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl font-bold text-white">{phase.phase}</h3>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-300">
                        {phase.year}
                      </span>
                    </div>
                    <p className="text-xl font-semibold text-slate-200">{phase.title}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                    {phase.status === 'En développement' ? (
                      <>
                        <Zap className="h-4 w-4 animate-pulse text-emerald-400" />
                        <span className="text-sm font-semibold text-emerald-300">{phase.status}</span>
                      </>
                    ) : phase.status === 'Planifiée' ? (
                      <>
                        <Clock className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-semibold text-purple-300">{phase.status}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-semibold text-cyan-300">{phase.status}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Budget & Duration */}
                <div className="mb-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2">
                    <Target className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-slate-300">
                      Budget: <strong className="text-white">{phase.budget}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2">
                    <TrendingUp className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-slate-300">
                      Durée: <strong className="text-white">{phase.duration}</strong>
                    </span>
                  </div>
                </div>

                {/* Features & Sprints Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Features */}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Fonctionnalités Clés
                    </h4>
                    <ul className="space-y-2">
                      {phase.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sprints */}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Sprints & Livrables
                    </h4>
                    <div className="space-y-2">
                      {phase.sprints.map((sprint, idx) => (
                        <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-cyan-300">{sprint.name}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400">{sprint.task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Funding sources */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Sources de Financement
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.funding.map((fund, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-xs font-semibold text-emerald-300"
                      >
                        {fund}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 backdrop-blur-xl">
            <p className="text-lg text-slate-200">
              <strong className="text-emerald-400">Subventions disponibles</strong> pour Phase 1 · 
              Dossiers MAPAQ, CRSNG, AGE-WELL prêts · 
              <strong className="text-cyan-400">Démarrage Q1 2026</strong>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/60"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Planifier une Démo
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              
              <a
                href="#contact"
                className="group rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 px-8 py-4 font-bold text-emerald-300 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-emerald-400/50 hover:bg-emerald-500/10"
              >
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Dossier Subventions (PDF)
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
