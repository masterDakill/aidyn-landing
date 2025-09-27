'use client'

import { motion } from 'framer-motion'
import { 
  Bot, 
  BarChart3, 
  Shield, 
  Zap, 
  Database, 
  Smartphone,
  ArrowRight 
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'IP67 Waterproof',
    description: 'Sécurité maximale - Usage sécuritaire dans la douche et le bain. Résistance totale à l\'eau et à l\'humidité.',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: Zap,
    title: 'Double connectivité Wi-Fi + RF 433 MHz',
    description: 'Fiabilité 24/7 - Redondance en cas de panne réseau. Fonctionnement garanti même sans Internet.',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: Database,
    title: 'MQTT Compatible',
    description: 'Interopérabilité - Intégration facile aux systèmes existants et supervision centralisée.',
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: BarChart3,
    title: 'Tableau de bord temps réel',
    description: 'Visibilité totale - Alertes instantanées, logs complets, statut des appareils en permanence.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Bot,
    title: 'Intégration réseau RPA',
    description: 'Conformité réseau - VLAN VoIP, QoS/DSCP optimisé, isolation invités/IoT selon les normes.',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    icon: Smartphone,
    title: 'Technologies futures (Phase 2)',
    description: 'En développement - Assistant IA vocal, analyse prédictive, interfaces multimédia avancées.',
    color: 'from-yellow-500 to-orange-600'
  },
]

export default function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Fonctionnalités
            <span className="text-gradient"> techniques</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies éprouvées pour la Phase 1 RPA avec vision d'évolution vers l'intelligence artificielle avancée.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                  <span className="mr-2">En savoir plus</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Visualization Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Visualisation de données
              <span className="text-gradient"> avancée</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nos interfaces intuitives transforment les données complexes en insights actionables pour optimiser vos décisions d'investissement.
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 overflow-hidden">
            <img
              src="/images/AIDYN_Data_Viz_-_Export_Transparent.png"
              alt="AIDYN Data Visualization Dashboard"
              className="w-full h-auto object-contain mx-auto max-w-4xl"
            />

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Données en temps réel</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">IA Analytics</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            Prêt à transformer votre business immobilier avec l'IA ?
          </p>
          <a href="#contact" className="btn-primary">
            Planifier une démonstration
          </a>
        </motion.div>
      </div>
    </section>
  )
}