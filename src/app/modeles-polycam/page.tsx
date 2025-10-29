'use client'

import Navigation from '@/components/Navigation'
import PolycamViewer from '@/components/PolycamViewer'
import { motion } from 'framer-motion'
import { Box, Layers, Download } from 'lucide-react'

export default function ModelesPolycamPage() {
  const polycamModels = [
    {
      id: '097328f4-7a14-453e-88a5-e0aaee44bdf9',
      title: 'Modèle 3D de la Résidence - Vue 1',
      description: 'Scan 3D complet avec métadonnées de dimensions'
    },
    {
      id: 'e176d32c-64d0-47ae-b210-27a2c40ab720',
      title: 'Logo AiDYN 3D',
      description: 'Modèle 3D haute définition du logo'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <main className="container mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
            <Box className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">
              Modèles 3D Polycam
            </span>
          </div>
          
          <h1 className="mt-6 text-5xl font-bold text-white">
            Exploration{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              3D Interactive
            </span>
          </h1>
          
          <p className="mx-auto mt-4 max-w-3xl text-xl text-slate-400">
            Découvrez nos modèles 3D avec métadonnées de dimensions intégrées
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl"
          >
            <Layers className="mb-3 h-8 w-8 text-cyan-400" />
            <h3 className="mb-2 font-bold text-white">Haute Définition</h3>
            <p className="text-sm text-slate-400">
              Modèles scannés avec précision Polycam pour détails réalistes
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl"
          >
            <Box className="mb-3 h-8 w-8 text-emerald-400" />
            <h3 className="mb-2 font-bold text-white">Métadonnées Incluses</h3>
            <p className="text-sm text-slate-400">
              Dimensions réelles et échelle intégrées dans les fichiers GLB
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl"
          >
            <Download className="mb-3 h-8 w-8 text-purple-400" />
            <h3 className="mb-2 font-bold text-white">Téléchargeable</h3>
            <p className="text-sm text-slate-400">
              Export en format GLB/GLTF pour intégration dans Three.js
            </p>
          </motion.div>
        </div>

        {/* Polycam Viewers */}
        <div className="space-y-12">
          {polycamModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <PolycamViewer
                captureId={model.id}
                title={model.title}
                description={model.description}
              />
            </motion.div>
          ))}
        </div>

        {/* Integration Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-xl"
        >
          <h2 className="mb-4 text-2xl font-bold text-white">
            Intégration dans Dashboard 3D
          </h2>
          <p className="mb-6 text-slate-400">
            Ces modèles peuvent être téléchargés et intégrés directement dans notre Dashboard 3D
            pour une représentation ultra-réaliste de la résidence.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400">
                1
              </div>
              <div>
                <div className="font-semibold text-white">Télécharger le GLB</div>
                <div className="text-sm text-slate-400">
                  Cliquez sur &quot;Télécharger GLB&quot; pour obtenir le fichier 3D
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">
                2
              </div>
              <div>
                <div className="font-semibold text-white">Extraire les Métadonnées</div>
                <div className="text-sm text-slate-400">
                  Les dimensions réelles sont incluses dans le fichier GLB
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-sm font-bold text-purple-400">
                3
              </div>
              <div>
                <div className="font-semibold text-white">Intégrer dans Three.js</div>
                <div className="text-sm text-slate-400">
                  Utiliser avec useGLTF de @react-three/drei pour rendu optimal
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
