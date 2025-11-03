'use client'

import { motion } from 'framer-motion'
import { Sparkles, Cpu, Eye, Brain, Target, Award, Zap, TrendingUp, Box, Clock, Users, Play } from 'lucide-react'

const innovations = [
  {
    icon: Zap,
    title: 'Jumeau Numérique Temps Réel',
    subtitle: 'Coeur du Dashboard Phase 1',
    description: 'Réplique 3D interactive de la résidence complète avec visualisation temps réel des résidents, personnel et alertes. WebSocket synchronisé avec pipeline Jetson.',
    features: [
      'Scène 3D WebGL temps réel (Three.js/React Three Fiber)',
      'Position résidents live (précision 10cm) via multi-caméra',
      'Replay incidents 3D: 30s pré-chute vers événement vers 1min post',
      'Heatmap incidents superposée (zones à risque)',
      'Timeline forensique navigable (scrub événement)',
      'Export vidéo + 3D data pour formation/assurance'
    ],
    badge: 'Exclusif Phase 1',
    color: 'from-emerald-500 to-teal-500',
    glow: 'emerald',
    highlighted: true
  },
  {
    icon: Brain,
    title: 'Analyse Posturale Prédictive',
    subtitle: 'Phase 2 - Prévention AVANT la chute',
    description: 'IA 3D détecte démarche instable et posture à risque pour alerter AVANT l\'incident (Phase 2, 2027).',
    features: [
      'Skeleton tracking 3D temps réel (YOLOv8-Pose + MediaPipe)',
      'Score de risque prédictif basé historique posture',
      'Alertes préventives personnalisées par résident',
      'Réduction incidents projetée: plus de 60%'
    ],
    badge: 'Phase 2 (2027)',
    color: 'from-purple-500 to-pink-500',
    glow: 'purple'
  },
  {
    icon: Target,
    title: 'Carte Thermique 3D Intelligente',
    subtitle: 'Zones à risque visualisées',
    description: 'Reconstruction 3D de la résidence avec heatmap historique des incidents pour optimisation proactive.',
    features: [
      'Modèle 3D spatial automatique depuis plan 2D',
      'Historique incidents géolocalisés (timestamp + coords XYZ)',
      'Prédiction zones futures à risque (ML clustering)',
      'ROI calculé par intervention évitée'
    ],
    badge: 'Phase 1+',
    color: 'from-orange-500 to-red-500',
    glow: 'orange'
  },
  {
    icon: Eye,
    title: 'Vision Multi-Caméra Fusionnée',
    subtitle: 'Tracking 360° sans angle mort',
    description: 'Fusion intelligente de plusieurs caméras UniFi pour suivi continu et reconstruction 3D position exacte.',
    features: [
      'Calibration multi-caméra 3D (homographie + SLAM)',
      'Tracking entre caméras seamless (re-ID visuel)',
      'Position 3D précise (erreur 10cm) par triangulation',
      'Précision détection: plus de 98% (YOLOv8-Pose)'
    ],
    badge: 'Phase 1 Core',
    color: 'from-cyan-500 to-blue-500',
    glow: 'cyan'
  }
]

const metrics = [
  { 
    value: '>98%', 
    label: 'Précision 3D',
    sublabel: 'Fusion multi-caméra',
    icon: Target
  },
  { 
    value: '<10cm', 
    label: 'Position Exacte',
    sublabel: 'Tracking spatial 3D',
    icon: Eye
  },
  { 
    value: '60%+', 
    label: 'Prévention',
    sublabel: 'Analyse prédictive',
    icon: TrendingUp
  }
]

const techStack = [
  'Three.js / React Three Fiber',
  'YOLOv8-Pose ONNX (Jetson)',
  'WebSocket Temps Réel',
  'Multi-View Geometry',
  'WebGL Rendering',
  'MediaPipe 3D Skeleton',
  'FastAPI Backend',
  'Spatial Computing'
]

export default function Innovation3D() {
  return (
    <section id="innovation-3d" className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(147,51,234,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(59,130,246,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_rgba(16,185,129,0.12),_transparent_50%)]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container-max relative px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="group inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-2 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-400/50">
            <Sparkles className="h-5 w-5 animate-pulse text-purple-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-purple-300">
              Innovation 3D & Vision Avancée
            </span>
            <Award className="h-5 w-5 text-yellow-400" />
          </div>

          <h2 className="mt-8 text-5xl font-bold leading-tight md:text-6xl">
            Jumeau Numérique & Vision{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              3D Temps Réel
            </span>
          </h2>
          
          <p className="mt-6 text-xl text-slate-300">
            Visualisez votre résidence en <strong className="text-emerald-400">3D interactive</strong> avec positions en temps réel, 
            rejeu des incidents, et zones à risque identifiées. <strong className="text-teal-400">Inclus dès Phase 1.</strong>
          </p>

          {/* Metrics Bar */}
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/30">
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-purple-300">{metric.value}</div>
                  <div className="text-xs text-slate-400">{metric.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Jumeau Numérique Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 p-8 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl lg:p-12">
            {/* Premium Badge */}
            <div className="absolute right-8 top-8 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 animate-pulse text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Différenciateur Clé Phase 1
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left: Description */}
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/40">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Jumeau Numérique 3D</h3>
                    <p className="text-emerald-400 font-semibold">Dashboard Immersif Temps Réel</p>
                  </div>
                </div>

                <p className="mt-6 text-lg text-slate-300">
                  Voyez votre résidence comme jamais auparavant : une <strong className="text-emerald-400">réplique 3D interactive</strong> montrant 
                  les positions en temps réel, le rejeu complet des incidents, et les zones qui nécessitent plus d&apos;attention.
                </p>

                {/* Key Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <Box className="h-6 w-6 shrink-0 text-emerald-400" />
                    <div>
                      <h4 className="font-semibold text-white">Scène 3D WebGL Temps Réel</h4>
                      <p className="text-sm text-slate-400">Three.js + React Three Fiber | WebSocket synchronisé avec pipeline Jetson</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 shrink-0 text-emerald-400" />
                    <div>
                      <h4 className="font-semibold text-white">Replay Forensique 3D</h4>
                      <p className="text-sm text-slate-400">30s pré-incident vers événement vers 1min post | Timeline navigable</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Target className="h-6 w-6 shrink-0 text-emerald-400" />
                    <div>
                      <h4 className="font-semibold text-white">Heatmap Incidents Superposée</h4>
                      <p className="text-sm text-slate-400">Zones à risque visualisées | Historique géolocalisé (précision 10cm)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 shrink-0 text-emerald-400" />
                    <div>
                      <h4 className="font-semibold text-white">Export Formation & Assurance</h4>
                      <p className="text-sm text-slate-400">Vidéo + données 3D pour analyses post-incident et conformité</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/60"
                >
                  <Play className="h-5 w-5" />
                  Voir la Démo 3D Interactive
                </a>
              </div>

              {/* Right: Visual Demo Placeholder */}
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-950 shadow-2xl shadow-emerald-500/20">
                  {/* Placeholder for 3D Demo */}
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900/10 to-slate-900">
                    <div className="text-center space-y-4 p-8">
                      <Box className="h-16 w-16 mx-auto animate-pulse text-emerald-400" />
                      <p className="text-xl font-bold text-white">
                        Jumeau Numérique 3D
                      </p>
                      <p className="text-sm text-slate-400">
                        Dashboard interactif WebGL<br />
                        Intégration disponible en Phase 1
                      </p>
                      <div className="mt-4 flex justify-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 animation-delay-200" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 animation-delay-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Three.js
                  </span>
                  <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    React Three Fiber
                  </span>
                  <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    WebSocket Real-Time
                  </span>
                  <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Multi-Camera Fusion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Innovation Cards Grid */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {innovations.slice(1).map((innovation, idx) => (
            <motion.div
              key={innovation.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Gradient Accent */}
              <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${innovation.color}`} />

              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${innovation.color} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`} />

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${innovation.color} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <innovation.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <span className={`rounded-full border border-${innovation.glow}-500/30 bg-${innovation.glow}-500/10 px-3 py-1 text-xs font-bold text-${innovation.glow}-400`}>
                    {innovation.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-2xl font-bold text-white">{innovation.title}</h3>
                <p className="mt-1 text-sm font-semibold text-purple-400">{innovation.subtitle}</p>
                <p className="mt-4 text-slate-300">{innovation.description}</p>

                {/* Features List */}
                <ul className="mt-6 space-y-2">
                  {innovation.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${innovation.color}`} />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Animated Border on Hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/50 p-8 backdrop-blur-xl"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Cpu className="h-6 w-6 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">Stack Technologique 3D</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-2 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 backdrop-blur-xl">
            <p className="text-lg text-slate-200">
              <strong className="text-emerald-400">Jumeau Numérique Phase 1</strong> · 
              Dashboard 3D inclus dès le déploiement · 
              <strong className="text-cyan-400">Différenciateur clé 2-3 ans d&apos;avance</strong>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/60"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Voir la Démo 3D
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              
              <a
                href="#roadmap"
                className="group rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 px-8 py-4 font-bold text-emerald-300 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-emerald-400/50 hover:bg-emerald-500/10"
              >
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Voir le Roadmap
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
