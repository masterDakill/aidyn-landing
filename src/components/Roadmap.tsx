'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  TrendingUp,
  Video,
  Eye,
  Mic,
  BarChart3,
  ArrowRight,
  Sparkles,
  Beaker
} from 'lucide-react'

const phase2Features = [
  {
    icon: Brain,
    title: 'Assistant IA vocal & aide soignant',
    description: 'Intelligence conversationnelle pour accompagner les résidents et assister le personnel médical.',
    status: 'En développement (2025)',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    icon: TrendingUp,
    title: 'Analytique avancée & prévention',
    description: 'Analyse des patterns comportementaux pour anticiper les urgences et optimiser les soins.',
    status: 'Recherche avancée (2025+)',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Video,
    title: 'Médias enrichis (vidéo/AR)',
    description: 'Interfaces multimédia et réalité augmentée pour l\'information et le divertissement.',
    status: 'Concept futur',
    color: 'from-orange-500 to-red-600'
  }
]

export default function Roadmap() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container-max px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Beaker className="w-4 h-4" />
            Phase 2 — Vision future
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            IA vocale, prévention prédictive,
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              multimédia (à venir)
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Après le déploiement réussi de la Phase 1, explorez les innovations
            futures qui révolutionneront davantage votre établissement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {phase2Features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <div className="mb-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  feature.status.includes('Beta')
                    ? 'bg-green-500/20 text-green-400'
                    : feature.status.includes('développement')
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {feature.status}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Rejoindre le programme bêta
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.a>
          <p className="text-gray-400 text-sm mt-3">
            Accès anticipé aux fonctionnalités Phase 2 pour nos clients Phase 1
          </p>
        </motion.div>
      </div>
    </section>
  )
}