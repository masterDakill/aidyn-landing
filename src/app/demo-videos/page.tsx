import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Video, Sparkles, Target, Eye } from 'lucide-react'

// Load VideoAnalysisDemo with SSR disabled
const VideoAnalysisDemo = dynamic(
  () => import('@/components/VideoAnalysisDemo'),
  { ssr: false }
)

export const metadata = {
  title: 'Démos Vidéo IA | AIDYN Technologies',
  description: 'Démonstrations de détection IA en temps réel - L\'Auberge Boischatel'
}

// Videos from L'Auberge Boischatel
const videos = [
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
    name: 'Porte principale - Extérieur',
    location: 'L\'Auberge Boischatel - Entrée',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/beb6f1ba-f117-451f-8ded-e0537f04b597',
    detections: [
      {
        id: '1',
        x: 45,
        y: 35,
        width: 14,
        height: 38,
        label: 'visitor' as const,
        confidence: 0.91,
        status: 'normal' as const,
        name: 'Visiteur',
        activity: 'Entrée principale'
      }
    ]
  },
  {
    id: '3',
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
  },
  {
    id: '4',
    name: 'Salon 2e étage',
    location: 'L\'Auberge Boischatel - 2e étage',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/14058304-8a5e-4b2f-8c67-c56ea306b8c0',
    detections: [
      {
        id: '1',
        x: 25,
        y: 48,
        width: 11,
        height: 30,
        label: 'resident' as const,
        confidence: 0.88,
        status: 'attention' as const,
        name: 'Résident E',
        activity: 'Posture instable'
      },
      {
        id: '2',
        x: 60,
        y: 45,
        width: 13,
        height: 33,
        label: 'resident' as const,
        confidence: 0.93,
        status: 'normal' as const,
        name: 'Résident F',
        activity: 'Assis - Lecture'
      }
    ]
  },
  {
    id: '5',
    name: 'Escalier côté Ouest',
    location: 'L\'Auberge Boischatel - Nouvelle section',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/81bc32bc-a9da-41a9-a611-491e2aaefded',
    detections: [
      {
        id: '1',
        x: 50,
        y: 40,
        width: 12,
        height: 35,
        label: 'resident' as const,
        confidence: 0.91,
        status: 'attention' as const,
        name: 'Résident G',
        activity: 'Escalier - Montée'
      }
    ]
  },
  {
    id: '6',
    name: 'Salle à manger - Vue bureau infirmière',
    location: 'L\'Auberge Boischatel - RDC',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/6d2c61f7-8d05-4565-a4c4-063f2a8fe87e',
    detections: [
      {
        id: '1',
        x: 35,
        y: 43,
        width: 10,
        height: 28,
        label: 'staff' as const,
        confidence: 0.95,
        status: 'normal' as const,
        name: 'Infirmière Chef',
        activity: 'Bureau - Documentation'
      },
      {
        id: '2',
        x: 60,
        y: 48,
        width: 11,
        height: 30,
        label: 'resident' as const,
        confidence: 0.89,
        status: 'normal' as const,
        name: 'Résident H',
        activity: 'Repas'
      }
    ]
  },
  {
    id: '7',
    name: 'RDC - Nouvelle Partie',
    location: 'L\'Auberge Boischatel - Extension',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/eb953487-2e29-4f1e-964c-bd7c8c93a486',
    detections: [
      {
        id: '1',
        x: 42,
        y: 45,
        width: 13,
        height: 34,
        label: 'resident' as const,
        confidence: 0.90,
        status: 'normal' as const,
        name: 'Résident I',
        activity: 'Déplacement'
      }
    ]
  },
  {
    id: '8',
    name: 'Espace commun 2e étage',
    location: 'L\'Auberge Boischatel - 2e étage',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/a880008e-3ae5-46da-92f3-14dd166480ac',
    detections: [
      {
        id: '1',
        x: 30,
        y: 50,
        width: 12,
        height: 32,
        label: 'resident' as const,
        confidence: 0.87,
        status: 'normal' as const,
        name: 'Résident J',
        activity: 'Conversation'
      },
      {
        id: '2',
        x: 55,
        y: 47,
        width: 11,
        height: 30,
        label: 'resident' as const,
        confidence: 0.92,
        status: 'normal' as const,
        name: 'Résident K',
        activity: 'Activité sociale'
      }
    ]
  },
  {
    id: '9',
    name: 'Espace commun 1er étage',
    location: 'L\'Auberge Boischatel - 1er étage',
    url: 'https://page.gensparksite.com/get_upload_url/4996ebfd7c514957ee6b41ddb48a0efae9916bfa72c3ec877e0600698de8c041/default/dd93d773-b3ea-484e-81ae-3e1aa4c49b8d',
    detections: [
      {
        id: '1',
        x: 38,
        y: 44,
        width: 13,
        height: 35,
        label: 'resident' as const,
        confidence: 0.94,
        status: 'normal' as const,
        name: 'Résident L',
        activity: 'Télévision'
      },
      {
        id: '2',
        x: 62,
        y: 42,
        width: 12,
        height: 33,
        label: 'staff' as const,
        confidence: 0.96,
        status: 'normal' as const,
        name: 'Préposé M',
        activity: 'Interaction sociale'
      }
    ]
  }
]

export default function DemoVideosPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen bg-slate-950 pt-20">
        {/* Header */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
                <Video className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  Démonstrations Vidéo IA
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-bold text-white md:text-6xl">
                Détection en{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Temps Réel
                </span>
              </h1>

              <p className="mt-6 text-xl text-slate-300">
                Vidéos réelles de <strong className="text-emerald-400">L'Auberge Boischatel</strong> avec 
                overlay de détection IA simulée. Pipeline YOLOv8-Pose + FastAPI.
              </p>

              {/* Features */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">
                    ≥95% Précision
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-300">
                    &lt;500ms Latence
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2">
                  <Eye className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-semibold text-purple-300">
                    Multi-Caméra
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Videos Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {videos.map((video, idx) => (
                <div key={video.id}>
                  <VideoAnalysisDemo
                    videoUrl={video.url}
                    videoName={video.name}
                    location={video.location}
                    mockDetections={video.detections}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="border-t border-white/10 py-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white">
                Détection IA Simulée
              </h2>
              <p className="mt-4 text-slate-300">
                Ces vidéos montrent une <strong className="text-cyan-400">simulation</strong> de ce 
                que notre système de détection IA SerenaCare produirait en temps réel. Les bounding boxes, 
                labels et scores de confiance sont générés pour démonstration.
              </p>

              <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/50 p-6">
                <h3 className="text-lg font-bold text-white">Pipeline Phase 1 (2026)</h3>
                <div className="mt-4 space-y-2 text-left text-sm text-slate-300">
                  <p>→ <strong className="text-emerald-400">Caméras UniFi Protect</strong> (RTSP H.264)</p>
                  <p>→ <strong className="text-cyan-400">Jetson Nano/Orin</strong> (Edge AI local)</p>
                  <p>→ <strong className="text-purple-400">YOLOv8-Pose</strong> (Détection + Posture)</p>
                  <p>→ <strong className="text-amber-400">FastAPI</strong> (Backend + WebSocket)</p>
                  <p>→ <strong className="text-blue-400">Dashboard React</strong> (Visualisation temps réel)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
