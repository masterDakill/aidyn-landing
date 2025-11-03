'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import type { SVGProps } from 'react'
import { TrendingUp, Users, Clock, Shield, Zap, Phone } from 'lucide-react'

interface StatItem {
  id: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  value: number
  label: string
  prefix?: string
  suffix?: string
  color: string
  description: string
  trend: number
}

const statsData: StatItem[] = [
  {
    id: 'response-time',
    icon: Clock,
    value: 95,
    label: 'Réduction temps réponse',
    suffix: '%',
    color: 'from-green-400 to-emerald-500',
    description: 'Temps moyen < 2 secondes',
    trend: 12
  },
  {
    id: 'satisfaction',
    icon: Users,
    value: 99.8,
    label: 'Satisfaction clients',
    suffix: '%',
    color: 'from-blue-400 to-cyan-500',
    description: 'Score NPS: 87/100',
    trend: 8
  },
  {
    id: 'uptime',
    icon: Shield,
    value: 99.99,
    label: 'Disponibilité système',
    suffix: '%',
    color: 'from-purple-400 to-violet-500',
    description: 'SLA garanti 24/7',
    trend: 2
  },
  {
    id: 'installations',
    icon: Phone,
    value: 347,
    label: 'Installations actives',
    color: 'from-orange-400 to-red-500',
    description: 'À travers le Québec',
    trend: 23
  },
  {
    id: 'alerts',
    icon: Zap,
    value: 15672,
    label: 'Alertes traitées',
    color: 'from-yellow-400 to-orange-500',
    description: 'Ce mois-ci',
    trend: 31
  },
  {
    id: 'savings',
    icon: TrendingUp,
    value: 2.4,
    label: 'Économies moyennes',
    prefix: '$',
    suffix: 'M',
    color: 'from-indigo-400 to-blue-500',
    description: 'Par établissement/an',
    trend: 18
  }
]

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      // Courbe d'animation easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(value * easeProgress)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])

  const formatValue = (val: number) => {
    if (value >= 1000) {
      return val.toLocaleString('fr-CA', { maximumFractionDigits: 0 })
    }
    return val.toFixed(value < 10 ? 2 : value < 100 ? 1 : 0)
  }

  return (
    <span ref={ref} className="font-bold text-3xl">
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  )
}

function StatCard({ stat, index }: { stat: StatItem, index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-modern-xl hover:shadow-modern-2xl transition-all duration-300">
        {/* Gradient background on hover */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        {/* Icon with animated background */}
        <div className="relative mb-4">
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-lg`}
          >
            <stat.icon className="w-full h-full text-white" />
          </motion.div>

          {/* Trend indicator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
          >
            <TrendingUp className="w-3 h-3" />
            +{stat.trend}%
          </motion.div>
        </div>

        {/* Value */}
        <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
          <AnimatedCounter
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
        </div>

        {/* Label */}
        <h3 className="font-semibold text-gray-900 mb-2 text-lg">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm">
          {stat.description}
        </p>

        {/* Animated border */}
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          style={{
            background: `linear-gradient(45deg, transparent, transparent)`,
            borderImage: `linear-gradient(45deg, var(--tw-gradient-stops)) 1`
          }}
        />
      </div>
    </motion.div>
  )
}

export default function LiveStats() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4" />
            </motion.div>
            Statistiques en temps réel
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Performance <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Exceptionnelle</span>
          </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez l’impact mesurable de nos solutions RPA sur les établissements québécois
            </p>

          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mt-6 text-green-600"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <span className="text-sm font-medium">Données mises à jour en direct</span>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {statsData.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 bg-white text-primary-600 border-2 border-primary-200 px-6 py-3 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <motion.div
              animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: "linear" }}
            >
              <TrendingUp className="w-4 h-4" />
            </motion.div>
            {refreshing ? 'Actualisation...' : 'Actualiser les données'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}