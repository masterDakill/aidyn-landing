'use client'

import { motion } from 'framer-motion'
import {
  FileText,
  Award,
  Users,
  Heart,
  Lightbulb,
  CheckCircle,
  Download,
  Phone,
  Calendar,
  DollarSign,
  Flag,
  Zap
} from 'lucide-react'

const grantTypes = [
  {
    icon: Heart,
    title: 'Santé et Services sociaux',
    description: 'Programmes d\'innovation pour l\'amélioration des soins en RPA',
    amount: 'Jusqu\'à 150 000$'
  },
  {
    icon: Lightbulb,
    title: 'Innovation technologique',
    description: 'Soutien aux solutions IA et IoT dans le secteur de la santé',
    amount: 'Jusqu\'à 100 000$'
  },
  {
    icon: Users,
    title: 'Amélioration des conditions',
    description: 'Financement pour la sécurité et le bien-être des résidents',
    amount: 'Jusqu\'à 75 000$'
  }
]

const supportServices = [
  {
    icon: FileText,
    title: 'Préparation complète du dossier',
    description: 'Rédaction professionnelle et documentation technique détaillée'
  },
  {
    icon: Users,
    title: 'Intégration technique',
    description: 'Accompagnement de A à Z pour l\'implémentation'
  },
  {
    icon: Award,
    title: 'Évaluation post-déploiement',
    description: 'Mesure des résultats et rapport d\'impact'
  }
]

export default function Grants() {
  return (
    <section id="grants" className="section-padding bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Flag className="w-4 h-4" />
            🇨🇦 Subventions Québec/Canada
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Financement pour votre
            <span className="text-gradient block">projet d'innovation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Profitez des programmes gouvernementaux dédiés à l'innovation en santé
            et aux technologies d'assistance pour financer votre déploiement AIDYN.
          </p>
        </motion.div>

        {/* Grant Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {grantTypes.map((grant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <grant.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{grant.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{grant.description}</p>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                <DollarSign className="w-4 h-4" />
                {grant.amount}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              Dossier de subvention clé-en-main
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre équipe prépare un dossier complet adapté aux exigences québécoises
              pour maximiser vos chances d'obtention.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.a
              href="/documents/dossier-subvention-aidyn.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center bg-gradient-to-r from-primary-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger le dossier (PDF)
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="w-5 h-5 ml-2" />
              </motion.div>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center bg-white border-2 border-primary-300 text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Nous contacter
            </motion.a>
          </div>

          <div className="text-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 inline mr-1" />
            Prochaine date limite de soumission : 30 novembre 2024
          </div>
        </motion.div>

        {/* Support Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Support complet inclus
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="flex items-center mt-3 text-primary-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Inclus dans l'offre</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}