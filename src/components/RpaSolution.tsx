'use client'

import { motion } from 'framer-motion'
import {
  Droplets,
  Wifi,
  Radio,
  BarChart3,
  Network,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Target
} from 'lucide-react'

const features = [
  {
    icon: Droplets,
    title: 'IP67 Waterproof',
    description: 'Usage sécuritaire dans la douche et le bain. Résistance totale à l\'eau et à l\'humidité.',
    benefit: 'Sécurité maximale'
  },
  {
    icon: Radio,
    title: 'Double connectivité Wi-Fi + RF 433 MHz',
    description: 'Redondance en cas de panne réseau. Fonctionnement garanti même sans Internet.',
    benefit: 'Fiabilité 24/7'
  },
  {
    icon: Network,
    title: 'MQTT Compatible',
    description: 'Intégration facile aux systèmes existants et supervision centralisée.',
    benefit: 'Interopérabilité'
  },
  {
    icon: BarChart3,
    title: 'Tableau de bord temps réel',
    description: 'Alertes instantanées, logs complets, statut des appareils en permanence.',
    benefit: 'Visibilité totale'
  },
  {
    icon: Shield,
    title: 'Intégration réseau RPA',
    description: 'VLAN VoIP, QoS/DSCP optimisé, isolation invités/IoT selon les normes.',
    benefit: 'Conformité réseau'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Réduction des délais d\'intervention',
    description: 'Alertes instantanées permettent une réaction immédiate du personnel soignant.'
  },
  {
    icon: Shield,
    title: 'Renforcement de la sécurité',
    description: 'Surveillance continue et systèmes redondants garantissent la protection des résidents.'
  },
  {
    icon: Users,
    title: 'Tranquillité des familles',
    description: 'Les proches ont l\'assurance que leurs êtres chers sont surveillés et protégés.'
  }
]

export default function RpaSolution() {
  return (
    <section id="rpa-solution" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Target className="w-4 h-4" />
            Phase 1 — Prête à déployer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solution complète pour
            <span className="text-gradient block">établissements RPA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Notre système intelligent d'appel d'urgence transforme la sécurité et l'efficacité
            de votre établissement dès le déploiement de la Phase 1.
          </p>
        </motion.div>

        {/* Benefits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-100"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary-600 mb-4">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Fonctionnalités techniques
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      {feature.benefit}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* KPI Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-8">KPI visés avec la Phase 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">↓ 75%</div>
              <div className="text-primary-100">Temps de réponse moyen</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">↑ 95%</div>
              <div className="text-primary-100">Taux de résolution</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-primary-100">Uptime système 24/7</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}