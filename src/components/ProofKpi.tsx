'use client'

import { motion } from 'framer-motion'
import {
  Clock,
  Shield,
  Activity,
  Droplets,
  Radio,
  BarChart3,
  CheckCircle,
  Building,
  MapPin,
  Users,
  TrendingUp,
  Star
} from 'lucide-react'

const proofs = [
  {
    icon: Clock,
    title: 'Réduction des délais',
    value: '75%',
    description: 'Temps de réponse divisé par 4 grâce aux alertes instantanées',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Shield,
    title: 'Fiabilité système',
    value: '99.9%',
    description: 'Uptime garanti avec double connectivité Wi-Fi + RF 433MHz',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Activity,
    title: 'Visibilité totale',
    value: '24/7',
    description: 'Monitoring continu et tableau de bord temps réel',
    color: 'from-purple-500 to-violet-600'
  }
]

const badges = [
  {
    icon: Droplets,
    title: 'Étanche IP67',
    subtitle: 'Usage douche/bain sécurisé',
    color: 'bg-blue-500'
  },
  {
    icon: Radio,
    title: 'Redondance Wi-Fi + 433MHz',
    subtitle: 'Fonctionnement même sans réseau',
    color: 'bg-purple-500'
  },
  {
    icon: BarChart3,
    title: 'Monitoring 24/7',
    subtitle: 'Supervision continue',
    color: 'bg-orange-500'
  },
  {
    icon: CheckCircle,
    title: 'MQTT Enterprise',
    subtitle: 'Standard industriel IoT',
    color: 'bg-green-500'
  }
]

export default function ProofKpi() {
  return (
    <section id="proof-kpi" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Preuves &
            <span className="text-gradient"> Résultats</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des bénéfices mesurables et une technologie éprouvée pour transformer
            votre établissement RPA dès la Phase 1.
          </p>
        </motion.div>

        {/* Main Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {proofs.map((proof, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="h-full p-8 bg-white rounded-2xl border-2 border-gray-100 group-hover:border-primary-200 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${proof.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${proof.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <proof.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl font-bold text-primary-600 mb-3">{proof.value}</div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary-600 transition-colors">
                    {proof.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {proof.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Technologies certifiées
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl ${badge.color} mb-4`}>
                  <badge.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2">{badge.title}</h4>
                <p className="text-gray-600 text-sm">{badge.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Building className="w-4 h-4" />
              Étude de cas Québec
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Déploiement réussi - Auberge Boischatel
            </h3>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Infrastructure réseau stabilisée, QoS VoIP optimisé, et roaming seamless
              dans tout l’établissement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-primary-200" />
              <div className="text-2xl font-bold mb-1">Québec</div>
              <div className="text-primary-200 text-sm">Région desservie</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Users className="w-8 h-8 mx-auto mb-3 text-primary-200" />
              <div className="text-2xl font-bold mb-1">150+</div>
              <div className="text-primary-200 text-sm">Résidents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary-200" />
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-primary-200 text-sm">Uptime réseau</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Star className="w-8 h-8 mx-auto mb-3 text-primary-200" />
              <div className="text-2xl font-bold mb-1">5/5</div>
              <div className="text-primary-200 text-sm">Satisfaction</div>
            </div>
          </div>

            <div className="text-center mt-8">
              <blockquote className="text-lg italic text-primary-100 max-w-2xl mx-auto">
                “Le système AIDYN a transformé notre capacité de réaction.
                Les alertes instantanées nous permettent d’intervenir immédiatement.”
              </blockquote>
            <div className="mt-4 text-primary-200">
              — Direction, Auberge Boischatel
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}