'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import VirtualSimulation from '@/components/VirtualSimulation'
import { Play, Info, Shield, Zap } from 'lucide-react'

const locations = [
  { id: '1', name: 'Salle à manger', area: 'RDC' },
  { id: '2', name: 'Porte principale extérieur', area: 'Entrée' },
  { id: '3', name: 'Corridor d\'entrée', area: 'RDC' },
  { id: '4', name: 'Salon 2e étage', area: '2e étage' },
  { id: '5', name: 'Escalier côté Ouest', area: 'Circulation' },
  { id: '6', name: 'Salle à manger - Vue bureau infirmière', area: 'RDC' },
  { id: '7', name: 'RDC Nouvelle Partie', area: 'RDC' },
  { id: '8', name: 'Espace commun 2e étage', area: '2e étage' },
  { id: '9', name: 'Espace commun 1er étage', area: '1er étage' }
]

export default function DemoVirtualPage() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <main className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">
              Simulation Virtuelle - Confidentialité 100%
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-bold text-white">
            Démonstrations{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Virtuelles
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-slate-400">
            Simulation d&apos;événements IA en temps réel - <strong className="text-cyan-400">Aucune vraie personne</strong> n&apos;est montrée pour respecter la confidentialité
          </p>
        </div>

        {/* Info Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl">
            <Shield className="mb-3 h-8 w-8 text-cyan-400" />
            <h3 className="mb-2 font-bold text-white">Confidentialité</h3>
            <p className="text-sm text-slate-400">
              Simulation virtuelle sans aucune vraie personne. Événements générés par algorithme.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl">
            <Zap className="mb-3 h-8 w-8 text-emerald-400" />
            <h3 className="mb-2 font-bold text-white">Détection IA</h3>
            <p className="text-sm text-slate-400">
              Démonstration des capacités YOLOv8-Pose avec bounding boxes et scores de confiance.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl">
            <Play className="mb-3 h-8 w-8 text-purple-400" />
            <h3 className="mb-2 font-bold text-white">Temps Réel</h3>
            <p className="text-sm text-slate-400">
              Simulation interactive avec contrôles de vitesse et nombre de personnes virtuelles.
            </p>
          </div>
        </div>

        {/* Location Selector */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Sélectionner un emplacement</h2>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
            {locations.map(location => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`rounded-lg border-2 p-4 text-left transition-all ${
                  selectedLocation.id === location.id
                    ? 'border-cyan-500 bg-cyan-500/20'
                    : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800'
                }`}
              >
                <div className="text-sm font-bold text-white">{location.name}</div>
                <div className="text-xs text-slate-400">{location.area}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Virtual Simulation */}
        <div className="mb-8">
          <VirtualSimulation
            location={`${selectedLocation.name} - ${selectedLocation.area}`}
            width={1200}
            height={675}
          />
        </div>

        {/* Pipeline Info */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <Info className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Architecture Phase 1</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20 text-lg font-bold text-cyan-400">
                1
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Caméras UniFi</div>
                <div className="text-sm text-slate-400">
                  Flux vidéo RTSP depuis caméras existantes
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20 text-lg font-bold text-emerald-400">
                2
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Edge Computing (Jetson Orin)</div>
                <div className="text-sm text-slate-400">
                  Traitement local avec YOLOv8-Pose pour détection temps réel
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-lg font-bold text-purple-400">
                3
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Dashboard 3D</div>
                <div className="text-sm text-slate-400">
                  Visualisation immersive avec jumeau numérique de la résidence
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20 text-lg font-bold text-amber-400">
                4
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Alertes Intelligentes</div>
                <div className="text-sm text-slate-400">
                  Notification instantanée des événements à risque (&lt;500ms)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-center backdrop-blur-xl">
            <div className="text-4xl font-bold text-cyan-400">≥95%</div>
            <div className="mt-2 text-sm text-slate-400">Précision IA</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-center backdrop-blur-xl">
            <div className="text-4xl font-bold text-emerald-400">&lt;500ms</div>
            <div className="mt-2 text-sm text-slate-400">Latence</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-center backdrop-blur-xl">
            <div className="text-4xl font-bold text-purple-400">&lt;5%</div>
            <div className="mt-2 text-sm text-slate-400">Faux Positifs</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-center backdrop-blur-xl">
            <div className="text-4xl font-bold text-amber-400">100%</div>
            <div className="mt-2 text-sm text-slate-400">Confidentialité</div>
          </div>
        </div>
      </main>
    </div>
  )
}
