'use client'

import { motion } from 'framer-motion'
import { CalendarClock, CheckCircle2, DollarSign, Layers3, MapPinned, ShieldAlert, Target, Users } from 'lucide-react'

const sprints = [
  {
    period: 'Phase 1 · Mars 2026',
    title: 'Préparation & Infrastructure',
    tasks: [
      'Audit infrastructure existante et évaluation technique',
      'Collecte et préparation des datasets de validation',
      'Identification des opportunités de financement'
    ],
    budget: 'Budget alloué',
    livrables: 'Documentation technique complète'
  },
  {
    period: 'Phase 2 · Avril 2026',
    title: 'Développement IA',
    tasks: [
      'Entraînement et optimisation du modèle de détection',
      'Validation de la précision et performance',
      'Optimisation pour déploiement edge computing',
      'Intégration pipeline de traitement temps réel'
    ],
    budget: 'Budget alloué',
    livrables: 'Modèle IA optimisé et validé'
  },
  {
    period: 'Phase 3 · Mai 2026',
    title: 'Interface & Alertes',
    tasks: [
      'Développement dashboard de surveillance multi-caméra',
      'Système d\'alertes intelligent en temps réel',
      'Configuration des règles de notification',
      'Tests qualité et validation'
    ],
    budget: 'Budget alloué',
    livrables: 'Application web complète et testée'
  },
  {
    period: 'Phase 4 · Juin 2026',
    title: 'Déploiement Pilote',
    tasks: [
      'Installation et déploiement sur site pilote',
      'Tests d\'acceptation et validation terrain',
      'Formation du personnel utilisateur',
      'Documentation et études de cas'
    ],
    budget: 'Budget alloué',
    livrables: 'Site pilote opérationnel'
  }
]

const successMetrics = [
  {
    icon: Target,
    title: 'Haute Précision',
    detail: 'Système de détection validé avec taux de précision élevé.'
  },
  {
    icon: ShieldAlert,
    title: 'Faible Taux d\'Erreur',
    detail: 'Minimisation des fausses alertes pour une expérience optimale.'
  },
  {
    icon: Users,
    title: 'Adoption Réussie',
    detail: 'Personnel formé et satisfaction utilisateur validée.'
  },
  {
    icon: DollarSign,
    title: 'Financement Confirmé',
    detail: 'Programmes de financement sécurisés pour les phases suivantes.'
  }
]

export default function PhaseOne() {
  return (
    <section id="phase-1" className="section-padding bg-slate-950">
      <div className="container-max text-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            <CalendarClock className="h-4 w-4" /> PIVOT Phase 1 UniFi
          </div>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Roadmap de Développement 2026
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Un plan d&apos;exécution structuré pour déployer notre solution de détection intelligente.
            Développement itératif sur 4 phases, avec validation à chaque étape.
          </p>
        </motion.div>

        <div className="mt-16 space-y-8">
          {sprints.map((sprint, index) => (
            <motion.div
              key={sprint.period}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/30"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold uppercase tracking-wide text-sky-300">{sprint.period}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{sprint.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-200">
                    {sprint.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 space-y-2 rounded-2xl border border-sky-500/40 bg-sky-500/10 p-4 text-center lg:w-48">
                  <div className="text-xs font-semibold uppercase tracking-wide text-sky-300">Budget Sprint</div>
                  <div className="text-3xl font-bold text-sky-200">{sprint.budget}</div>
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-300">
                    <div className="font-semibold text-white">Livrables:</div>
                    <div className="mt-1">{sprint.livrables}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/40"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">Critères de Succès MVP</h3>
              <p className="mt-2 text-sm text-slate-300">
                Objectifs mesurables pour valider le pilote et débloquer Phase 2 (assistant vocal, expansion sites).
              </p>
            </div>

            <div className="space-y-4">
              {successMetrics.map((metric) => (
                <div key={metric.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
                    <metric.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">{metric.title}</h4>
                    <p className="text-sm text-slate-300">{metric.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-sky-500/40 bg-sky-500/10 p-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <Layers3 className="h-5 w-5 text-sky-300" /> Répartition Budget Phase 1
              </div>
              <div className="mt-4 space-y-3 text-sm text-sky-200">
                <div className="flex justify-between">
                  <span>Hardware (Jetson Nano/Orin):</span>
                  <span className="font-semibold">390-2,500$</span>
                </div>
                <div className="flex justify-between">
                  <span>Développement IA/ML (80h):</span>
                  <span className="font-semibold">8,000$</span>
                </div>
                <div className="flex justify-between">
                  <span>Backend + Frontend (100h):</span>
                  <span className="font-semibold">8,000$</span>
                </div>
                <div className="flex justify-between">
                  <span>QA & Testing site (30h):</span>
                  <span className="font-semibold">1,800$</span>
                </div>
                <div className="flex justify-between">
                  <span>Consultant stratégie (75h):</span>
                  <span className="font-semibold">10,500$</span>
                </div>
                <div className="flex justify-between">
                  <span>Logiciels & Cloud (6 mois):</span>
                  <span className="font-semibold">1,320$</span>
                </div>
                <div className="flex justify-between">
                  <span>Contingency & Misc (10%):</span>
                  <span className="font-semibold">4,000$</span>
                </div>
                <div className="mt-4 border-t border-white/20 pt-3 flex justify-between text-base font-bold">
                  <span>TOTAL MVP:</span>
                  <span className="text-sky-300">36,210$ CAD</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Version Production-Ready:</span>
                  <span>~54,310$ CAD</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <MapPinned className="h-5 w-5 text-sky-300" /> Site Pilote
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-300 mt-0.5" />
                  <span>Résidence partenaire · RPA Québec</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-300 mt-0.5" />
                  <span>Caméras UniFi Protect existantes (à auditer)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-300 mt-0.5" />
                  <span>UDM Pro routeur/NVR en place</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-300 mt-0.5" />
                  <span>Jetson Nano/Orin · Inference locale edge</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-300 mt-0.5" />
                  <span>Dashboard React · Alertes Slack/Email</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-300 mt-0.5" />
                  <span>SLA support &lt;1h · Uptime visé &gt;99.5%</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-sm text-emerald-200">
              <div className="font-semibold text-white">Stratégie de Financement</div>
              <ul className="mt-3 space-y-1 text-xs">
                <li>• Programmes gouvernementaux d&apos;innovation santé</li>
                <li>• Subventions recherche et développement</li>
                <li>• Partenariats institutionnels</li>
                <li>• Financement privé post-validation</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
