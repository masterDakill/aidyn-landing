'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Zap, TrendingUp, ChevronDown, Sparkles, ArrowRight, Droplets, Wifi, Radio, BarChart3, Network } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-primary-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 border-2 border-primary-300 rotate-45 opacity-40"
          animate={{
            rotate: [45, 225, 45],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-8 h-8 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full opacity-50"
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dynamic blur orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-200/40 to-blue-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 0.9, 1],
            x: [0, 50, -30, 0],
            y: [0, -30, 20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-l from-indigo-300/30 to-primary-200/40 rounded-full blur-3xl"
          animate={{
            scale: [0.8, 1.2, 1, 0.8],
            x: [0, -40, 60, 0],
            y: [0, 40, -20, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <motion.div
        style={{ y: mounted ? y : 0, opacity: mounted ? opacity : 1 }}
        className="relative container-max section-padding text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Enhanced Badge with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200/50 text-primary-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-4 h-4" />
            </motion.div>
            <Sparkles className="w-3 h-3 opacity-60" />
            Phase 1 - Solution RPA Québec
          </motion.div>

          {/* Enhanced main headline with staggered animation */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] mb-8 tracking-tight"
          >
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="block text-gray-900"
            >
              Système d'appel intelligent
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="block bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold"
            >
              et gestion des urgences
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="block text-gray-900"
            >
              pour RPA (Québec)
            </motion.span>
          </motion.h1>

          {/* Enhanced subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-4xl mx-auto font-medium space-y-2"
          >
            <p>
              <strong>Boutons étanches IP67</strong>, double connectivité Wi-Fi + RF 433 MHz, et tableau de bord en temps réel.
            </p>
            <p>
              <span className="text-primary-600 font-semibold">Réduisez les délais d'intervention et renforcez la sécurité</span> des résidents dès la Phase 1.
            </p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="#contact" className="group relative inline-flex items-center bg-gradient-to-r from-primary-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-700 to-blue-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Planifier une démo
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.div>
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="#grants" className="group inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:text-blue-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20">
                <TrendingUp className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Dossier de subvention Québec
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-2 opacity-60"
                >
                  🇨🇦
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Preuve technique rapide (icônes) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-16 max-w-4xl mx-auto"
          >
            {[
              { icon: Droplets, label: "IP67 Étanche", color: "text-blue-600" },
              { icon: Wifi, label: "Wi-Fi", color: "text-green-600" },
              { icon: Radio, label: "RF 433 MHz", color: "text-purple-600" },
              { icon: BarChart3, label: "Dashboard 24/7", color: "text-orange-600" },
              { icon: Network, label: "VLAN/QoS", color: "text-red-600" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-modern hover:shadow-modern-lg transition-all duration-300"
              >
                <item.icon className={`w-8 h-8 ${item.color} mb-2`} />
                <span className="text-sm font-semibold text-gray-700 text-center">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Stats with better animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
          >
            {[
              { value: "75%", label: "Réduction temps de réponse", delay: 0.1 },
              { value: "99.9%", label: "Disponibilité système", delay: 0.2 },
              { value: "24/7", label: "Surveillance automatique", delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.9 + stat.delay, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-modern-lg hover:shadow-modern-xl shadow-glow-hover transition-all duration-300"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-3"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <img
                src="/images/Section_SerenaCare_AIDYN.png"
                alt="SerenaCare - Système d'appel intelligent pour RPA Québec"
                className="w-full h-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/10 to-transparent rounded-3xl"></div>
            </div>

            {/* Floating elements around the image */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/30"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Système en ligne</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/30"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Surveillance 24/7</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Link href="#features" className="group flex flex-col items-center text-gray-500 hover:text-primary-600 transition-all duration-300">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 group-hover:border-primary-300/50 group-hover:bg-primary-50/80 transition-all duration-300"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
            <span className="text-sm mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Découvrir</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}