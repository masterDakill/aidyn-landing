/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { 
  Video, 
  Sparkles, 
  Target, 
  Eye, 
  ArrowRight,
  Zap,
  Shield,
  Activity
} from 'lucide-react'

// Load VideoAnalysisDemo with SSR disabled
const VideoAnalysisDemo = dynamic(
  () => import('@/components/VideoAnalysisDemo'),
  { ssr: false }
)

// Featured videos for main demo section
const featuredVideos = [
  {
    id: '1',
    name: 'Salle à manger',
    location: 'L\'Auberge Boischatel - RDC',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/90b23098-4a77-416b-a1e4-a8e958735e88',
    detections: [
      {
        id: '1',
        x: 30,
        y: 45,
        width: 10,
        height: 28,
        label: 'resident' as const,
        confidence: 0.92,
        status: 'normal' as const,
        name: 'Résident A',
        activity: 'Assis - Repas'
      },
      {
        id: '2',
        x: 55,
        y: 40,
        width: 12,
        height: 32,
        label: 'staff' as const,
        confidence: 0.96,
        status: 'normal' as const,
        name: 'Préposé B',
        activity: 'Service repas'
      },
      {
        id: '3',
        x: 70,
        y: 38,
        width: 11,
        height: 30,
        label: 'resident' as const,
        confidence: 0.89,
        status: 'normal' as const,
        name: 'Résident C',
        activity: 'Debout - Marche'
      }
    ]
  },
  {
    id: '2',
    name: 'Corridor d\'entrée',
    location: 'L\'Auberge Boischatel - RDC',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/bdbed0c5-a0d0-4abd-b162-5226950739bb',
    detections: [
      {
        id: '1',
        x: 40,
        y: 42,
        width: 12,
        height: 35,
        label: 'resident' as const,
        confidence: 0.94,
        status: 'normal' as const,
        name: 'Résident D',
        activity: 'Déambulation'
      },
      {
        id: '2',
        x: 65,
        y: 38,
        width: 10,
        height: 32,
        label: 'staff' as const,
        confidence: 0.97,
        status: 'normal' as const,
        name: 'Infirmière',
        activity: 'Surveillance'
      }
    ]
  }
]

const stats = [
  {
    icon: Target,
    label: 'Précision',
    value: '≥95%',
    description: 'Détection fiable',
    color: 'emerald'
  },
  {
    icon: Zap,
    label: 'Latence',
    value: '<500ms',
    description: 'Temps réel',
    color: 'cyan'
  },
  {
    icon: Shield,
    label: 'Uptime',
    value: '99.5%',
    description: 'Haute disponibilité',
    color: 'purple'
  },
  {
    icon: Activity,
    label: 'Caméras',
    value: '50+',
    description: 'Multi-caméra',
    color: 'amber'
  }
]

export default function LiveCameraDemo() {
  const [selectedVideo, setSelectedVideo] = useState(0)

  return (
    <section id="live-demo" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      
      <div className="container relative mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
            <Video className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">
              Démonstration en Direct
            </span>
          </div>

          <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Détection IA{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              en Temps Réel
            </span>
          </h2>

          <p className="mt-6 text-xl text-slate-300">
            Vidéos réelles de <strong className="text-emerald-400">L'Auberge Boischatel</strong> avec 
            détection IA simulée. Visualisez notre pipeline YOLOv8-Pose en action.
          </p>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className={`rounded-xl border border-${stat.color}-500/30 bg-${stat.color}-500/10 p-4`}
              >
                <stat.icon className={`mx-auto h-6 w-6 text-${stat.color}-400`} />
                <p className={`mt-2 text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
                <p className="text-xs font-semibold text-white">{stat.label}</p>
                <p className="text-xs text-slate-400">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          {featuredVideos.map((video, idx) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(idx)}
              className={`rounded-lg border px-6 py-3 font-semibold transition-all ${
                selectedVideo === idx
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20'
                  : 'border-white/10 bg-slate-800/50 text-slate-300 hover:border-white/20 hover:bg-slate-800'
              }`}
            >
              <Eye className="mb-1 inline h-4 w-4" /> {video.name}
            </button>
          ))}
        </motion.div>

        {/* Main Video Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <VideoAnalysisDemo
            videoUrl={featuredVideos[selectedVideo].url}
            videoName={featuredVideos[selectedVideo].name}
            location={featuredVideos[selectedVideo].location}
            mockDetections={featuredVideos[selectedVideo].detections}
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/20 p-3">
                <Target className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Précision Extrême</h3>
            </div>
            <p className="mt-4 text-slate-300">
              YOLOv8-Pose optimisé pour ≥95% de précision. Réduction des faux positifs à &lt;5% grâce 
              au threshold de confiance ajustable (0.85+).
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/20 p-3">
                <Sparkles className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Latence Ultra-Faible</h3>
            </div>
            <p className="mt-4 text-slate-300">
              Pipeline optimisé: frame preprocessing → inference → alert trigger en &lt;500ms. 
              Edge computing local pour performances maximales.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/20 p-3">
                <Eye className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Caméra Unifié</h3>
            </div>
            <p className="mt-4 text-slate-300">
              Gestion simultanée de 50+ flux caméra UniFi Protect. Dashboard centralisé avec 
              visualisation en temps réel de toutes les zones.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="/demo-videos"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/50 bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
          >
            Voir Toutes les Caméras (9 vidéos)
            <ArrowRight className="h-5 w-5" />
          </a>

          <p className="mt-4 text-sm text-slate-400">
            Vidéos réelles de production • Détection IA simulée • Pipeline Phase 1 (2026)
          </p>
        </motion.div>

        {/* Technical Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-center text-2xl font-bold text-white">
              Pipeline Technique SerenaCare
            </h3>
            <div className="mt-6 space-y-3 text-slate-300">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-emerald-400">→</span>
                <p><strong className="text-emerald-400">Caméras UniFi Protect</strong> - Flux RTSP H.264 existant, pas de nouveau matériel requis</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-cyan-400">→</span>
                <p><strong className="text-cyan-400">Jetson Nano/Orin</strong> - Edge AI local, traitement sécurisé sans cloud</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-purple-400">→</span>
                <p><strong className="text-purple-400">YOLOv8-Pose</strong> - Détection personne + analyse posture temps réel</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-amber-400">→</span>
                <p><strong className="text-amber-400">FastAPI Backend</strong> - WebSocket pour streaming événements + API RESTful</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-blue-400">→</span>
                <p><strong className="text-blue-400">Dashboard React</strong> - Interface PWA responsive, notifications push</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
