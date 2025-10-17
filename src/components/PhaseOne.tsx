'use client'

import { motion } from 'framer-motion'
import { CalendarClock, CheckCircle2, Layers3, MapPinned, ShieldAlert, Users } from 'lucide-react'

const milestones = [
  {
    period: 'Octobre – Novembre 2025',
    title: 'Fondations et subventions',
    bullets: [
      'Incorporation et gouvernance initiale',
      'Dépôt MAPAQ (50 k$) + achats GPU, Jetson, capteurs',
      'Cadre de conformité et sécurité des données'
    ]
  },
  {
    period: 'Décembre 2025',
    title: 'Développement IA Core',
    bullets: [
      'Entraînement YOLOv8 (vision) et Whisper (audio)',
      'Backend FastAPI + intégrations Twilio/Slack',
      'Tests unitaires & pipeline CI/CD'
    ]
  },
  {
    period: 'Janvier 2026',
    title: 'Préparation pilote Auberge Boischatel',
    bullets: [
      'Dashboard React temps réel + WebSocket',
      'Scénarios UX et formation du personnel',
      'Déploiement environnement staging sécurisé'
    ]
  },
  {
    period: 'Février 2026',
    title: 'Go-Live site pilote',
    bullets: [
      'Installation 12 caméras UniFi & 8 capteurs Vayyar',
      'Configuration SLA 24/7 et support < 1 h',
      'Suivi KPI : précision, latence, faux positifs'
    ]
  }
]

const successChecks = [
  {
    icon: CheckCircle2,
    title: 'MVP prêt',
    detail: 'Détection d’événements critiques ≥95 % avec redondance edge/cloud.'
  },
  {
    icon: ShieldAlert,
    title: 'Conformité & sécurité',
    detail: 'Journalisation, anonymisation et préparation certification CE/RoHS.'
  },
  {
    icon: Users,
    title: 'Adoption terrain',
    detail: 'Personnel RPA formé, boucle de rétroaction avec familles et résidents.'
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
            <CalendarClock className="h-4 w-4" /> Phase 1 SerenaCare AI
          </div>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Une feuille de route claire pour sécuriser les milieux de vie aînés dès 2025
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Notre priorité est d&apos;orchestrer un pilote exemplaire à l&apos;Auberge Boischatel. Chaque livrable répond à un jalon
            critique du plan d&apos;affaires : financement initial, préparation technologique et déploiement opérationnel.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {milestones.map((milestone) => (
              <div key={milestone.period} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
                <div className="text-sm font-semibold uppercase tracking-wide text-sky-300">{milestone.period}</div>
                <h3 className="mt-2 text-2xl font-semibold text-white">{milestone.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {milestone.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sky-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/40"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">Critères de succès 12–18 mois</h3>
              <p className="mt-2 text-sm text-slate-300">
                Les objectifs sont ancrés sur les KPI financiers et opérationnels présentés aux partenaires d&apos;investissement.
              </p>
            </div>

            <div className="space-y-5">
              {successChecks.map((check) => (
                <div key={check.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
                    <check.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">{check.title}</h4>
                    <p className="text-sm text-slate-300">{check.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-sky-500/40 bg-sky-500/10 p-4 text-sm text-sky-200">
              <div className="flex items-center gap-2 font-semibold">
                <Layers3 className="h-4 w-4" /> Budget Phase 1
              </div>
              <p className="mt-2">
                400 h IA/ML · 150 h DevOps/Backend · 80 h UX/UI · matériel edge (Jetson, capteurs) · préparation conformité et
                certifications.
              </p>
              <p className="mt-2 text-xs text-slate-300">
                Sources complémentaires : CRSNG Alliances, PARI CNRC, pré-seed Anges Québec (post-pilote si KPI atteints).
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              <MapPinned className="mb-2 h-5 w-5 text-sky-300" />
              Auberge Boischatel · 12 caméras UniFi · 8 capteurs Vayyar · modules Jetson · SLA support &lt; 1 h · Uptime visé &gt;
              99,5 %.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
