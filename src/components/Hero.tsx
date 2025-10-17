'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 text-white">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,116,144,0.3),_transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse gap-12 px-6 pb-24 pt-28 md:flex-row md:items-center md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide">
            <ShieldCheck className="h-4 w-4 text-sky-300" />
            SerenaCare AI · Phase 1 – Fondation 2025
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Intelligence artificielle digne de confiance pour les milieux de vie aînés
          </h1>

          <p className="text-lg text-slate-200 md:text-xl">
            AIDYN Technologies déploie SerenaCare AI – une plateforme sécurisée combinant vision, audio et capteurs edge pour
            réduire les incidents en RPA. La Phase 1 se concentre sur la mise en place d&apos;une infrastructure fiable, conforme et
            prête pour le pilote Auberge Boischatel.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="#phase-1"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-7 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-sky-800/30 transition duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              Découvrir la Phase 1
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 text-base font-semibold text-slate-50 transition duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Planifier une rencontre
              <MessageSquare className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20">
                <div className="text-2xl font-semibold text-sky-300">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-100">{stat.label}</div>
                <p className="mt-1 text-xs text-slate-300">{stat.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500/30 via-transparent to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 shadow-2xl shadow-black/30">
            <Image
              src="/AIDYN_Hero_Dark_-_Version_Production_Ready.png"
              alt="Interface SerenaCare AI"
              width={960}
              height={720}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
