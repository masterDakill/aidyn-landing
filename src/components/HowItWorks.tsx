'use client'

import { motion } from 'framer-motion'
import { Camera, Cpu, Webhook, MonitorDot, ArrowRight, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Camera,
    title: 'Flux RTSP UniFi',
    description: 'Connexion aux caméras UniFi Protect existantes via flux RTSP (H.264). Aucun changement matériel requis.',
    technical: 'RTSP Stream H.264 • 1080p @ 30fps',
    color: 'from-sky-500 to-cyan-500'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Inférence Jetson',
    description: 'Analyse IA locale sur Jetson Nano/Orin avec YOLOv8-Pose (ONNX). Détection de chutes en temps réel.',
    technical: 'YOLOv8-Pose ONNX • TensorRT INT8 • <500ms latence',
    color: 'from-cyan-500 to-emerald-500'
  },
  {
    number: '03',
    icon: Webhook,
    title: 'Webhook FastAPI',
    description: 'Événements transmis au backend via webhook HTTP. Persistance PostgreSQL, cache Redis, émission WebSocket.',
    technical: 'FastAPI • PostgreSQL • Redis • WebSocket',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    number: '04',
    icon: MonitorDot,
    title: 'Dashboard Temps Réel',
    description: 'Interface React avec alertes instantanées, timeline événements, KPI live, et visualisation 3D des incidents.',
    technical: 'React • Socket.IO • Three.js • Tailwind',
    color: 'from-teal-500 to-sky-500'
  }
]

const benefits = [
  'Infrastructure existante conservée (UniFi Protect)',
  'Traitement local IA (confidentialité garantie)',
  'Alertes multi-canaux (Slack, Email, SMS)',
  'Dashboard temps réel et replay 3D',
  'Déploiement rapide (<1 jour)',
  'KPI objectifs: ≥95% précision, <5% faux positifs'
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
            Pipeline technique RTSP → Jetson → Webhook → Dashboard en 4 étapes simples. 
            Intégration sur infrastructure existante sans modification matérielle.
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
