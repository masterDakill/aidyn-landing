'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'

import Logo from './Logo'

const navItems = [
  { href: '#rpa-solution', label: 'Architecture' },
  { href: '#features', label: 'Fonctionnalités' },
  { href: '#innovation-3d', label: 'Innovation 3D' },
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
      {/* Announcement Banner - Simplifié sans animation */}
      <div className="mb-3 flex w-full justify-center">
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-gradient-to-r from-slate-950/90 to-slate-900/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Phase 1 · IA UniFi · 2026</span>
        </div>
      </div>

      {/* Main Navigation - No initial animation */}
      <nav className="w-full">
        <div className={containerClasses}>
          {/* Logo - Simple without hover effects */}
          <Link 
            href="#hero" 
            className="flex items-center gap-3" 
            onClick={() => setIsOpen(false)}
          >
            <Logo variant={scrolled ? 'light' : 'dark'} className="shrink-0" />
          </Link>

          {/* Desktop Menu - Ultra light, no animations */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'px-4 py-2 text-sm font-semibold',
                  scrolled 
                    ? 'text-slate-600 hover:text-slate-900' 
                    : 'text-slate-200 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Simple */}
          <div className="hidden lg:flex">
            <Link
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg"
            >
              <span className="flex items-center gap-2">
                Démo
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className={clsx(
              'inline-flex items-center justify-center rounded-xl p-2.5 lg:hidden',
              scrolled
                ? 'bg-slate-100 text-slate-900'
                : 'bg-white/10 text-white'
            )}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu - Simple without animations */}
        {isOpen && (
          <div
            className={clsx(
              'mx-auto mt-3 w-full max-w-7xl overflow-hidden rounded-2xl border shadow-2xl',
              scrolled
                ? 'border-white/80 bg-white/98 backdrop-blur-2xl'
                : 'border-white/20 bg-slate-950/80 backdrop-blur-xl'
            )}
          >
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'block rounded-xl px-4 py-3 text-base font-semibold',
                    scrolled
                      ? 'text-slate-900 hover:bg-slate-100'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg"
              >
                Planifier une démo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        )}
      </nav>
    </header>
  )
}
