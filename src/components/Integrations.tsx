'use client'

import { motion } from 'framer-motion'
import {
  Network,
  Shield,
  Radio,
  Database,
  MessageSquare,
  Phone,
  BarChart3,
  Settings,
  Wifi,
  Server,
  Lock,
  Zap,
  ArrowRight
} from 'lucide-react'

const networkFeatures = [
  {
    icon: Network,
    title: 'UDM Pro/UniFi',
    description: 'Infrastructure réseau professionnelle avec gestion centralisée'
  },
  {
    icon: Shield,
    title: 'VLANs 1/10/20/40',
    description: 'Segmentation réseau : Management, VoIP, Données, IoT'
  },
  {
    icon: Zap,
    title: 'QoS DSCP',
    description: 'Priorisation du trafic critique et optimisation des performances'
  },
  {
    icon: Wifi,
    title: 'Roaming AP',
    description: 'Couverture Wi-Fi seamless dans tout l\'établissement'
  }
]

const protocols = [
  {
    icon: Database,
    title: 'MQTT',
    description: 'Protocole IoT standard pour communication machine-to-machine'
  },
  {
    icon: Server,
    title: 'API REST',
    description: 'Intégration moderne avec tous vos systèmes existants'
  },
  {
    icon: Lock,
    title: 'TLS/SSL',
    description: 'Chiffrement bout-en-bout pour la sécurité des données'
  }
]

const tools = [
  {
    icon: MessageSquare,
    title: 'Slack/Teams',
    description: 'Notifications d\'urgence directes dans vos canaux'
  },
  {
    icon: Phone,
    title: 'Twilio/VoIP',
    description: 'Appels automatiques et SMS d\'alerte'
  },
  {
    icon: BarChart3,
    title: 'Airtable/ERP',
    description: 'Synchronisation avec vos bases de données'
  }
]

export default function Integrations() {
  return (
    <section id="integrations" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
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
            Intégrations
            <span className="text-gradient"> complètes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre solution s'intègre parfaitement dans votre infrastructure existante
            avec des protocoles standards et une architecture réseau optimisée.
          </p>
        </motion.div>

        {/* Network & Security */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center">
            <Network className="w-8 h-8 text-primary-600 mr-3" />
            Réseau & Sécurité
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {networkFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-center mb-8">Architecture de communication</h3>

            {/* Simple flow diagram */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl border border-primary-200"
              >
                <Radio className="w-12 h-12 text-primary-600 mb-2" />
                <span className="text-sm font-semibold">Bouton IP67</span>
              </motion.div>

              <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
              >
                <Wifi className="w-12 h-12 text-green-600 mb-2" />
                <span className="text-sm font-semibold">RF433/Wi-Fi</span>
              </motion.div>

              <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200"
              >
                <Database className="w-12 h-12 text-purple-600 mb-2" />
                <span className="text-sm font-semibold">Broker MQTT</span>
              </motion.div>

              <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200"
              >
                <BarChart3 className="w-12 h-12 text-orange-600 mb-2" />
                <span className="text-sm font-semibold">Dashboard</span>
              </motion.div>

              <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200"
              >
                <MessageSquare className="w-12 h-12 text-red-600 mb-2" />
                <span className="text-sm font-semibold">Notifications</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Protocols & Data */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center">
            <Database className="w-8 h-8 text-primary-600 mr-3" />
            Protocoles & Données
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {protocols.map((protocol, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  <protocol.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">{protocol.title}</h4>
                <p className="text-gray-600 leading-relaxed">{protocol.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center">
            <Settings className="w-8 h-8 text-primary-600 mr-3" />
            Outils métiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">{tool.title}</h4>
                <p className="text-gray-600 leading-relaxed">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}