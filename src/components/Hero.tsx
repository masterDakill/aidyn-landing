'use client'

import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Cpu, MessageSquare, Radar, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from './Logo'

const stats = [
  {
    label: 'Précision visée',
    value: '≥ 95 %',
    description: 'Détection IA chute sur caméras UniFi existantes'
  },
  {
    label: 'Budget Phase 1',
    value: '36-54 k$',
    description: 'MVP avec intégration UniFi UDM Pro'
  },
  {
    label: 'Timeline',
    value: 'Rapide',
    description: 'Déploiement pilote 2026'
  }
]

const quickWins: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: 'Infrastructure Existante',
    description: 'Caméras UniFi Protect + UDM Pro déjà en place',
    icon: Building2
  },
  {
    title: 'IA Locale Jetson',
    description: 'NVIDIA Jetson Nano/Orin pour inférence temps réel',
    icon: Cpu
  },
  {
    title: 'Traitement Edge',
    description: 'Analyse vidéo locale, pas de cloud required',
    icon: ShieldCheck
  },
  {
    title: 'Dashboard Temps Réel',
    description: 'React + FastAPI, alertes Slack/Email instantanées',
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
                <span>PIVOT Phase 1</span>
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>IA Caméras UniFi · 2026</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                    IA détection chute
                  </span>{' '}
                  sur vos caméras UniFi existantes
                </h1>
                <p className="text-lg text-slate-200 sm:text-xl">
                  AIDYN Technologies intègre l&apos;intelligence artificielle directement dans votre infrastructure UniFi UDM Pro.
                  Détection automatique des chutes avec alertes temps réel, sans changement matériel. Déploiement pilote 2026.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#rpa-solution"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-7 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/50"
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    Architecture Technique
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-400 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
                <Link
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Planifier une démo
                  <MessageSquare className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
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
                  alt="Architecture IA UniFi - Détection de Chute Temps Réel"
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
                  <span>Modèle IA avancé + Edge Computing · Déploiement rapide 2026</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
