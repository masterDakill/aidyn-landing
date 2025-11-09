'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="rounded-lg border border-slate-600 bg-slate-800 p-2 transition-colors"
        aria-label="Changer le thème"
      >
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="group rounded-lg border border-slate-600 bg-slate-800 p-2 transition-all hover:border-cyan-500/50 hover:bg-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-cyan-500/50 dark:hover:bg-slate-700"
      aria-label={resolvedTheme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={resolvedTheme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform group-hover:rotate-12" />
      ) : (
        <Moon className="h-5 w-5 text-slate-300 transition-transform group-hover:-rotate-12" />
      )}
    </button>
  )
}
