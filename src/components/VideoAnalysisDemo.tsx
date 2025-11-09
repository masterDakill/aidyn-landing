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

// Type augmentations for external APIs
interface FaceDetectorConstructor {
  new (options?: { fastMode?: boolean; maxDetectedFaces?: number }): FaceDetector
}

interface FaceDetector {
  detect(image: HTMLVideoElement): Promise<DetectedFace[]>
}

interface DetectedFace {
  boundingBox: { x: number; y: number; width: number; height: number }
  score?: number
}

interface MediaPipeResults {
  detections: MediaPipeFace[]
}

interface MediaPipeFace {
  boundingBox?: {
    topLeft?: number[]
    bottomRight?: number[]
    x?: number
    y?: number
    width?: number
    height?: number
    xCenter?: number
    yCenter?: number
  }
  box?: { x?: number; y?: number; width?: number; height?: number; xCenter?: number; yCenter?: number }
  score?: number
}

interface BlazeFaceDetection {
  topLeft: number[]
  bottomRight: number[]
  probability?: number[]
}

interface DetectorRef {
  type: 'mediapipe' | 'blazeface'
  detector?: { onResults: (callback: (results: MediaPipeResults) => void) => void; send: (data: { image: HTMLVideoElement }) => void }
  model?: { estimateFaces: (video: HTMLVideoElement, returnTensors: boolean) => Promise<BlazeFaceDetection[]> }
}

declare global {
  interface Window {
    FaceDetector?: FaceDetectorConstructor
    FaceDetection?: new (...args: unknown[]) => { onResults: (callback: (results: MediaPipeResults) => void) => void; send: (data: { image: HTMLVideoElement }) => void; setOptions: (options: unknown) => void }
    tf?: {
      setBackend: (backend: string) => Promise<void>
    }
    blazeface?: { load: () => Promise<DetectorRef['model']> }
    tfjsBlazeface?: { load: () => Promise<DetectorRef['model']> }
  }
  interface Navigator {
    hardwareConcurrency?: number
  }
  interface CanvasRenderingContext2D {
    filter?: string
  }
}

// Types
interface Detection {
  id: string
  x: number // position x en pourcentage (0-100)
  y: number // position y en pourcentage (0-100)
  width: number // largeur en pourcentage
  height: number // hauteur en pourcentage
  label: 'resident' | 'staff' | 'visitor' | 'face'
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
  const [privacyEnabled, setPrivacyEnabled] = useState(true)
  const [privacyToggleDisabled, setPrivacyToggleDisabled] = useState(false)
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

  // Privacy: initialize detector and draw blurred regions over detected boxes (lazy)
  const detectorRef = useRef<DetectorRef | FaceDetector | null>(null)
  const detectionIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    let mounted = true
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d') || null
    let videoW = 0
    let videoH = 0

    async function initDetector() {
      // Prefer native FaceDetector API if available
      if (window.FaceDetector) {
        try {
          detectorRef.current = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 10 })
          // eslint-disable-next-line no-console
          console.info('Using native FaceDetector API')
          return
        } catch (e) {
          // continue to fallback
        }
      }

      // Next prefer MediaPipe FaceDetection UMD from CDN (lightweight, fast)
      try {
        const loadScript = (src:string) => new Promise<void>((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) return resolve()
          const s = document.createElement('script')
          s.src = src
          s.async = true
          s.onload = () => resolve()
          s.onerror = () => reject(new Error(`Failed to load script ${src}`))
          document.head.appendChild(s)
        })

        // Load MediaPipe FaceDetection UMD
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js')
        // face_detection exposes window.FaceDetection
        const MPFace = window.FaceDetection
        if (MPFace) {
          const detector = new MPFace({
            locateFile: (file:string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
          })
          detector.setOptions({
            model: 'short',
            minDetectionConfidence: 0.5
          })

          // attach onResults to update detections
          detector.onResults((results: MediaPipeResults) => {
            if (!results || !results.detections) return
            const mapped = results.detections.map((f: MediaPipeFace, i: number) => {
              const box = f.boundingBox || f.box || {x:0,y:0,width:0,height:0}
              // MediaPipe provides normalized coordinates sometimes
              const xPx = (box.x || box.xCenter || 0) * (videoRef.current?.videoWidth || 1)
              const yPx = (box.y || box.yCenter || 0) * (videoRef.current?.videoHeight || 1)
              const wPx = (box.width || (box.x || 0)) * (videoRef.current?.videoWidth || 1)
              const hPx = (box.height || (box.y || 0)) * (videoRef.current?.videoHeight || 1)

              // If boundingBox has topLeft and bottomRight
              if (f.boundingBox && f.boundingBox.topLeft && f.boundingBox.bottomRight) {
                const tl = f.boundingBox.topLeft
                const br = f.boundingBox.bottomRight
                const xp = tl[0]
                const yp = tl[1]
                const wp = br[0] - tl[0]
                const hp = br[1] - tl[1]
                return {
                  id: `mp-${i}`,
                  x: (xp / (videoRef.current?.videoWidth || 1)) * 100,
                  y: (yp / (videoRef.current?.videoHeight || 1)) * 100,
                  width: (wp / (videoRef.current?.videoWidth || 1)) * 100,
                  height: (hp / (videoRef.current?.videoHeight || 1)) * 100,
                  label: 'face' as const,
                  confidence: f.score || 0.9,
                  status: 'normal' as const
                }
              }

              return {
                id: `mp-${i}`,
                x: (xPx / (videoRef.current?.videoWidth || 1)) * 100,
                y: (yPx / (videoRef.current?.videoHeight || 1)) * 100,
                width: (wPx / (videoRef.current?.videoWidth || 1)) * 100,
                height: (hPx / (videoRef.current?.videoHeight || 1)) * 100,
                label: 'face' as const,
                confidence: f.score || 0.9,
                status: 'normal' as const
              }
            })
            setDetections(mapped)
          })

          detectorRef.current = { type: 'mediapipe', detector }
          // eslint-disable-next-line no-console
          console.info('Loaded MediaPipe FaceDetection (UMD)')
          return
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('MediaPipe load failed, falling back', e)
      }

      // Fallback: try loading BlazeFace and tfjs via script tags (CDN UMD builds)
      try {
        const loadScript = (src:string) => new Promise<void>((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) return resolve()
          const s = document.createElement('script')
          s.src = src
          s.async = true
          s.onload = () => resolve()
          s.onerror = () => reject(new Error(`Failed to load script ${src}`))
          document.head.appendChild(s)
        })

        // Load tfjs and backend then blazeface UMD builds
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.9.0/dist/tf.min.js')
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.9.0/dist/tf-backend-webgl.js')
        // set backend if available
        if (window.tf?.setBackend) {
          try { await window.tf.setBackend('webgl') } catch (e) { /* ignore */ }
        }
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/blazeface@0.0.7/dist/blazeface.js')

        // Access global blazeface loader
        const globalBlaze = window.blazeface || window.tfjsBlazeface || null
        if (globalBlaze && typeof globalBlaze.load === 'function') {
          const model = await globalBlaze.load()
          detectorRef.current = { type: 'blazeface', model }
          // eslint-disable-next-line no-console
          console.info('Loaded BlazeFace (UMD) fallback')
          return
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('BlazeFace script load failed, fallback to no detector', e)
      }

      // Final fallback: no detector
      detectorRef.current = null
    }

    function resizeCanvas() {
      if (!canvas || !videoRef.current) return
      const rect = videoRef.current.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width))
      canvas.height = Math.max(1, Math.floor(rect.height))
      videoW = videoRef.current.videoWidth || canvas.width
      videoH = videoRef.current.videoHeight || canvas.height
    }

    async function runDetection() {
      if (!detectorRef.current || !videoRef.current) return
      try {
        if (window.FaceDetector && detectorRef.current instanceof window.FaceDetector) {
          const faces = await detectorRef.current.detect(videoRef.current)
          // Map to detections state
          const mapped = faces.map((f: DetectedFace, i: number) => {
            const box = f.boundingBox
            return {
              id: `det-${i}`,
              x: (box.x / (videoRef.current?.videoWidth || 1)) * 100,
              y: (box.y / (videoRef.current?.videoHeight || 1)) * 100,
              width: (box.width / (videoRef.current?.videoWidth || 1)) * 100,
              height: (box.height / (videoRef.current?.videoHeight || 1)) * 100,
              label: 'face' as const,
              confidence: f.score || 0.9,
              status: 'normal' as const
            }
          })
          if (mounted) setDetections(mapped)
        } else if (typeof detectorRef.current === 'object' && detectorRef.current !== null && 'type' in detectorRef.current && detectorRef.current.type === 'blazeface' && detectorRef.current.model) {
          const res = await detectorRef.current.model.estimateFaces(videoRef.current, false)
          const mapped = res.map((r: BlazeFaceDetection, i: number) => {
            const topLeft = r.topLeft
            const bottomRight = r.bottomRight
            const xPx = topLeft[0]
            const yPx = topLeft[1]
            const wPx = bottomRight[0] - topLeft[0]
            const hPx = bottomRight[1] - topLeft[1]
            return {
              id: `bf-${i}`,
              x: (xPx / (videoRef.current?.videoWidth || 1)) * 100,
              y: (yPx / (videoRef.current?.videoHeight || 1)) * 100,
              width: (wPx / (videoRef.current?.videoWidth || 1)) * 100,
              height: (hPx / (videoRef.current?.videoHeight || 1)) * 100,
              label: 'face' as const,
              confidence: (r.probability && r.probability[0]) || 0.9,
              status: 'normal' as const
            }
          })
          if (mounted) setDetections(mapped)
        }
      } catch (e) {
        // ignore
      }
    }

    function draw() {
      if (!mounted || !canvas || !ctx || !videoRef.current) return
      // only draw when playing
      if (!isPlaying || !privacyEnabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      resizeCanvas()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // For each detection, clip region and draw blurred video frame (ellipse for faces)
      detections.forEach((d) => {
        const x = (d.x / 100) * canvas.width
        const y = (d.y / 100) * canvas.height
        const w = (d.width / 100) * canvas.width
        const h = (d.height / 100) * canvas.height

        const padX = Math.max(8, w * 0.14)
        const padY = Math.max(8, h * 0.18)

        // center and radii
        const cx = x + w / 2
        const cy = y + h / 2
        const rx = Math.max(12, w / 2 + padX)
        const ry = Math.max(12, h / 2 + padY)

        ctx.save()
        ctx.beginPath()
        // ellipse clip gives a natural face-shaped mask
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        ctx.clip()
        try {
          ctx.filter = 'blur(10px)'
        } catch (e) {
          // ignore if filter not supported
        }
        try {
          // draw full video scaled to canvas (clipped will keep region)
          ctx.drawImage(videoRef.current as HTMLVideoElement, 0, 0, videoW, videoH, 0, 0, canvas.width, canvas.height)
        } catch (e) {
          // ignore draw errors
        }
        ctx.restore()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    // When privacy enabled, initialize detector and start loops
    if (privacyEnabled) {
      // low-end guard
      const cores = navigator.hardwareConcurrency || 4
      if (cores <= 2) {
        // avoid enabling on very low-end devices
        setPrivacyEnabled(false)
        return
      }

      initDetector().then(() => {
        // detection interval (200-400ms)
        detectionIntervalRef.current = window.setInterval(() => {
          void runDetection()
        }, 300)

        // start drawing loop lazily
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => {
            rafRef.current = requestAnimationFrame(draw)
          })
        } else {
          rafRef.current = requestAnimationFrame(draw)
        }
      })
    } else {
      // stop loops
      if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height)
      detectorRef.current = null
      setDetections(mockDetections || defaultDetections)
    }

    return () => {
      mounted = false
      if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      detectorRef.current = null
    }
  }, [privacyEnabled, detections, isPlaying])

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

          {/* Privacy toggle - enabled by default with debounce */}
          <button
            onClick={() => {
              if (privacyToggleDisabled) return
              setPrivacyToggleDisabled(true)
              setPrivacyEnabled(v => !v)
              setTimeout(() => setPrivacyToggleDisabled(false), 800)
            }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
              privacyEnabled
                ? 'border-pink-500/30 bg-pink-500/10 text-pink-300'
                : 'border-slate-600 bg-slate-700/50 text-slate-400'
            }`}
            title="Activer le floutage des visages (privacy)"
          >
            🔒 Privacy
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

        {/* Privacy Canvas Overlay (for face blur) */}
        <canvas
          ref={(el) => { canvasRef.current = el }}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ display: privacyEnabled ? 'block' : 'none' }}
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

            {/* Detection Boxes (hidden when privacy blur active) */}
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
                  {/* Bounding Box (only show when privacy not enabled) */}
                  {!privacyEnabled && (
                    <div className={`h-full w-full rounded border-2 ${getStatusColor(detection.status)}`}>
                      {/* Corner markers */}
                      <div className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-cyan-400" />
                      <div className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-cyan-400" />
                      <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-cyan-400" />
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-cyan-400" />
                    </div>
                  )}

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
