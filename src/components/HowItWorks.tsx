'use client'

import { motion } from 'framer-motion'
import { Camera, Cpu, Webhook, MonitorDot, ArrowRight, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Camera,
    title: 'Vos Caméras Actuelles',
    description: 'Connecte directement à vos caméras UniFi Protect existantes. Aucune installation de nouveaux équipements.',
    technical: 'Flux RTSP H.264 • 1080p @ 30fps',
    color: 'from-sky-500 to-cyan-500'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Analyse Intelligente',
    description: 'Intelligence artificielle locale qui analyse les images en temps réel pour détecter les chutes instantanément.',
    technical: 'IA YOLOv8-Pose sur Jetson • <500ms',
    color: 'from-cyan-500 to-emerald-500'
  },
  {
    number: '03',
    icon: Webhook,
    title: 'Communication Sécurisée',
    description: 'Transmission instantanée et sécurisée des alertes vers votre système de gestion. Données sauvegardées.',
    technical: 'Backend FastAPI • PostgreSQL • WebSocket',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    number: '04',
    icon: MonitorDot,
    title: 'Visualisation en Direct',
    description: 'Dashboard interactif avec alertes temps réel, historique complet, et visualisation 3D de votre résidence.',
    technical: 'React • Three.js • Socket temps réel',
    color: 'from-teal-500 to-sky-500'
  }
]

const benefits = [
  'Utilise vos caméras UniFi existantes',
  'Analyse locale (vos données restent chez vous)',
  'Alertes Slack, Email, SMS automatiques',
  'Visualisation 3D et rejeu des incidents',
  'Installation rapide (moins d\'une journée)',
  'Très fiable: 95% précision, peu de fausses alertes'
]

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="container-max relative px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300">
            <CheckCircle2 className="h-4 w-4" />
            Pipeline Phase 1
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Comment ça{' '}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              fonctionne
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Un système simple en 4 étapes qui transforme vos caméras de sécurité en gardiens intelligents. 
            <strong className="text-white">S&apos;intègre à votre infrastructure actuelle sans nouveaux équipements.</strong>
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-20">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block">
            <div className="h-full w-full bg-gradient-to-b from-sky-500 via-emerald-500 to-teal-500 opacity-30" />
          </div>

          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl font-bold text-slate-800">{step.number}</span>
                    <div className={`rounded-2xl bg-gradient-to-br ${step.color} p-4`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-slate-300">{step.description}</p>
                  <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-emerald-300">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    {step.technical}
                  </div>
                </div>

                {/* Icon indicator (center line) */}
                <div className="hidden lg:block">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-950 bg-gradient-to-br from-slate-800 to-slate-900">
                    <ArrowRight className="h-6 w-6 text-sky-400" />
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 backdrop-blur-xl lg:p-12"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-white">
            Avantages Clés de la Solution
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                <span className="text-sm text-slate-200">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
