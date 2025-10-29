'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, type ComponentType } from 'react'
import type { SVGProps } from 'react'
import { Mail, X, ChevronUp, Zap, Bot } from 'lucide-react'

const NOTIFICATION_MESSAGES = [
  '🤖 Agent IA disponible: Posez vos questions sur AIDYN',
  '💡 Nouveau: Détection intelligente des chutes Phase 1',
  '⚡ Démo disponible: Voyez AIDYN en action',
  '📧 Contactez-nous: contact@aidyn.ai'
]

interface EngagementAction {
  id: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  description: string
  color: string
  href?: string
  onClick?: () => void
}

const engagementActions: EngagementAction[] = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    description: 'contact@aidyn.ai',
    color: 'from-emerald-500 to-teal-500',
    href: 'mailto:contact@aidyn.ai'
  },
  {
    id: 'chatbot',
    icon: Bot,
    label: 'Agent IA',
    description: 'Discutez avec notre assistant spécialisé',
    color: 'from-purple-500 to-pink-500',
    onClick: () => {
      // TODO: Intégrer votre chatbot IA ici
      console.log('Chatbot IA - bientôt disponible')
      // Pas d'alert() bloquant - utilise la notification existante
    }
  }
]

function FloatingButton({ action, index, isOpen, onClick }: {
  action: EngagementAction
  index: number
  isOpen: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isOpen ? 1 : 0,
        opacity: isOpen ? 1 : 0,
        y: isOpen ? -(index + 1) * 70 : 0
      }}
      transition={{
        delay: isOpen ? index * 0.1 : 0,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className="absolute bottom-0 right-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-modern-xl p-3 min-w-48 border border-gray-100"
            >
              <div className="font-semibold text-gray-900 text-sm">{action.label}</div>
              <div className="text-gray-600 text-xs mt-1">{action.description}</div>

              {/* Arrow */}
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white border-r border-b border-gray-100 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
        >
          <action.icon className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}

function ProgressIndicator() {
  const { scrollYProgress } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="absolute -inset-2">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-gray-200"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          className="text-emerald-500"
          style={{
            pathLength,
            strokeDasharray: "283", // 2 * π * 45
            strokeDashoffset: useTransform(pathLength, [0, 1], [283, 0])
          }}
        />
      </svg>
    </div>
  )
}

function NotificationBubble({ message, onClose }: { message: string, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="absolute bottom-20 right-0 bg-white rounded-xl shadow-modern-xl p-4 max-w-72 border border-gray-100"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
          <Bot className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export default function FloatingEngagement() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [visitTime, setVisitTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisitTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Show first notification after 10 seconds
    const initialTimer = setTimeout(() => {
      setNotificationMessage(NOTIFICATION_MESSAGES[0])
      setShowNotification(true)
    }, 10000)

    // Show subsequent notifications every 30 seconds
    const recurringTimer = setInterval(() => {
      const randomMessage = NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)]
      setNotificationMessage(randomMessage)
      setShowNotification(true)
    }, 30000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(recurringTimer)
    }
  }, [])

  const handleActionClick = (action: EngagementAction) => {
    if (action.href) {
      window.open(action.href, action.href.startsWith('tel:') || action.href.startsWith('mailto:') ? '_self' : '_blank')
      setNotificationMessage(`✅ ${action.label} ouvert!`)
    } else if (action.onClick) {
      action.onClick()
      // Message personnalisé pour Agent IA
      if (action.id === 'chatbot') {
        setNotificationMessage('🤖 Agent IA AIDYN bientôt disponible!\n\n📧 En attendant: contact@aidyn.ai')
      } else {
        setNotificationMessage(`✅ ${action.label} activé!`)
      }
    }

    setShowNotification(true)
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Notification */}
          <AnimatePresence>
            {showNotification && (
              <NotificationBubble
                message={notificationMessage}
                onClose={() => setShowNotification(false)}
              />
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          {engagementActions.map((action, index) => (
            <FloatingButton
              key={action.id}
              action={action}
              index={index}
              isOpen={isOpen}
              onClick={() => handleActionClick(action)}
            />
          ))}

          {/* Main Toggle Button */}
          <div className="relative">
            <ProgressIndicator />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-modern-xl hover:shadow-modern-2xl transition-all duration-300 flex items-center justify-center ${
                isOpen ? 'rotate-45' : ''
              }`}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-6 h-6" />
                </motion.div>
              )}

              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>

            {/* Visit time indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
              className="absolute -top-2 -left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium"
            >
              {Math.floor(visitTime / 60)}:{(visitTime % 60).toString().padStart(2, '0')}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background overlay when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Back to top button (appears after scrolling) */}
      <motion.button
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: visitTime > 30 ? 1 : 0,
          y: visitTime > 30 ? 0 : 100
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 w-12 h-12 bg-white text-gray-600 rounded-full shadow-modern-lg hover:shadow-modern-xl transition-all duration-300 flex items-center justify-center z-50 border border-gray-200"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </>
  )
}
