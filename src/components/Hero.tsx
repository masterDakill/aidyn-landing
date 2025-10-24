'use client'

import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Cpu, MessageSquare, Radar, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from './Logo'

const stats = [
  {
    label: 'Incidents critiques réduits',
    value: '40 %',
    description: 'Objectif Phase 1 vs. baseline 2024'
  },
  {
    label: 'Précision attendue',
    value: '≥ 95 %',
    description: 'Détection IA sur le pilote Auberge Boischatel'
  },
  {
    label: 'Financement recherché',
    value: '75 k$',
    description: 'MAPAQ + AGE-WELL pour consolider la Phase 1'
  }
]

const quickWins: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: 'Pilote Auberge Boischatel',
    description: '12 caméras UniFi, 8 radars Vayyar, Jetson edge encrypté',
    icon: Building2
  },
  {
    title: 'Infrastructure souveraine',
    description: 'FastAPI + PostgreSQL + Redis hébergés au Québec, auditables',
    icon: Cpu
  },
  {
    title: 'Surveillance respectueuse',
    description: 'Traitement edge, anonymisation contextuelle et traçabilité complète',
    icon: ShieldCheck
  },
  {
    title: 'Alertes temps réel',
    description: 'Twilio SMS, Slack, WebSocket; latence &lt;5 s visée',
    icon: Radar
  }
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.24),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,116,144,0.3),_transparent_55%)]" />
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      <div className="relative">
        <div className="container-max px-6 pb-24 pt-32">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-100">
                <Logo compact className="hidden sm:inline-flex" />
                <span>SerenaCare AI</span>
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Phase 1 · Fondation 2025</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                    Intelligence de confiance
                  </span>{' '}
                  pour sécuriser les milieux de vie aînés
                </h1>
                <p className="text-lg text-slate-200 sm:text-xl">
                  AIDYN Technologies déploie SerenaCare AI – une plateforme intégrant vision, audio et capteurs edge pour réduire les
                  incidents critiques en RPA. La Phase 1 solidifie l’infrastructure, les flux d’alertes et la conformité nécessaire au
                  pilote Auberge Boischatel.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#phase-1"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-7 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-sky-900/30 transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-xl"
                >
                  Découvrir la Phase 1
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 text-base font-semibold text-slate-50 transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
                >
                  Planifier une rencontre
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/30 backdrop-blur">
                    <div className="text-2xl font-semibold text-sky-300 sm:text-3xl">{stat.value}</div>
                    <div className="text-sm font-semibold text-slate-100">{stat.label}</div>
                    <p className="mt-1 text-xs text-slate-300">{stat.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                {quickWins.map(({ title, description, icon: Icon }) => (
                  <div key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-sm text-slate-300">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="relative"
            >
              <div className="absolute inset-0 hidden rounded-[3rem] bg-sky-500/10 blur-3xl lg:block" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl shadow-sky-950/60">
                <Image
                  src="/images/products/serenacare-hero.png"
                  alt="Dispositifs SerenaCare - Réponse d'Urgence de Nouvelle Génération avec technologie IA"
                  width={1200}
                  height={900}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -bottom-10 left-6 right-6 rounded-2xl border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-black/40 backdrop-blur"
              >
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  <span>Infrastructure prête pour certification CE/RoHS · Uptime cible &gt;99,5 %</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
