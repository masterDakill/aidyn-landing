import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// Get system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Resolve theme based on preference and system
const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') return getSystemTheme()
  return theme
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Default to dark theme (current site design)
      resolvedTheme: 'dark',

      setTheme: (theme: Theme) => {
        const resolved = resolveTheme(theme)

        // Update document class for Tailwind dark mode
        if (typeof document !== 'undefined') {
          if (resolved === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }

        set({ theme, resolvedTheme: resolved })
      },

      toggleTheme: () => {
        const current = get().resolvedTheme
        const newTheme = current === 'dark' ? 'light' : 'dark'
        get().setTheme(newTheme)
      },
    }),
    {
      name: 'aidyn-theme-storage',
      // Initialize theme on hydration
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          const resolved = resolveTheme(state.theme)
          if (resolved === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          state.resolvedTheme = resolved
        }
      },
    }
  )
)

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const store = useThemeStore.getState()
    if (store.theme === 'system') {
      store.setTheme('system')
    }
  })
}
