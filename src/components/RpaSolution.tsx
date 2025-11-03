'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Droplets,
  Radio,
  ShieldCheck,
  SignalHigh,
  Waves,
  Wifi
} from 'lucide-react'

const corePillars = [
  {
    icon: BadgeCheck,
    title: 'Détection centrée sur le résident',
    detail: 'Chutes, immobilité et errance nocturne analysées par vision, audio et capteurs contextuels.'
  },
  {
    icon: ShieldCheck,
    title: 'Vie privée protégée',
    detail: 'Traitement edge, anonymisation et traçabilité complètes pour rassurer familles et équipes.'
  },
  {
    icon: Activity,
    title: 'Interventions orchestrées',
    detail: 'Escalades SMS, Slack et tableau de bord clinique pour déclencher la bonne réponse sans délai.'
  }
]

const deviceHighlights = [
  {
    icon: Droplets,
    label: 'Boutons IP67',
    description: 'Utilisables à la douche comme en chambre, sans risque pour l’électronique.'
  },
  {
    icon: Wifi,
    label: 'Wi-Fi + MQTT',
    description: 'Connexion sécurisée avec supervision à distance des équipements.'
  },
  {
    icon: Radio,
    label: 'Secours RF 433 MHz',
    description: 'Maintien des alertes même lors d’une coupure Internet.'
  },
  {
    icon: Waves,
    label: 'Capteurs volumétriques',
    description: 'Vayyar sans caméra pour les zones sensibles comme les salles de bain.'
  },
  {
    icon: SignalHigh,
    label: 'Dashboard temps réel',
    description: 'Latence < 5 s, faux positifs < 8 % et disponibilité visée > 99,5 %.'
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
              SerenaCare AI · Plateforme de sécurité augmentée
            </div>

            <h2 className="text-3xl font-bold md:text-4xl">
              Une plateforme unifiée pour des résidences privées pour aînés plus sereines
            </h2>

            <p className="text-lg text-slate-300">
              Nos modules edge Jetson surveillent en continu les flux vidéo, audio et IoT pour déclencher la bonne intervention au bon moment.
              Chaque résidence profite d’une architecture réseau adaptée (VLAN, QoS, isolation IoT) et d’un accompagnement terrain clé en main.
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
              <h3 className="text-xl font-semibold text-white">Kit matériel Phase 1</h3>
              <p className="mt-2 text-sm text-slate-300">
                Boutons étanches, capteurs volumétriques et plateforme SaaS sont livrés, installés et configurés avec formation et soutien &lt; 1 h.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {deviceHighlights.map((highlight) => (
                  <div key={highlight.label} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <highlight.icon className="mt-1 h-5 w-5 text-cyan-300" />
                    <div>
                      <div className="text-sm font-semibold text-white">{highlight.label}</div>
                      <p className="text-xs text-slate-300">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="mailto:contact@aidyn.ai"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Réserver une démonstration
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
                src="/images/SerenaCare_Website_Product_Section.png"
                alt="Dispositifs SerenaCare"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
