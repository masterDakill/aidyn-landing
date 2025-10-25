'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'

import Logo from './Logo'

const navItems = [
  { href: '#rpa-solution', label: 'Architecture' },
  { href: '#features', label: 'Fonctionnalités' },
  { href: '#phase-1', label: 'Roadmap' },
  { href: '#contact', label: 'Contact' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerClasses = clsx(
    'mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border px-6 py-4 shadow-2xl transition-all duration-500 ease-out',
    scrolled
      ? 'border-white/80 bg-white/98 text-slate-900 shadow-slate-900/10 backdrop-blur-2xl'
      : 'border-white/20 bg-slate-950/70 text-white shadow-black/30 backdrop-blur-xl'
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      {/* Announcement Banner - Plus compact */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 flex w-full justify-center"
      >
        <div className="group flex items-center gap-2 rounded-full border border-emerald-400/30 bg-gradient-to-r from-slate-950/90 to-slate-900/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 shadow-lg shadow-emerald-500/20 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/30">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Phase 1 · IA UniFi · 2026</span>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full"
      >
        <div className={containerClasses}>
          {/* Logo - Bien espacé, ne touche pas le menu */}
          <Link 
            href="#hero" 
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105" 
            onClick={() => setIsOpen(false)}
          >
            <Logo variant={scrolled ? 'light' : 'dark'} className="shrink-0" />
          </Link>

          {/* Desktop Menu - Simplifié et élégant */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'group relative px-4 py-2 text-sm font-semibold transition-all duration-300',
                  scrolled 
                    ? 'text-slate-600 hover:text-slate-900' 
                    : 'text-slate-200 hover:text-white'
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* CTA Button - Plus dynamique */}
          <div className="hidden lg:flex">
            <Link
              href="#contact"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                Démo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-400 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className={clsx(
              'inline-flex items-center justify-center rounded-xl p-2.5 transition-all duration-300 lg:hidden',
              scrolled
                ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                : 'bg-white/10 text-white hover:bg-white/20'
            )}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={clsx(
                'mx-auto mt-3 w-full max-w-7xl overflow-hidden rounded-2xl border shadow-2xl',
                scrolled
                  ? 'border-white/80 bg-white/98 backdrop-blur-2xl'
                  : 'border-white/20 bg-slate-950/80 backdrop-blur-xl'
              )}
            >
              <nav className="flex flex-col gap-1 p-4">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        'block rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200',
                        scrolled
                          ? 'text-slate-900 hover:bg-slate-100'
                          : 'text-white hover:bg-white/10'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition-transform duration-200 hover:scale-105"
                  >
                    Planifier une démo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
