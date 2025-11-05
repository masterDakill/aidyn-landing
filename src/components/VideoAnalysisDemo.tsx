/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps */
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  Activity,
  User,
  Clock,
  Maximize2
} from 'lucide-react'

// Types
interface Detection {
  id: string
  x: number // position x en pourcentage (0-100)
  y: number // position y en pourcentage (0-100)
  width: number // largeur en pourcentage
  height: number // hauteur en pourcentage
  label: 'resident' | 'staff' | 'visitor'
  confidence: number
  status: 'normal' | 'attention' | 'alert'
  name?: string
  activity?: string
}

interface VideoAnalysisDemoProps {
  videoUrl: string
  videoName: string
  location: string
  mockDetections?: Detection[]
}

export default function VideoAnalysisDemo({
  videoUrl,
  videoName,
  location,
  mockDetections
}: VideoAnalysisDemoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [detections, setDetections] = useState<Detection[]>([])
  const [showOverlay, setShowOverlay] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [privacyEnabled, setPrivacyEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  // Mock detections si non fourni
  const defaultDetections: Detection[] = [
    {
      id: '1',
      x: 35,
      y: 40,
      width: 12,
      height: 35,
      label: 'resident',
      confidence: 0.94,
      status: 'normal',
      name: 'Résident A',
      activity: 'Marche stable'
    },
    {
      id: '2',
      x: 65,
      y: 35,
      width: 10,
      height: 30,
      label: 'staff',
      confidence: 0.97,
      status: 'normal',
      name: 'Préposé B',
      activity: 'Assistance'
    }
  ]

  // Simulate detection updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        // Randomly update detections to simulate movement
        setDetections(prev => {
          return (mockDetections || defaultDetections).map(d => ({
            ...d,
            x: d.x + (Math.random() - 0.5) * 2,
            y: d.y + (Math.random() - 0.5) * 2,
            confidence: 0.85 + Math.random() * 0.15
          }))
        })
      }
    }, 500)

    return () => clearInterval(interval)
  }, [isPlaying, mockDetections])

  // Initialize detections
  useEffect(() => {
    setDetections(mockDetections || defaultDetections)
  }, [mockDetections])

  // Video control handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = (status: Detection['status']) => {
    switch (status) {
      case 'normal': return 'border-emerald-500 bg-emerald-500/10'
      case 'attention': return 'border-amber-500 bg-amber-500/10'
      case 'alert': return 'border-red-500 bg-red-500/10'
    }
  }

  const getLabelColor = (label: Detection['label']) => {
    switch (label) {
      case 'resident': return 'text-emerald-400'
      case 'staff': return 'text-blue-400'
      case 'visitor': return 'text-purple-400'
    }
  }

  const getLabelIcon = (label: Detection['label']) => {
    switch (label) {
      case 'resident': return '👤'
      case 'staff': return '👨‍⚕️'
      case 'visitor': return '👥'
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-white/10 bg-slate-900 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/50 px-4 py-3">
        <div>
          <h3 className="font-bold text-white">{videoName}</h3>
          <p className="text-sm text-slate-400">{location}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300">LIVE ANALYSIS</span>
          </div>
          
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
              showOverlay
                ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-600 bg-slate-700/50 text-slate-400'
            }`}
          >
            <Eye className="inline h-3 w-3 mr-1" />
            Overlay
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
        />

        {/* AI Detection Overlay */}
        {showOverlay && (
          <div className="pointer-events-none absolute inset-0">
            {/* Scan Line Effect */}
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Detection Boxes */}
            <AnimatePresence>
              {detections.map((detection) => (
                <motion.div
                  key={detection.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute"
                  style={{
                    left: `${detection.x}%`,
                    top: `${detection.y}%`,
                    width: `${detection.width}%`,
                    height: `${detection.height}%`
                  }}
                >
                  {/* Bounding Box */}
                  <div className={`h-full w-full rounded border-2 ${getStatusColor(detection.status)}`}>
                    {/* Corner markers */}
                    <div className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-cyan-400" />
                    <div className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-cyan-400" />
                    <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-cyan-400" />
                  </div>

                  {/* Info Label */}
                  <div className="pointer-events-auto absolute -top-14 left-0 min-w-[150px] rounded-lg border border-white/20 bg-slate-900/95 p-2 shadow-xl backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getLabelIcon(detection.label)}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs font-bold ${getLabelColor(detection.label)}`}>
                            {detection.name || detection.label.toUpperCase()}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {(detection.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        {detection.activity && (
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {detection.activity}
                          </p>
                        )}
                      </div>
                      
                      {/* Status Indicator */}
                      {detection.status === 'alert' && (
                        <AlertTriangle className="h-4 w-4 animate-pulse text-red-400" />
                      )}
                      {detection.status === 'normal' && (
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Stats Overlay - Top Right */}
            <div className="pointer-events-none absolute right-4 top-4 space-y-2">
              <div className="rounded-lg border border-white/20 bg-slate-900/90 p-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-white">
                    YOLOv8-Pose
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-slate-400">
                  {detections.length} détection{detections.length > 1 ? 's' : ''}
                </div>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-300">
                    {detections.filter(d => d.label === 'resident').length} Résidents
                  </span>
                </div>
              </div>

              {detections.some(d => d.status === 'alert') && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 animate-pulse text-red-400" />
                    <span className="text-xs font-semibold text-red-300">
                      Alerte détectée
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Timestamp - Top Left */}
            <div className="pointer-events-none absolute left-4 top-4">
              <div className="rounded-lg border border-white/20 bg-slate-900/90 px-3 py-1.5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-cyan-400" />
                  <span className="font-mono text-xs text-white">
                    {new Date().toLocaleTimeString('fr-CA')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Play Overlay */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 backdrop-blur-sm transition-all hover:bg-black/20"
            onClick={togglePlay}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-md"
            >
              <Play className="h-8 w-8 translate-x-0.5 text-white" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="border-t border-white/10 bg-slate-950/50 p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 transition-all hover:bg-cyan-500/20"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          <div className="flex-1">
            <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>

          <span className="font-mono text-sm text-slate-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-700/50 text-slate-300 transition-all hover:bg-slate-700"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>

        {/* Detection Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-white/10 bg-slate-800/50 p-2 text-center">
            <p className="text-xs text-slate-400">Précision</p>
            <p className="text-lg font-bold text-emerald-400">
              {detections.length > 0 
                ? (detections.reduce((acc, d) => acc + d.confidence, 0) / detections.length * 100).toFixed(0)
                : 0}%
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-800/50 p-2 text-center">
            <p className="text-xs text-slate-400">Latence</p>
            <p className="text-lg font-bold text-cyan-400">&lt;500ms</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-800/50 p-2 text-center">
            <p className="text-xs text-slate-400">FPS</p>
            <p className="text-lg font-bold text-purple-400">30</p>
          </div>
        </div>
      </div>
    </div>
  )
}
