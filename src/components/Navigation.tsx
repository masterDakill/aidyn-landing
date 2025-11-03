'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

import Logo from './Logo'

const navItems = [
  { href: '#rpa-solution', label: 'Solution', description: 'Plateforme SerenaCare AI' },
  { href: '#features', label: 'Capacités', description: 'Vision · Audio · Edge' },
  { href: '#phase-1', label: 'Phase 1', description: 'Feuille de route 2025-2026' },
  { href: '#integrations', label: 'Intégrations', description: 'Twilio · Slack · Dossier soins' },
  { href: '#proof-kpi', label: 'Résultats', description: 'Objectifs ≥95 %' },
  { href: '#contact', label: 'Contact', description: 'Planifier une rencontre' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerClasses = clsx(
    'mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 shadow-lg transition-all duration-300 sm:px-6',
    scrolled
      ? 'border-white/70 bg-white/95 text-slate-900 shadow-xl backdrop-blur-xl'
      : 'border-white/15 bg-slate-950/60 text-white shadow-black/20 backdrop-blur-lg'
  )

  const linkClasses = clsx(
    'text-sm font-semibold transition-colors duration-200',
    scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-200 hover:text-white'
  )

  const descriptionClasses = clsx('text-xs font-medium', scrolled ? 'text-slate-400' : 'text-slate-400/80')

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center gap-2 px-4 pt-3 sm:pt-4">
      <div className="flex w-full justify-center">
        <div className="flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200 shadow-lg backdrop-blur">
          <span>Phase 1</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Protection proactive des résidents</span>
        </div>
      </div>

      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full px-0">
        <div className={containerClasses}>
          <Link href="#hero" className="inline-flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <Logo variant={scrolled ? 'light' : 'dark'} className="hidden sm:inline-flex" />
            <Logo variant={scrolled ? 'light' : 'dark'} compact className="sm:hidden" />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="group flex flex-col gap-0.5" onClick={() => setIsOpen(false)}>
                <span className={linkClasses}>{item.label}</span>
                <span className={clsx(descriptionClasses, 'transition-colors duration-200 group-hover:text-emerald-400')}>
                  {item.description}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex">
            <Link
              href="mailto:contact@aidyn.ai"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/20 transition-transform duration-200 hover:translate-y-[-1px] hover:shadow-xl"
            >
              Parler à un spécialiste
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 p-2 text-slate-200 transition-colors duration-200 hover:border-white/40 hover:text-white lg:hidden"
            aria-label={isOpen ? 'Fermer la navigation' : 'Ouvrir la navigation'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className={clsx(
                'mx-auto mt-3 w-full max-w-6xl overflow-hidden rounded-2xl border px-4 py-4 shadow-xl sm:px-6',
                scrolled
                  ? 'border-white/70 bg-white/95 text-slate-900 backdrop-blur-xl'
                  : 'border-white/15 bg-slate-950/80 text-white backdrop-blur-lg'
              )}
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-semibold transition-colors duration-200 hover:bg-slate-900/80 hover:text-white"
                  >
                    <span className="block">{item.label}</span>
                    <span className="block text-sm text-slate-400">{item.description}</span>
                  </Link>
                ))}

                <Link
                  href="mailto:contact@aidyn.ai"
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg"
                >
                  Parler à un spécialiste
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
