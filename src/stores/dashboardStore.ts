import { create } from 'zustand'

// Types
export interface Resident {
  id: string
  name: string
  position: [number, number, number] // x, y, z
  status: 'safe' | 'alert' | 'incident'
  room: string
}

export interface Staff {
  id: string
  name: string
  position: [number, number, number]
  role: 'nurse' | 'caregiver' | 'security'
}

export interface Incident {
  id: string
  residentId: string
  timestamp: number
  position: [number, number, number]
  type: 'fall' | 'near-miss' | 'assistance'
  severity: 'low' | 'medium' | 'high'
}

export interface HeatmapData {
  position: [number, number, number]
  intensity: number // 0-1
  count: number
}

interface DashboardState {
  // Data
  residents: Resident[]
  staff: Staff[]
  incidents: Incident[]
  heatmap: HeatmapData[]
  
  // UI State
  selectedResident: string | null
  currentTime: number
  isPlaying: boolean
  showHeatmap: boolean
  cameraMode: 'free' | 'follow' | 'overview'
  
  // Actions
  setResidents: (residents: Resident[]) => void
  setStaff: (staff: Staff[]) => void
  addIncident: (incident: Incident) => void
  setSelectedResident: (id: string | null) => void
  setCurrentTime: (time: number) => void
  togglePlayback: () => void
  toggleHeatmap: () => void
  setCameraMode: (mode: 'free' | 'follow' | 'overview') => void
}

// Mock data generator
const generateMockResidents = (): Resident[] => [
  { id: '1', name: 'Marie L.', position: [2, 0.1, 3], status: 'safe', room: '101' },
  { id: '2', name: 'Jean D.', position: [-3, 0.1, 1], status: 'safe', room: '102' },
  { id: '3', name: 'Claire M.', position: [4, 0.1, -2], status: 'alert', room: '103' },
  { id: '4', name: 'Pierre R.', position: [-1, 0.1, -4], status: 'safe', room: '104' },
]

const generateMockStaff = (): Staff[] => [
  { id: 's1', name: 'Infirmière A', position: [0, 0.1, 0], role: 'nurse' },
  { id: 's2', name: 'Préposé B', position: [-4, 0.1, -3], role: 'caregiver' },
]

const generateMockHeatmap = (): HeatmapData[] => [
  { position: [2, 0.05, 3], intensity: 0.8, count: 12 },
  { position: [-3, 0.05, 1], intensity: 0.5, count: 6 },
  { position: [1, 0.05, -1], intensity: 0.9, count: 15 },
  { position: [4, 0.05, -2], intensity: 0.6, count: 8 },
  { position: [-2, 0.05, 4], intensity: 0.4, count: 4 },
]

// Create store
export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state
  residents: generateMockResidents(),
  staff: generateMockStaff(),
  incidents: [],
  heatmap: generateMockHeatmap(),
  selectedResident: null,
  currentTime: 0,
  isPlaying: false,
  showHeatmap: true,
  cameraMode: 'overview',
  
  // Actions
  setResidents: (residents) => set({ residents }),
  setStaff: (staff) => set({ staff }),
  addIncident: (incident) => set((state) => ({ 
    incidents: [...state.incidents, incident] 
  })),
  setSelectedResident: (id) => set({ selectedResident: id }),
  setCurrentTime: (time) => set({ currentTime: time }),
  togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleHeatmap: () => set((state) => ({ showHeatmap: !state.showHeatmap })),
  setCameraMode: (mode) => set({ cameraMode: mode }),
}))

// Simulation hook - updates positions over time
export const useSimulation = () => {
  const { residents, isPlaying, currentTime, setCurrentTime, setResidents } = useDashboardStore()
  
  // Simple animation simulation
  if (typeof window !== 'undefined') {
    setInterval(() => {
      if (isPlaying) {
        setCurrentTime(currentTime + 0.1)
        
        // Animate residents slightly
        const updated = residents.map(r => ({
          ...r,
          position: [
            r.position[0] + (Math.random() - 0.5) * 0.05,
            0.1,
            r.position[2] + (Math.random() - 0.5) * 0.05
          ] as [number, number, number]
        }))
        setResidents(updated)
      }
    }, 100)
  }
}
