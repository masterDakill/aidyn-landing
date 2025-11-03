'use client'

import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, Clock, Sparkles, Zap, Brain, Building2, ArrowRight } from 'lucide-react'

const phases = [
  {
    phase: 'Phase 1',
    year: '2026',
    title: 'Détection Intelligente des Chutes',
    status: 'Lancement 2026',
    tagline: 'Votre système de sécurité devient intelligent',
    color: 'from-emerald-500 to-teal-500',
    icon: Zap,
    products: [
      {
        name: 'AIDYN Vision',
        description: 'Détection automatique des chutes via vos caméras UniFi existantes'
      },
      {
        name: 'Dashboard 3D Temps Réel',
        description: 'Visualisation interactive de votre résidence avec positions en direct'
      },
      {
        name: 'Alertes Multi-Canaux',
        description: 'Notifications instantanées (Slack, Email, SMS) lors d\'incidents'
      },
      {
        name: 'Rejeu Forensique',
        description: 'Revoyez les incidents en 3D avec timeline complète'
      }
    ],
    benefits: [
      'Installation rapide (moins d\'une journée)',
      'Aucun nouveau matériel requis',
      'Fonctionne avec UniFi Protect',
      'Données traitées localement'
    ]
  },
  {
    phase: 'Phase 2',
    year: '2027',
    title: 'Prévention & Assistant Intelligent',
    status: 'Planifié 2027',
    tagline: 'L\'IA qui prévient avant que ça arrive',
    color: 'from-purple-500 to-pink-500',
    icon: Brain,
    products: [
      {
        name: 'Analyse Prédictive',
        description: 'Détecte les comportements à risque AVANT la chute'
      },
      {
        name: 'Assistant Vocal IA',
        description: 'Conversation naturelle avec les résidents pour check-ins automatiques'
      },
      {
        name: 'Profils de Risque',
        description: 'Personnalisation IA par résident basée sur historique'
      },
      {
        name: 'API Intégrations',
        description: 'Connectez AIDYN à vos systèmes existants (EHR, CRM, etc.)'
      }
    ],
    benefits: [
      'Réduction 60%+ des incidents',
      'Intervention préventive possible',
      'Assistance vocale 24/7',
      'Intégration systèmes tiers'
    ]
  },
  {
    phase: 'Phase 3',
    year: '2028',
    title: 'Plateforme Multi-Résidences',
    status: 'Vision 2028',
    tagline: 'Gérez toutes vos résidences depuis un tableau de bord unique',
    color: 'from-cyan-500 to-blue-500',
    icon: Building2,
    products: [
      {
        name: 'AIDYN Network',
        description: 'Plateforme SaaS pour gérer plusieurs résidences simultanément'
      },
      {
        name: 'Analytics Avancé',
        description: 'Tableaux de bord prédictifs et benchmarking inter-résidences'
      },
      {
        name: 'Marketplace Modules',
        description: 'Extensions et intégrations développées par partenaires'
      },
      {
        name: 'Formation VR/AR',
        description: 'Entraînement immersif du personnel aux situations d\'urgence'
      }
    ],
    benefits: [
      'Vue centralisée multi-sites',
      'Comparaison performance',
      'Écosystème de partenaires',
      'Formation nouvelle génération'
    ]
  }
]

export default function RoadmapCommercial() {
  return (
    <section id="roadmap" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 text-white">
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
            Évolution Produits 2026-2028
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Notre{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Feuille de Route
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            De la détection intelligente aujourd&apos;hui vers une plateforme complète demain.
            <strong className="text-white"> Votre sécurité évolue avec vous.</strong>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-16">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Phase Card */}
              <div className="overflow-hidden rounded-3xl border-2 border-white/10 bg-slate-900/50 backdrop-blur-xl">
                {/* Header Banner */}
                <div className={`bg-gradient-to-r ${phase.color} p-6 lg:p-8`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                        <phase.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-bold text-white lg:text-3xl">{phase.phase}</h3>
                          <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
                            {phase.year}
                          </span>
                        </div>
                        <p className="mt-1 text-lg font-semibold text-white/90">{phase.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                      {phase.status.includes('Lancement') ? (
                        <>
                          <Zap className="h-4 w-4 animate-pulse text-white" />
                          <span className="text-sm font-semibold text-white">{phase.status}</span>
                        </>
                      ) : phase.status.includes('Planifié') ? (
                        <>
                          <Clock className="h-4 w-4 text-white" />
                          <span className="text-sm font-semibold text-white">{phase.status}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-white" />
                          <span className="text-sm font-semibold text-white">{phase.status}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-lg italic text-white/80">&quot;{phase.tagline}&quot;</p>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Products Grid */}
                  <div className="mb-6">
                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Produits & Fonctionnalités
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {phase.products.map((product, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/10"
                        >
                          <h5 className="mb-2 font-bold text-white">{product.name}</h5>
                          <p className="text-sm text-slate-300">{product.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                      Bénéfices Clients
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {phase.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector Arrow (except last) */}
              {index < phases.length - 1 && (
                <div className="flex justify-center py-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-slate-900">
                    <ArrowRight className="h-6 w-6 rotate-90 text-emerald-400" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 backdrop-blur-xl lg:p-10">
            <p className="text-xl text-slate-200">
              Prêt à transformer votre résidence avec{' '}
              <strong className="text-emerald-400">AIDYN Phase 1</strong> ?
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/60"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Planifier une Démo
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              <a
                href="#how-it-works"
                className="group rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 px-8 py-4 font-bold text-emerald-300 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-emerald-400/50 hover:bg-emerald-500/10"
              >
                <span className="flex items-center gap-2">
                  Comment ça marche
                  <ArrowRight className="h-5 w-5" />
                </span>
              </a>
            </div>

            <p className="text-sm text-slate-400">
              Déploiement Phase 1 : Q1 2026 · Disponibilité limitée
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
