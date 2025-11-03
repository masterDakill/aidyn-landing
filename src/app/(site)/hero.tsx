'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { AnimateIn } from '@/ui/AnimateIn';
import { Button } from '@/ui/Button';
import { getImage, getSrcSet } from '@/lib/image-manifest';

const heroImage = getImage('serenacare-hero');
const heroSrcSet = getSrcSet(heroImage);

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 pt-24 lg:flex-row lg:items-center lg:px-12 lg:pt-28">
        <div className="flex-1 space-y-8 text-white">
          <AnimateIn className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-sm tracking-wide text-cyan-100">
            <ShieldCheck size={16} />
            SerenaCare AI – Phase 1 prête pour déploiements RPA
          </AnimateIn>
          <AnimateIn delay={0.1} className="space-y-6">
            <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
              « Les personnes capables de vraiment changer les choses sont celles qui n’ont pas peur d’échouer. » – Steve Jobs
            </h1>
            <p className="max-w-2xl text-lg text-slate-200">
              SerenaCare AI sécurise les milieux de vie aînés grâce à une surveillance multimodale, un tableau de bord d’alertes et un accompagnement opérationnel pensé pour les équipes RPA.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.2} className="flex flex-col gap-4 sm:flex-row">
            <Button asChild className="gap-2" size="lg">
              <Link href="mailto:contact@aidyn.ai">
                <Mail size={18} />
                Planifier une démonstration
              </Link>
            </Button>
            <Button asChild intent="secondary" className="gap-2" size="lg">
              <Link href="#phase-1">
                Explorer la feuille de route
                <ArrowRight size={18} />
              </Link>
            </Button>
          </AnimateIn>
          <AnimateIn delay={0.3} className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            {[
              {
                value: '≥ 95 %',
                label: 'Précision IA visée sur incidents critiques',
              },
              {
                value: '40 %',
                label: 'Réduction cible des chutes et errances en pilote',
              },
              {
                value: '75 k$',
                label: 'Subventions MAPAQ + AGE-WELL pour la Phase 1',
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="text-sm text-slate-200/80">{item.label}</p>
              </div>
            ))}
          </AnimateIn>
        </div>
        <AnimateIn delay={0.2} className="flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-4">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
            <Image
              src={heroImage.original}
              alt="SerenaCare AI dashboard"
              width={heroImage.width ?? 1280}
              height={heroImage.height ?? 720}
              placeholder="blur"
              blurDataURL={heroImage.placeholder}
              sizes="(min-width: 1024px) 560px, 100vw"
              {...(heroSrcSet ? { srcSet: heroSrcSet } : {})}
              className="relative z-10 rounded-2xl border border-white/10"
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
