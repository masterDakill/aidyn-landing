'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Play, CheckCircle, ArrowRight, Clock, Users, Shield,
  Smartphone, Wifi, Settings, Phone, MapPin, BarChart3,
  Award, Sparkles, ChevronRight, ChevronDown, Info
} from 'lucide-react'

interface Step {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  duration: string
  details: string[]
  benefits: string[]
  color: string
}

const onboardingSteps: Step[] = [
  {
    id: 'consultation',
    title: 'Consultation Gratuite',
    description: 'Analyse personnalisée de vos besoins et de votre infrastructure',
    icon: Users,
    duration: '1-2 heures',
    details: [
      'Visite de votre établissement par nos experts',
      'Évaluation de l\'infrastructure existante',
      'Identification des points critiques',
      'Proposition de solution sur mesure'
    ],
    benefits: [
      'Consultation 100% gratuite',
      'Rapport détaillé inclus',
      'Devis personnalisé',
      'Recommandations d\'experts'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'planning',
    title: 'Planification Détaillée',
    description: 'Création du plan d\'installation personnalisé pour votre RPA',
    icon: MapPin,
    duration: '3-5 jours',
    details: [
      'Cartographie complète des zones',
      'Sélection optimale des points d\'installation',
      'Planification du réseau Wi-Fi et RF',
      'Calendrier d\'installation détaillé'
    ],
    benefits: [
      'Plan 3D interactif',
      'Zéro interruption de service',
      'Installation optimisée',
      'Documentation complète'
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'installation',
    title: 'Installation Professionnelle',
    description: 'Mise en place du système par nos techniciens certifiés',
    icon: Settings,
    duration: '1-2 jours',
    details: [
      'Installation des boutons étanches IP67',
      'Configuration du réseau Wi-Fi dédié',
      'Mise en place des répéteurs RF 433MHz',
      'Tests de couverture et de performance'
    ],
    benefits: [
      'Techniciens certifiés',
      'Matériel haute qualité',
      'Tests complets inclus',
      'Garantie installation'
    ],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'configuration',
    title: 'Configuration & Tests',
    description: 'Paramétrage du système et validation de tous les composants',
    icon: Smartphone,
    duration: '2-4 heures',
    details: [
      'Configuration du tableau de bord',
      'Paramétrage des alertes et notifications',
      'Tests de tous les boutons et capteurs',
      'Validation de la couverture réseau'
    ],
    benefits: [
      'Interface personnalisée',
      'Alertes configurées',
      'Performance optimisée',
      'Documentation système'
    ],
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'formation',
    title: 'Formation du Personnel',
    description: 'Formation complète de votre équipe sur l\'utilisation du système',
    icon: Award,
    duration: '2-3 heures',
    details: [
      'Formation pratique du personnel soignant',
      'Formation administrative pour les superviseurs',
      'Utilisation du tableau de bord',
      'Procédures d\'urgence et maintenance'
    ],
    benefits: [
      'Formation certifiée',
      'Matériel pédagogique fourni',
      'Support post-formation',
      'Certification du personnel'
    ],
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'support',
    title: 'Support Continu',
    description: 'Accompagnement et maintenance préventive 24/7',
    icon: Shield,
    duration: 'En continu',
    details: [
      'Support technique 24/7',
      'Maintenance préventive programmée',
      'Mises à jour automatiques',
      'Monitoring proactif du système'
    ],
    benefits: [
      'Support illimité',
      'SLA garantie 99.99%',
      'Maintenance incluse',
      'Évolutions gratuites'
    ],
    color: 'from-pink-500 to-rose-500'
  }
]

function StepCard({ step, index, isActive, isCompleted, onClick }: {
  step: Step
  index: number
  isActive: boolean
  isCompleted: boolean
  onClick: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsExpanded(isActive)
  }, [isActive])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative cursor-pointer ${isActive ? 'md:col-span-2' : ''}`}
    >
      <motion.div
        className={`bg-white rounded-2xl shadow-modern-lg border-2 transition-all duration-300 overflow-hidden ${
          isActive
            ? 'border-primary-500 shadow-modern-xl'
            : isCompleted
            ? 'border-green-500'
            : 'border-gray-200 hover:border-primary-300'
        }`}
        whileHover={!isActive ? { scale: 1.02, y: -5 } : {}}
        onClick={onClick}
      >
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Step number/icon */}
            <div className="relative">
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${step.color}`}
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </motion.div>

              {/* Step number */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {step.duration}
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{step.description}</p>

              {/* Progress indicator */}
              {isActive && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className={`h-1 bg-gradient-to-r ${step.color} rounded-full mt-4`}
                />
              )}
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100"
            >
              <div className="p-6 bg-gray-50">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Détails de l'étape
                    </h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <ChevronRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Avantages inclus
                    </h4>
                    <ul className="space-y-2">
                      {step.benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.2 }}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action button */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <Play className="w-4 h-4" />
                      Commencer cette étape
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function InteractiveOnboarding() {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [autoProgress, setAutoProgress] = useState(false)

  useEffect(() => {
    if (!autoProgress) return

    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = (prev + 1) % onboardingSteps.length
        if (prev < onboardingSteps.length - 1) {
          setCompletedSteps(current => [...current, prev])
        }
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [autoProgress])

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    setAutoProgress(false)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            Processus d'Implémentation
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Votre Parcours Vers <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">l'Excellence</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Découvrez notre processus d'implémentation étape par étape, conçu pour garantir le succès de votre projet RPA
          </p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Mode automatique</span>
              <button
                onClick={() => setAutoProgress(!autoProgress)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  autoProgress ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ x: autoProgress ? 24 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>

            <div className="text-sm text-gray-500">
              Étape {activeStep + 1} sur {onboardingSteps.length}
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <motion.div
              className="h-2 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((activeStep + 1) / onboardingSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Début</span>
            <span>Projet en cours</span>
            <span>Système opérationnel</span>
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onboardingSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isActive={index === activeStep}
              isCompleted={completedSteps.includes(index)}
              onClick={() => handleStepClick(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-modern-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à Commencer Votre Transformation ?
            </h3>
            <p className="text-gray-600 mb-6">
              Contactez-nous pour démarrer votre projet RPA dès aujourd'hui
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Planifier ma consultation gratuite
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}