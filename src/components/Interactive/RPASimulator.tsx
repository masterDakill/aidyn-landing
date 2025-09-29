'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Phone, Clock, MapPin, User, AlertTriangle, CheckCircle,
  Activity, Wifi, Radio, Shield, Play, Pause, RotateCcw,
  Volume2, VolumeX, Settings, Monitor
} from 'lucide-react'

interface Alert {
  id: string
  timestamp: string
  room: string
  resident: string
  type: 'emergency' | 'assistance' | 'maintenance'
  status: 'pending' | 'acknowledged' | 'resolved'
  priority: 'high' | 'medium' | 'low'
  responseTime?: number
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    timestamp: '14:23:45',
    room: 'Chambre 204',
    resident: 'Mme Dubois',
    type: 'emergency',
    status: 'pending',
    priority: 'high'
  },
  {
    id: '2',
    timestamp: '14:18:12',
    room: 'Salon commun',
    resident: 'M. Tremblay',
    type: 'assistance',
    status: 'acknowledged',
    priority: 'medium',
    responseTime: 45
  },
  {
    id: '3',
    timestamp: '14:15:30',
    room: 'Chambre 312',
    resident: 'Mme Gagnon',
    type: 'maintenance',
    status: 'resolved',
    priority: 'low',
    responseTime: 120
  }
]

const statusColors = {
  pending: 'bg-red-500',
  acknowledged: 'bg-yellow-500',
  resolved: 'bg-green-500'
}

const priorityColors = {
  high: 'border-red-500 bg-red-50',
  medium: 'border-yellow-500 bg-yellow-50',
  low: 'border-green-500 bg-green-50'
}

function AlertCard({ alert, onStatusChange }: { alert: Alert, onStatusChange: (id: string, status: Alert['status']) => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`p-4 rounded-xl border-2 ${priorityColors[alert.priority]} transition-all duration-300 cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={alert.status === 'pending' ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 1, repeat: alert.status === 'pending' ? Infinity : 0 }}
            className={`w-3 h-3 rounded-full ${statusColors[alert.status]}`}
          />
          <span className="text-xs font-medium text-gray-500">{alert.timestamp}</span>
        </div>
        <motion.div
          animate={isHovered ? { rotate: 5 } : { rotate: 0 }}
        >
          {alert.type === 'emergency' && <AlertTriangle className="w-5 h-5 text-red-500" />}
          {alert.type === 'assistance' && <User className="w-5 h-5 text-yellow-500" />}
          {alert.type === 'maintenance' && <Settings className="w-5 h-5 text-blue-500" />}
        </motion.div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-gray-900">{alert.room}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{alert.resident}</span>
        </div>
        {alert.responseTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Résolu en {alert.responseTime}s</span>
          </div>
        )}
      </div>

      {alert.status === 'pending' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 flex gap-2"
        >
          <button
            onClick={() => onStatusChange(alert.id, 'acknowledged')}
            className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
          >
            Acquitter
          </button>
          <button
            onClick={() => onStatusChange(alert.id, 'resolved')}
            className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Résoudre
          </button>
        </motion.div>
      )}

      {alert.status === 'acknowledged' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4"
        >
          <button
            onClick={() => onStatusChange(alert.id, 'resolved')}
            className="w-full bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Marquer comme résolu
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

function SystemStatus() {
  const [systemHealth, setSystemHealth] = useState(98.7)

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev =>
        Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-xl p-6 shadow-modern-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Monitor className="w-5 h-5" />
        État du système
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Santé globale</span>
          <span className={`font-bold ${systemHealth > 99 ? 'text-green-600' : systemHealth > 97 ? 'text-yellow-600' : 'text-red-600'}`}>
            {systemHealth.toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${systemHealth > 99 ? 'bg-green-500' : systemHealth > 97 ? 'bg-yellow-500' : 'bg-red-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${systemHealth}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Wi-Fi</span>
            </div>
            <div className="text-green-600 font-semibold">Actif</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Radio className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">RF 433MHz</span>
            </div>
            <div className="text-green-600 font-semibold">Actif</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Sécurité</span>
            </div>
            <div className="text-green-600 font-semibold">OK</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Capteurs</span>
            </div>
            <div className="text-green-600 font-semibold">47/47</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RPASimulator() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [isPlaying, setIsPlaying] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [simulationSpeed, setSimulationSpeed] = useState(1)

  const handleStatusChange = (id: string, newStatus: Alert['status']) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id
          ? { ...alert, status: newStatus, responseTime: newStatus === 'resolved' ? Math.floor(Math.random() * 180) + 30 : alert.responseTime }
          : alert
      )
    )
  }

  const generateNewAlert = () => {
    const rooms = ['Chambre 101', 'Chambre 205', 'Salon commun', 'Chambre 312', 'Salle à manger']
    const residents = ['M. Martin', 'Mme Lavoie', 'M. Bouchard', 'Mme Pelletier', 'M. Côté']
    const types: Alert['type'][] = ['emergency', 'assistance', 'maintenance']
    const priorities: Alert['priority'][] = ['high', 'medium', 'low']

    const newAlert: Alert = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString('fr-CA', { hour12: false }),
      room: rooms[Math.floor(Math.random() * rooms.length)],
      resident: residents[Math.floor(Math.random() * residents.length)],
      type: types[Math.floor(Math.random() * types.length)],
      status: 'pending',
      priority: priorities[Math.floor(Math.random() * priorities.length)]
    }

    setAlerts(prev => [newAlert, ...prev.slice(0, 4)])
  }

  const resetSimulation = () => {
    setAlerts(mockAlerts)
    setIsPlaying(false)
  }

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      if (Math.random() < 0.3 / simulationSpeed) {
        generateNewAlert()
      }
    }, 2000 / simulationSpeed)

    return () => clearInterval(interval)
  }, [isPlaying, simulationSpeed])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <Phone className="w-4 h-4" />
            Démonstration Interactive
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simulateur <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">RPA en Action</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment notre système gère les appels d'urgence en temps réel dans un établissement RPA
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-modern-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contrôles de simulation</h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isPlaying
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Démarrer'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetSimulation}
                    className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-600">Vitesse</label>
                    <span className="text-sm font-medium">{simulationSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.5"
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    soundEnabled
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  Son {soundEnabled ? 'activé' : 'désactivé'}
                </button>

                <button
                  onClick={generateNewAlert}
                  className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Générer une alerte
                </button>
              </div>
            </div>

            <SystemStatus />
          </motion.div>

          {/* Alerts Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-6 shadow-modern-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Tableau de bord des alertes</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  Temps réel
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {alerts.map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </AnimatePresence>

                {alerts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-gray-500"
                  >
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>Aucune alerte active</p>
                    <p className="text-sm">Tous les résidents sont en sécurité</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}