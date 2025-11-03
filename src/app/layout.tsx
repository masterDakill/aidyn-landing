import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import './globals.css'
import { ToastProvider } from '@/components/Interactive/ToastNotifications'
import BuilderRegistryProvider from '@/components/builder/BuilderRegistryProvider'

const inter = Inter({ subsets: ['latin'] })
const siteUrl = 'https://aidyn-tech.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'AIDYN Technologies – SerenaCare AI pour résidences privées pour aînés',
  description:
    "SerenaCare AI de Technologies AIDYN détecte les chutes, errances et détresses audio en RPA grâce à une IA multimodale edge/cloud. Phase 1 : pilote Auberge Boischatel, KPI ≥95 %, soutien 24/7.",
  keywords:
    'SerenaCare AI, RPA, résidences privées pour aînés, détection de chutes, IA multimodale, surveillance intelligente, Technologies AIDYN',
  authors: [{ name: 'Mathieu Chamberland', url: siteUrl }],
  creator: 'Technologies AIDYN Inc.',
  publisher: 'Technologies AIDYN Inc.',
  robots: 'index, follow',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'AIDYN Technologies - SerenaCare AI',
    description: 'Plateforme de surveillance intelligente pour résidences privées pour aînés',
    type: 'website',
    locale: 'fr_CA',
    url: siteUrl,
    siteName: 'AIDYN Technologies',
    title: 'SerenaCare AI – Sécurité intelligente pour milieux de vie aînés',
    description:
      'Plateforme SerenaCare AI : vision + audio + capteurs edge pour réduire de 40 % les incidents critiques en résidences privées pour aînés.',
    images: [
      {
        url: '/images/AIDYN_Hero_Dark_-_Variante_Optimise_Alternative.png',
        width: 1200,
        height: 900,
        alt: 'Tableau de bord SerenaCare AI avec alertes en temps réel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SerenaCare AI par AIDYN Technologies',
    description:
      "Détection d'événements critiques par IA multimodale pour les résidences privées pour aînés – Phase 1 prête au pilote Auberge Boischatel.",
    creator: '@aidyn_tech',
    images: ['/images/AIDYN_Hero_Dark_-_Variante_Optimise_Alternative.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <BuilderRegistryProvider>
          <ToastProvider>
            <WebVitalsReporter />
            {children}
          </ToastProvider>
        </BuilderRegistryProvider>
      </body>
    </html>
  )
}
