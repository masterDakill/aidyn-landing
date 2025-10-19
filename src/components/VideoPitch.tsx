"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

const commitments = [
  {
    title: "Pilote terrain orchestré",
    description:
      "Formation du personnel, scénarios d'escalade et boucle de rétroaction résidents/familles incluses.",
    icon: ShieldCheck,
  },
  {
    title: "IA multimodale maîtrisée",
    description:
      "Vision + audio + capteurs edge Jetson alignés sur les exigences cliniques et réglementaires.",
    icon: Zap,
  },
  {
    title: "Confiance & conformité",
    description:
      "Journalisation complète, anonymisation contextuelle et préparation certification CE/RoHS.",
    icon: Sparkles,
  },
];

const highlights = [
  "Réduction ciblée ≥ 40 % des incidents critiques",
  "Précision de détection ≥ 95 % sur le pilote Auberge Boischatel",
  "Financement Phase 1 : MAPAQ 50 k$ + AGE-WELL 25 k$",
];

export default function VideoPitch() {
  return (
    <section id="video" className="section-padding bg-slate-950 text-slate-100">
      <div className="container-max grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Vidéo stratégie · Phase 1 SerenaCare AI
          </span>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Pitch exécutif : comment SerenaCare AI sécurise les milieux de vie
            aînés
          </h2>

          <p className="text-lg text-slate-300">
            Cette capsule synthétise la proposition de valeur Phase 1 :
            architecture edge/cloud, KPI opérationnels et feuille de route de
            déploiement à l&apos;Auberge Boischatel.
          </p>

          <ul className="space-y-4 text-sm text-slate-200">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30 backdrop-blur">
            {commitments.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-300">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
          >
            Discuter du déploiement
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-tr from-emerald-400/25 via-cyan-400/15 to-sky-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/50">
            <div className="relative w-full overflow-hidden rounded-[2rem] bg-black/80 pb-[56.25%]">
              <iframe
                src="https://share.synthesia.io/embeds/videos/01101fb2-5643-420c-bb4b-4cfea61a71e9"
                title="Présentation Phase 1 SerenaCare AI"
                loading="lazy"
                allow="encrypted-media; fullscreen; microphone"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
          <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-xs text-slate-200 shadow-lg shadow-black/30 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-center">
              <p className="text-lg font-semibold text-emerald-300">≥95 %</p>
              <p className="mt-1 font-semibold">Précision visée</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-center">
              <p className="text-lg font-semibold text-emerald-300">&lt;5 s</p>
              <p className="mt-1 font-semibold">Latence alertes</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-center">
              <p className="text-lg font-semibold text-emerald-300">75 k$</p>
              <p className="mt-1 font-semibold">Financement Phase 1</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
