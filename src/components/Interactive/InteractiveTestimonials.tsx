'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  Star, Quote, ChevronLeft, ChevronRight, MapPin, Clock,
  Award, TrendingUp, Users, Heart, Shield, Zap
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  location: string
  avatar: string
  rating: number
  quote: string
  results: {
    metric: string
    value: string
    improvement: string
  }[]
  tags: string[]
  videoUrl?: string
  caseStudyUrl?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Marie Bouchard',
    role: 'Directrice des soins',
    company: 'CHSLD Les Érables',
    location: 'Québec, QC',
    avatar: '👩‍⚕️',
    rating: 5,
    quote: "AIDYN a transformé notre approche des urgences. Le temps de réponse est passé de 8 minutes à moins de 2 minutes. C'est révolutionnaire pour la sécurité de nos résidents.",
    results: [
      { metric: 'Temps de réponse', value: '1.8 min', improvement: '-75%' },
      { metric: 'Satisfaction', value: '98%', improvement: '+23%' },
      { metric: 'Incidents', value: '12/mois', improvement: '-67%' }
    ],
    tags: ['Sécurité', 'Urgences', 'Innovation']
  },
  {
    id: '2',
    name: 'Jean-François Tremblay',
    role: 'Directeur général',
    company: 'Résidence du Soleil',
    location: 'Sherbrooke, QC',
    avatar: '👨‍💼',
    rating: 5,
    quote: "L'investissement s'est amorti en 8 mois. Les économies sur les coûts opérationnels et l'amélioration de la qualité de service sont remarquables.",
    results: [
      { metric: 'ROI', value: '340%', improvement: '+240%' },
      { metric: 'Coûts', value: '-$280K', improvement: '-32%' },
      { metric: 'Efficacité', value: '94%', improvement: '+41%' }
    ],
    tags: ['ROI', 'Efficacité', 'Économies']
  },
  {
    id: '3',
    name: 'Sylvie Gagnon',
    role: 'Infirmière chef',
    company: 'CHSLD Sainte-Anne',
    location: 'Trois-Rivières, QC',
    avatar: '👩‍⚕️',
    rating: 5,
    quote: "Le personnel adore la simplicité du système. Plus de confusion, plus de fausses alarmes. Nous pouvons nous concentrer sur ce qui compte vraiment : nos patients.",
    results: [
      { metric: 'Fausses alarmes', value: '3%', improvement: '-89%' },
      { metric: 'Formation', value: '2h', improvement: '-83%' },
      { metric: 'Satisfaction staff', value: '96%', improvement: '+34%' }
    ],
    tags: ['Formation', 'Simplicité', 'Personnel']
  },
  {
    id: '4',
    name: 'Michel Lafond',
    role: 'Administrateur',
    company: 'Villa des Pins',
    location: 'Gatineau, QC',
    avatar: '👨‍💼',
    rating: 5,
    quote: "La conformité réglementaire automatique nous fait économiser des heures chaque semaine. Les rapports sont générés automatiquement et envoyés aux autorités.",
    results: [
      { metric: 'Conformité', value: '100%', improvement: '+100%' },
      { metric: 'Rapports auto', value: '47/sem', improvement: 'Nouveau' },
      { metric: 'Temps admin', value: '-12h/sem', improvement: '-71%' }
    ],
    tags: ['Conformité', 'Automatisation', 'Rapports']
  }
]

const metrics = [
  { icon: Clock, label: 'Temps de réponse moyen', value: '1.9 min', color: 'text-blue-500' },
  { icon: TrendingUp, label: 'Amélioration ROI', value: '+285%', color: 'text-green-500' },
  { icon: Users, label: 'Résidents protégés', value: '2,847', color: 'text-purple-500' },
  { icon: Shield, label: 'Incidents évités', value: '1,234', color: 'text-orange-500' }
]

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial, isActive: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        className="relative w-full h-96 cursor-pointer"
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-white rounded-2xl p-8 h-full shadow-modern-xl border border-gray-100 flex flex-col">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl bg-gradient-to-br from-primary-400 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                {testimonial.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                <p className="text-primary-600 font-medium">{testimonial.role}</p>
                <p className="text-gray-600 text-sm">{testimonial.company}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500 text-xs">{testimonial.location}</span>
                </div>
              </div>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="flex-1 relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-200" />
              <p className="text-gray-700 leading-relaxed italic pl-6">
                "{testimonial.quote}"
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {testimonial.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Flip indicator */}
            <div className="text-center mt-4">
              <span className="text-xs text-gray-400">Cliquez pour voir les résultats</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl p-8 h-full shadow-modern-xl text-white flex flex-col">
            <div className="text-center mb-6">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <h3 className="text-xl font-bold">Résultats Mesurables</h3>
              <p className="text-primary-100 text-sm">{testimonial.company}</p>
            </div>

            <div className="flex-1 space-y-4">
              {testimonial.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-100">{result.metric}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      result.improvement.includes('+') ? 'bg-green-500/20 text-green-100' :
                      result.improvement.includes('-') && !result.improvement.includes('$') ? 'bg-red-500/20 text-red-100' :
                      result.improvement.includes('-$') ? 'bg-green-500/20 text-green-100' :
                      'bg-blue-500/20 text-blue-100'
                    }`}>
                      {result.improvement}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{result.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-4">
              <span className="text-xs text-primary-100">Cliquez pour revenir</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function InteractiveTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <Heart className="w-4 h-4" />
            Témoignages Clients
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ils Nous Font <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Confiance</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment nos solutions RPA transforment la vie quotidienne dans les établissements québécois
          </p>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 text-center shadow-modern-lg hover:shadow-modern-xl transition-all duration-300"
            >
              <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-gray-600 text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-primary-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-primary-600"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Auto-play</span>
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  autoPlay ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ x: autoPlay ? 24 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: index === currentIndex ? 1.02 : 1
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${index === currentIndex ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === currentIndex}
                />
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}