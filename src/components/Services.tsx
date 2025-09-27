'use client'

import { motion } from 'framer-motion'
import { 
  Building2, 
  Brain, 
  Cog, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const services = [
  {
    icon: CheckCircle,
    title: 'Phase 1 - Déploiement RPA',
    description: 'Solution complète d\'appel d\'urgence pour votre établissement RPA avec boutons étanches IP67 et surveillance 24/7.',
    features: [
      'Installation boutons IP67 dans chambres/SdB',
      'Configuration réseau Wi-Fi + RF433',
      'Intégration VLAN et QoS optimisé',
      'Formation du personnel soignant'
    ],
    price: 'Disponible maintenant',
    duration: '2-4 semaines'
  },
  {
    icon: Brain,
    title: 'Solutions IA Avancées',
    description: 'Technologies d\'intelligence artificielle pour l\'analyse prédictive et l\'automatisation (développement en cours).',
    features: [
      'Assistant IA vocal (bêta)',
      'Analyse comportementale',
      'Prévention prédictive',
      'Intégration systèmes existants'
    ],
    price: 'Bientôt disponible',
    duration: 'Phase 2 - 2025'
  },
  {
    icon: TrendingUp,
    title: 'Autres Secteurs',
    description: 'Extension de nos technologies vers l\'immobilier résidentiel et commercial (en développement).',
    features: [
      'Gestion immobilière automatisée',
      'Analyse de marché par IA',
      'Maintenance prédictive',
      'Optimisation énergétique'
    ],
    price: 'À venir',
    duration: 'Roadmap future'
  }
]

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solutions
            <span className="text-gradient"> AIDYN</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Phase 1 disponible maintenant pour les RPA du Québec. Phases avancées et autres secteurs en développement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="h-full p-8 bg-white rounded-2xl border-2 border-gray-100 group-hover:border-primary-200 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                {/* Popular badge for middle service */}
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Le plus populaire
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-primary-600">{service.price}</span>
                    <span className="text-sm text-gray-500">{service.duration}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full btn-primary group-hover:bg-primary-700">
                  <span>Commencer le projet</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Produits
              <span className="text-gradient"> Phares</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des solutions éprouvées qui transforment déjà le quotidien de centaines d'entrepreneurs québécois.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product card - Version Claire */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/AIDYN_Carte_Produit_-_Version_Claire.png"
                alt="AIDYN Product Card - Version Claire"
                className="w-full h-auto object-contain rounded-2xl shadow-xl"
              />
            </motion.div>

            {/* Product card - Version Sombre */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/AIDYN_Carte_Produit_-_Version_Sombre.png"
                alt="AIDYN Product Card - Version Sombre"
                className="w-full h-auto object-contain rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20 p-8 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl"
        >
          <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Projet sur mesure ?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Chaque business est unique. Contactez-nous pour discuter de vos besoins spécifiques
            et obtenir un devis personnalisé pour votre projet d'IA.
          </p>
          <a href="#contact" className="btn-primary">
            Demander un devis personnalisé
          </a>
        </motion.div>
      </div>
    </section>
  )
}