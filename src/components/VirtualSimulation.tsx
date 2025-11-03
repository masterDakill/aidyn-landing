'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface VirtualPerson {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  type: 'resident' | 'staff' | 'visitor'
  name: string
  activity: string
  status: 'normal' | 'attention' | 'alert'
  size: number
  color: string
}

interface Detection {
  id: string
  x: number
  y: number
  width: number
  height: number
  label: 'resident' | 'staff' | 'visitor'
  confidence: number
  status: 'normal' | 'attention' | 'alert'
  name: string
  activity: string
}

interface VirtualSimulationProps {
  location: string
  width?: number
  height?: number
}

export default function VirtualSimulation({
  location,
  width = 800,
  height = 600
}: VirtualSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [peopleCount, setPeopleCount] = useState(3)
  const [people, setPeople] = useState<VirtualPerson[]>([])
  const [detections, setDetections] = useState<Detection[]>([])
  const [time, setTime] = useState(0)

  // Initialize virtual people
  const initializePeople = useCallback(() => {
    const types: Array<'resident' | 'staff' | 'visitor'> = ['resident', 'staff', 'visitor']
    const activities = [
      'Marche', 'Assis', 'Debout', 'Conversation', 'Lecture', 'Observation'
    ]
    const names = [
      'Résident A', 'Résident B', 'Résident C',
      'Personnel 1', 'Personnel 2',
      'Visiteur X', 'Visiteur Y'
    ]

    const newPeople: VirtualPerson[] = []
    for (let i = 0; i < peopleCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      const color = type === 'resident' ? '#3b82f6' : type === 'staff' ? '#10b981' : '#f59e0b'
      
      newPeople.push({
        id: `person-${i}`,
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        type,
        name: names[i % names.length],
        activity: activities[Math.floor(Math.random() * activities.length)],
        status: Math.random() > 0.9 ? 'attention' : 'normal',
        size: 25,
        color
      })
    }
    setPeople(newPeople)
  }, [peopleCount, width, height])

  useEffect(() => {
    initializePeople()
  }, [initializePeople])

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = '#1e293b'
      ctx.lineWidth = 1
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
        ctx.stroke()
      }
      for (let i = 0; i < height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(width, i)
        ctx.stroke()
      }

      // Draw room outline
      ctx.strokeStyle = '#334155'
      ctx.lineWidth = 3
      ctx.strokeRect(20, 20, width - 40, height - 40)

      // Update and draw people
      const newPeople = people.map(person => {
        let { x, y, vx, vy } = person

        // Update position
        x += vx * speed
        y += vy * speed

        // Bounce off walls
        if (x < 30 || x > width - 30) {
          vx = -vx
          x = Math.max(30, Math.min(width - 30, x))
        }
        if (y < 30 || y > height - 30) {
          vy = -vy
          y = Math.max(30, Math.min(height - 30, y))
        }

        // Occasionally change direction
        if (Math.random() < 0.01) {
          vx += (Math.random() - 0.5) * 0.5
          vy += (Math.random() - 0.5) * 0.5
          // Limit speed
          const maxSpeed = 2
          vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx))
          vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy))
        }

        // Occasionally change activity
        if (Math.random() < 0.005) {
          const activities = ['Marche', 'Assis', 'Debout', 'Conversation', 'Lecture']
          person.activity = activities[Math.floor(Math.random() * activities.length)]
        }

        // Occasionally change status
        if (Math.random() < 0.003) {
          const statuses: Array<'normal' | 'attention' | 'alert'> = ['normal', 'attention', 'alert']
          person.status = statuses[Math.floor(Math.random() * statuses.length)]
        }

        // Draw person (circle)
        ctx.beginPath()
        ctx.arc(x, y, person.size, 0, Math.PI * 2)
        ctx.fillStyle = person.color
        ctx.fill()
        
        // Draw status ring
        if (person.status !== 'normal') {
          ctx.strokeStyle = person.status === 'attention' ? '#f59e0b' : '#ef4444'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(x, y, person.size + 5, 0, Math.PI * 2)
          ctx.stroke()
        }

        // Draw direction indicator
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + vx * 10, y + vy * 10)
        ctx.stroke()

        return { ...person, x, y, vx, vy }
      })

      setPeople(newPeople)

      // Generate detections
      const newDetections: Detection[] = newPeople.map(person => ({
        id: person.id,
        x: (person.x / width) * 100,
        y: (person.y / height) * 100,
        width: (person.size * 2 / width) * 100,
        height: (person.size * 2 / height) * 100,
        label: person.type,
        confidence: 0.85 + Math.random() * 0.13,
        status: person.status,
        name: person.name,
        activity: person.activity
      }))
      setDetections(newDetections)

      // Draw scanline effect
      const scanlineY = (time * 2) % height
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, scanlineY)
      ctx.lineTo(width, scanlineY)
      ctx.stroke()

      setTime(t => t + 1)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, people, speed, width, height, time])

  const handleReset = () => {
    initializePeople()
    setTime(0)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full"
        style={{ aspectRatio: `${width}/${height}` }}
      />

      {/* Detection Overlays */}
      <div className="absolute inset-0">
        {detections.map(detection => (
          <div
            key={detection.id}
            className="absolute transition-all duration-100"
            style={{
              left: `${detection.x}%`,
              top: `${detection.y}%`,
              width: `${detection.width}%`,
              height: `${detection.height}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Bounding box */}
            <div
              className={`absolute inset-0 border-2 ${
                detection.status === 'alert'
                  ? 'border-red-500'
                  : detection.status === 'attention'
                  ? 'border-amber-500'
                  : 'border-cyan-500'
              }`}
            >
              {/* Corner markers */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => (
                <div
                  key={corner}
                  className={`absolute h-2 w-2 ${
                    detection.status === 'alert'
                      ? 'bg-red-500'
                      : detection.status === 'attention'
                      ? 'bg-amber-500'
                      : 'bg-cyan-500'
                  } ${
                    corner === 'top-left'
                      ? '-left-1 -top-1'
                      : corner === 'top-right'
                      ? '-right-1 -top-1'
                      : corner === 'bottom-left'
                      ? '-bottom-1 -left-1'
                      : '-bottom-1 -right-1'
                  }`}
                />
              ))}
            </div>

            {/* Info label */}
            <div
              className={`absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-1 text-xs font-semibold backdrop-blur-sm ${
                detection.status === 'alert'
                  ? 'bg-red-500/90 text-white'
                  : detection.status === 'attention'
                  ? 'bg-amber-500/90 text-white'
                  : 'bg-cyan-500/90 text-white'
              }`}
            >
              <div>{detection.name}</div>
              <div className="text-[10px] opacity-80">
                {(detection.confidence * 100).toFixed(1)}% • {detection.activity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Overlay */}
      <div className="absolute right-4 top-4 rounded-lg bg-slate-900/80 p-3 text-xs backdrop-blur-sm">
        <div className="mb-2 font-bold text-cyan-400">YOLOv8-Pose Virtuel</div>
        <div className="space-y-1 text-slate-300">
          <div>Détections: {detections.length}</div>
          <div>FPS: {60 * speed}</div>
          <div>Latence: {(5 / speed).toFixed(0)}ms</div>
          <div>Précision: 94.2%</div>
        </div>
      </div>

      {/* Location Label */}
      <div className="absolute left-4 top-4 rounded-lg bg-slate-900/80 px-3 py-2 text-sm font-semibold text-cyan-400 backdrop-blur-sm">
        📍 {location}
      </div>

      {/* Timestamp */}
      <div className="absolute bottom-4 left-4 font-mono text-xs text-slate-400">
        {new Date(Date.now() + time * 100).toLocaleTimeString('fr-CA', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="rounded-lg bg-slate-800/90 p-2 text-cyan-400 backdrop-blur-sm transition-colors hover:bg-slate-700"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          onClick={handleReset}
          className="rounded-lg bg-slate-800/90 p-2 text-cyan-400 backdrop-blur-sm transition-colors hover:bg-slate-700"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Settings Panel (optional) */}
      <div className="absolute left-4 bottom-4 flex gap-2">
        <div className="rounded-lg bg-slate-800/90 px-3 py-2 text-xs backdrop-blur-sm">
          <label className="flex items-center gap-2 text-slate-300">
            Vitesse: {speed}x
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={e => setSpeed(parseFloat(e.target.value))}
              className="w-20"
            />
          </label>
        </div>
        <div className="rounded-lg bg-slate-800/90 px-3 py-2 text-xs backdrop-blur-sm">
          <label className="flex items-center gap-2 text-slate-300">
            Personnes: {peopleCount}
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={peopleCount}
              onChange={e => {
                setPeopleCount(parseInt(e.target.value))
                handleReset()
              }}
              className="w-20"
            />
          </label>
        </div>
      </div>

      {/* Detection Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around border-t border-slate-700 bg-slate-900/90 px-4 py-2 text-xs backdrop-blur-sm">
        <div className="text-center">
          <div className="text-slate-400">Résidents</div>
          <div className="font-bold text-blue-400">
            {detections.filter(d => d.label === 'resident').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-slate-400">Personnel</div>
          <div className="font-bold text-green-400">
            {detections.filter(d => d.label === 'staff').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-slate-400">Visiteurs</div>
          <div className="font-bold text-amber-400">
            {detections.filter(d => d.label === 'visitor').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-slate-400">Alertes</div>
          <div className="font-bold text-red-400">
            {detections.filter(d => d.status === 'alert').length}
          </div>
        </div>
      </div>
    </div>
  )
}
