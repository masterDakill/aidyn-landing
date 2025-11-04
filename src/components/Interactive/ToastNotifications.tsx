'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  useState,
  useEffect,
  createContext,
  useContext,
  forwardRef,
  type ReactNode,
  type ComponentType
} from 'react'
import type { SVGProps } from 'react'
import {
  CheckCircle, AlertCircle, Info, X, Clock, Users, TrendingUp,
  Star, Phone, Calendar, Download
} from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertCircle
}

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
}

const ToastItem = forwardRef<HTMLDivElement, { toast: Toast, onRemove: () => void }>(function ToastItem({ toast, onRemove }, ref) {
  const [progress, setProgress] = useState(100)
  const duration = toast.duration || 5000
  const Icon = toast.icon || toastIcons[toast.type]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const decrement = 100 / (duration / 100 || 1)
        const newProgress = prev - decrement
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [duration])

  // When progress reaches 0, remove the toast in an effect (avoids setState during render)
  useEffect(() => {
    if (progress === 0) {
      const t = setTimeout(() => onRemove(), 0)
      return () => clearTimeout(t)
    }
    return
  }, [progress, onRemove])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative bg-white rounded-xl shadow-modern-xl border-2 p-4 max-w-md w-full overflow-hidden ${toastStyles[toast.type]}`}
    >
      {/* Progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 ${
          toast.type === 'success' ? 'bg-green-500' :
          toast.type === 'error' ? 'bg-red-500' :
          toast.type === 'info' ? 'bg-blue-500' :
          'bg-yellow-500'
        }`}
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />

      <div className="flex items-start gap-3">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`flex-shrink-0 w-6 h-6 ${
            toast.type === 'success' ? 'text-green-600' :
            toast.type === 'error' ? 'text-red-600' :
            toast.type === 'info' ? 'text-blue-600' :
            'text-yellow-600'
          }`}
        >
          <Icon className="w-full h-full" />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
          <p className="text-sm opacity-90 mt-1">{toast.message}</p>

          {/* Action button */}
          {toast.action && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={toast.action.onClick}
              className={`mt-2 text-xs font-medium underline hover:no-underline transition-all duration-200 ${
                toast.type === 'success' ? 'text-green-700 hover:text-green-800' :
                toast.type === 'error' ? 'text-red-700 hover:text-red-800' :
                toast.type === 'info' ? 'text-blue-700 hover:text-blue-800' :
                'text-yellow-700 hover:text-yellow-800'
              }`}
            >
              {toast.action.label}
            </motion.button>
          )}
        </div>

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRemove}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast = { ...toastData, id }
    setToasts(prev => [...prev, toast])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Auto-show engagement toasts
  useEffect(() => {
    const engagementToasts = [
      {
        type: 'info' as const,
        title: 'Nouveau visiteur détecté!',
        message: '👋 Bienvenue! Découvrez comment AIDYN peut transformer votre RPA.',
        icon: Users,
        duration: 6000,
        action: {
          label: 'Voir la démo',
          onClick: () => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })
        }
      },
      {
        type: 'success' as const,
        title: '⚡ Performance exceptionnelle',
        message: 'Nos clients voient 75% d’amélioration du temps de réponse!',
        icon: TrendingUp,
        duration: 5000,
        action: {
          label: 'Voir les stats',
          onClick: () => document.getElementById('live-stats')?.scrollIntoView({ behavior: 'smooth' })
        }
      },
      {
        type: 'info' as const,
        title: '🎯 Témoignage client',
        message: '“AIDYN a révolutionné notre approche des urgences” - Dr. Bouchard',
        icon: Star,
        duration: 7000,
        action: {
          label: 'Lire plus',
          onClick: () => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })
        }
      },
      {
        type: 'warning' as const,
        title: '⏰ Offre limitée',
        message: 'Consultation gratuite disponible ce mois-ci seulement!',
        icon: Clock,
        duration: 8000,
        action: {
          label: 'Réserver',
          onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    ]

    // Show first toast after 5 seconds
    const timer1 = setTimeout(() => {
      addToast(engagementToasts[0])
    }, 5000)

    // Show subsequent toasts at intervals
    const timer2 = setTimeout(() => {
      addToast(engagementToasts[1])
    }, 20000)

    const timer3 = setTimeout(() => {
      addToast(engagementToasts[2])
    }, 45000)

    const timer4 = setTimeout(() => {
      addToast(engagementToasts[3])
    }, 70000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onRemove={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

// Hook for triggering specific engagement toasts
export const useEngagementToasts = () => {
  const { addToast } = useToast()

  const showSuccessToast = (title: string, message: string, action?: Toast['action']) => {
    addToast({
      type: 'success',
      title,
      message,
      icon: CheckCircle,
      duration: 5000,
      action
    })
  }

  const showDemoToast = () => {
    addToast({
      type: 'info',
      title: '🎥 Démo interactive disponible',
      message: 'Testez notre simulateur RPA en temps réel!',
      icon: Calendar,
      duration: 6000,
      action: {
        label: 'Essayer maintenant',
        onClick: () => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  const showContactToast = () => {
    addToast({
      type: 'info',
      title: '📞 Expert disponible',
      message: 'Un sp��cialiste RPA peut vous aider dès maintenant!',
      icon: Phone,
      duration: 7000,
      action: {
        label: 'Contacter',
        onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  const showDownloadToast = () => {
    addToast({
      type: 'success',
      title: '📄 Documentation technique',
      message: 'Téléchargez notre guide complet des solutions RPA',
      icon: Download,
      duration: 6000,
      action: {
        label: 'Télécharger',
        onClick: () => window.open('/documents/guide-aidyn-rpa.pdf', '_blank')
      }
    })
  }

  return {
    showSuccessToast,
    showDemoToast,
    showContactToast,
    showDownloadToast
  }
}
