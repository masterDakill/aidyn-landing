'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Camera,
  Cpu,
  Database,
  Radio,
  Server,
  ShieldCheck
} from 'lucide-react'

const corePillars = [
  {
    icon: Camera,
    title: 'Caméras UniFi Protect Existantes',
    detail: 'Utilisation de votre infrastructure UDM Pro actuelle, sans ajout de matériel caméra.'
  },
  {
    icon: Cpu,
    title: 'Traitement Edge Computing',
    detail: 'Analyse intelligente locale en temps réel pour des performances optimales.'
  },
  {
    icon: ShieldCheck,
    title: 'Traitement Local Sécurisé',
    detail: 'Analyse vidéo edge sans cloud, respect de la vie privée, conformité HIPAA/GDPR.'
  }
]

const architectureFlow = [
  {
    icon: Camera,
    step: '1',
    label: 'Capture Vidéo',
    description: 'Caméras existantes → Flux continu'
  },
  {
    icon: Cpu,
    step: '2',
    label: 'Analyse IA',
    description: 'Détection intelligente des incidents'
  },
  {
    icon: Radio,
    step: '3',
    label: 'Notification',
    description: 'Alerte automatique immédiate'
  },
  {
    icon: Server,
    step: '4',
    label: 'Supervision',
    description: 'Interface de gestion centralisée'
  }
]

const technicalSpecs = [
  {
    icon: BadgeCheck,
    label: 'Précision détection',
    value: '>95%',
    description: 'IA avancée optimisée pour détection fiable'
  },
  {
    icon: Activity,
    label: 'Latence traitement',
    value: '<500ms',
    description: 'Frame preprocessing → alert trigger'
  },
  {
    icon: Database,
    label: 'Faux positifs',
    value: '<5%',
    description: 'Threshold confidence 0.85+ ajustable'
  },
  {
    icon: ShieldCheck,
    label: 'Uptime visé',
    value: '>99.5%',
    description: 'Système redondant haute disponibilité'
  }
]

export default function RpaSolution() {
  return (
    <section id="rpa-solution" className="section-padding bg-slate-900 text-slate-100">
      <div className="container-max">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Architecture UniFi-First · IA Edge Processing
            </div>

            <h2 className="text-3xl font-bold md:text-4xl">
              Détection IA sur infrastructure UniFi existante
            </h2>

            <p className="text-lg text-slate-300">
              Intégrez la détection de chute par intelligence artificielle directement sur vos caméras UniFi Protect.
              L&apos;analyse se fait localement sans modification de votre réseau, pour des alertes instantanées
              au personnel.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {corePillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <pillar.icon className="mb-3 h-6 w-6 text-cyan-300" />
                  <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{pillar.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/40">
              <h3 className="text-xl font-semibold text-white">Pipeline de traitement Phase 1</h3>
              <p className="mt-2 text-sm text-slate-300">
                Flux de détection de bout en bout, de la caméra UniFi au dashboard React temps réel.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {architectureFlow.map((flow) => (
                  <div key={flow.step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
                      <flow.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-cyan-300">ÉTAPE {flow.step}</div>
                      <div className="text-sm font-semibold text-white">{flow.label}</div>
                      <p className="text-xs text-slate-300">{flow.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-500/40 bg-cyan-500/10 p-6">
              <h3 className="text-lg font-semibold text-white">KPI Techniques Phase 1</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {technicalSpecs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-3">
                    <spec.icon className="h-5 w-5 text-cyan-300" />
                    <div>
                      <div className="text-sm font-semibold text-white">{spec.label}</div>
                      <div className="text-2xl font-bold text-cyan-300">{spec.value}</div>
                      <p className="text-xs text-slate-300">{spec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#phase-1"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Voir le roadmap détaillé (4 sprints)
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-3xl bg-cyan-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 shadow-2xl shadow-black/30">
              <Image
                src="/images/diagrams/serenacare-architecture.png"
                alt="Architecture SerenaCare - Analyse IA temps réel, Dashboard de supervision"
                width={1024}
                height={768}
                className="h-full w-full object-contain p-4"
              />
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Server className="h-4 w-4 text-cyan-300" />
                Stack Technique
              </div>
              <ul className="mt-3 space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>Interface web moderne et responsive</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>Backend robuste et sécurisé</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>Intelligence artificielle edge computing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>Modèle IA optimisé et performant</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>Système d&apos;alertes multi-canaux</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
