'use client'

import { motion } from 'framer-motion'
import { Download, Calendar, ArrowRight, CheckCircle2, DollarSign, FileText } from 'lucide-react'

const grants = [
  {
    name: 'MAPAQ Innovation',
    amount: '80K$',
    icon: CheckCircle2,
    status: 'Admissible'
  },
  {
    name: 'CRSNG Alliance',
    amount: '120K$',
    icon: CheckCircle2,
    status: 'En préparation'
  },
  {
    name: 'AGE-WELL',
    amount: '50K$',
    icon: CheckCircle2,
    status: 'Compatible'
  }
]

export default function GrantsCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 py-20 text-white">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.3),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.3),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container-max relative px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-200 backdrop-blur-sm">
              <DollarSign className="h-4 w-4" />
              Financement Disponible
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                Jusqu&apos;à 250K$
              </span>{' '}
              en Subventions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-emerald-100">
              Financez votre projet AIDYN avec les programmes de subventions gouvernementaux. 
              <strong> Dossiers prêts à soumettre.</strong>
            </p>
          </motion.div>

          {/* Grants Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-10 grid gap-4 sm:grid-cols-3"
          >
            {grants.map((grant, index) => (
              <motion.div
                key={grant.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group rounded-2xl border border-emerald-300/30 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/15 hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                <grant.icon className="mb-3 h-8 w-8 text-emerald-300" />
                <h3 className="mb-2 text-lg font-bold text-white">{grant.name}</h3>
                <div className="mb-2 text-3xl font-bold text-emerald-300">{grant.amount}</div>
                <div className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {grant.status}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 text-center font-bold text-emerald-900 shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/60"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5" />
                Planifier une Démo Gratuite
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
            >
              <Download className="h-5 w-5" />
              Télécharger le Dossier (PDF)
            </a>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-300" />
              <h3 className="font-bold text-white">Inclus dans le Dossier</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Analyse de faisabilité technique complète',
                'Budget détaillé Phase 1 (180K$-250K$)',
                'Timeline sprints et livrables',
                'Lettres d\'appui partenaires',
                'Études de marché résidences seniors',
                'Plan de commercialisation 2026-2028'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-emerald-100">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
