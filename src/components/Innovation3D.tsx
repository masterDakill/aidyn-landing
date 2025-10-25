'use client'

import { motion } from 'framer-motion'
import { Sparkles, Cpu, Eye, Brain, Target, Award, Zap, TrendingUp } from 'lucide-react'

const innovations = [
  {
    icon: Brain,
    title: 'Analyse Posturale Prédictive',
    subtitle: 'Prévention AVANT la chute',
    description: 'IA 3D détecte démarche instable et posture à risque pour alerter AVANT l\'incident.',
    features: [
      'Skeleton tracking 3D temps réel',
      'Score de risque prédictif',
      'Alertes préventives personnalisées',
      'Réduction incidents: >60%'
    ],
    badge: 'Brevetable',
    color: 'from-purple-500 to-pink-500',
    glow: 'purple'
  },
  {
    icon: Target,
    title: 'Carte Thermique 3D Intelligente',
    subtitle: 'Zones à risque visualisées',
    description: 'Reconstruction 3D de la résidence avec heatmap historique des incidents pour optimisation proactive.',
    features: [
      'Modèle 3D spatial automatique',
      'Historique incidents géolocalisés',
      'Prédiction zones futures à risque',
      'ROI calculé par intervention'
    ],
    badge: 'Exclusif',
    color: 'from-orange-500 to-red-500',
    glow: 'orange'
  },
  {
    icon: Eye,
    title: 'Vision Multi-Caméra Fusionnée',
    subtitle: 'Tracking 360° sans angle mort',
    description: 'Fusion intelligente de plusieurs caméras pour suivi continu et reconstruction 3D position exacte.',
    features: [
      'Calibration multi-caméra 3D',
      'Tracking entre caméras seamless',
      'Position 3D précise (<10cm)',
      'Précision détection: >98%'
    ],
    badge: 'Avancé',
    color: 'from-cyan-500 to-blue-500',
    glow: 'cyan'
  },
  {
    icon: Zap,
    title: 'Jumeau Numérique Temps Réel',
    subtitle: 'Dashboard 3D superviseur',
    description: 'Réplique 3D interactive de la résidence avec overlay temps réel résidents, personnel et alertes.',
    features: [
      'Vue 3D temps réel complète',
      'Replay incidents en 3D',
      'Optimisation placement personnel',
      'Formation virtuelle immersive'
    ],
    badge: 'Innovation',
    color: 'from-emerald-500 to-teal-500',
    glow: 'emerald'
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
  'YOLOv8 Pose Detection',
  'MediaPipe 3D Skeleton',
  'Multi-View Geometry',
  'WebGL Rendering',
  'Real-Time Fusion',
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
            Technologie 3D{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              de Pointe
            </span>
          </h2>
          
          <p className="mt-6 text-xl text-slate-300">
            AIDYN ne détecte pas seulement les chutes - nous les <strong className="text-purple-400">PRÉVENONS</strong> 
            {' '}grâce à l&apos;analyse posturale 3D prédictive et la vision multi-caméra fusionnée.
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

        {/* Innovation Cards Grid */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {innovations.map((innovation, idx) => (
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
          <div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-8 backdrop-blur-xl">
            <p className="text-lg text-slate-200">
              <strong className="text-purple-400">Différenciation technologique majeure</strong> · 
              Propriété intellectuelle brevetable · 
              <strong className="text-cyan-400">Avance compétitive 2-3 ans</strong>
            </p>
            
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/60"
            >
              <span className="relative z-10 flex items-center gap-2">
                Voir la démo 3D
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
