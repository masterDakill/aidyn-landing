'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Users, Calendar } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="section-padding gradient-bg">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              AIDYN Technologies
              <span className="text-gradient block">Sécurité RPA conçue à Québec</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nous développons des systèmes d’appel d’urgence intelligents taillés pour les résidences privées pour aînés du Québec.
              Notre équipe associe expertise terrain, conformité locale et savoir-faire IA pour livrer des solutions fiables et humaines.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Phase 1 – Système d’appel</h4>
                  <p className="text-gray-600">Boutons IP67, capteurs volumétriques et surveillance 24/7 livrés clé en main.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Conformité Québec</h4>
                  <p className="text-gray-600">Processus alignés sur les attentes MSSS, CNESST et certifications CE/RoHS.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Vision d’expansion</h4>
                  <p className="text-gray-600">Feuille de route IA avancée, assistant vocal et ouverture Ontario 2027.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                <CheckCircle className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-600">Phase 1</div>
                <div className="text-sm text-gray-600">Prête à déployer</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-600">RPA</div>
                <div className="text-sm text-gray-600">Expertise dédiée</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-600">24/7</div>
                <div className="text-sm text-gray-600">Support terrain</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/images/AIDYN_Badges_Confiance_-_Export.png"
                alt="AIDYN Badges de Confiance - Technologies fiables"
                width={640}
                height={640}
                className="w-full max-w-md h-auto object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl font-bold mb-4">MC</div>
                  <div className="text-xl">Mathieu Chamberland</div>
                  <div className="text-primary-200 mt-2">CEO & Fondateur AIDYN</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
