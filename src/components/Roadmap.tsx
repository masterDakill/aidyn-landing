'use client'

import { motion } from 'framer-motion'
import { CalendarRange, CheckCircle2, Flag, Rocket, Sparkles } from 'lucide-react'

const roadmap = [
  {
    period: 'Oct. – Nov. 2025',
    title: 'Fondations & financement',
    details: ['Incorporation, structure légale et gouvernance', 'Dépôt MAPAQ (50 k$) et AGE-WELL (25 k$)', 'Achat GPU, Jetson, capteurs et mise en place pipeline données']
  },
  {
    period: 'Déc. 2025',
    title: 'Développement IA core',
    details: ['Modèles YOLOv8 & Whisper optimisés edge', 'API FastAPI + PostgreSQL/Redis + intégrations Twilio/Slack', 'Tests unitaires, CI/CD GitHub Actions et monitoring']
  },
  {
    period: 'Jan. 2026',
    title: 'Préparation pilote Auberge Boischatel',
    details: ['Dashboard React temps réel, WebSocket et analytics', 'Formation du personnel, procédures SLA < 1 h', 'Déploiement staging sécurisé avec scénarios UX']
  },
  {
    period: 'Fév. – Août 2026',
    title: 'Pilote 6 mois',
    details: ['Collecte incidents (50+), fine-tuning modèles', 'Mesure KPI : précision ≥95 %, latence <5 s, faux positifs <8 %', 'Rapports mensuels et boucle d’amélioration continue']
  }
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="section-padding bg-slate-900 text-slate-100">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <CalendarRange className="h-4 w-4" /> Feuille de route 2025 – 2026
          </div>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">Phase 1 : de la préparation au pilote</h2>
          <p className="mt-4 text-lg text-slate-300">
            Un calendrier opérationnel détaillé pour livrer SerenaCare AI en contexte réel et préparer la commercialisation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6">
          {roadmap.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 lg:flex-row lg:items-start lg:justify-between"
            >
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-cyan-300">{item.period}</div>
                <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-200 lg:max-w-2xl">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-300 md:grid-cols-3"
        >
          <div className="flex flex-col gap-3">
            <Flag className="h-5 w-5 text-cyan-300" />
            <div className="font-semibold text-white">Objectif 12-18 mois</div>
            <p>Version commerciale 1.0 certifiée et premiers clients payants (Q4 2026).</p>
          </div>
          <div className="flex flex-col gap-3">
            <CheckCircle2 className="h-5 w-5 text-cyan-300" />
            <div className="font-semibold text-white">Indicateurs clés</div>
            <p>Précision ≥95 %, incidents réduits de 40 %, uptime &gt; 99,5 %.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Rocket className="h-5 w-5 text-cyan-300" />
            <div className="font-semibold text-white">Étape suivante</div>
            <p>Série Seed (300 k$) post-pilote avec preuve d’impact opérationnel.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-xs text-slate-500"
        >
          <Sparkles className="mx-auto mb-2 h-5 w-5 text-cyan-300" />
          Accès prioritaire aux innovations Phase 2 pour les partenaires pilotes et financiers engagés en 2025.
        </motion.div>
      </div>
    </section>
  )
}
