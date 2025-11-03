import type { Metadata } from 'next'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import './globals.css'
 codex/adjust-design-according-to-provided-images-2025-10-17
import { ToastProvider } from '@/components/Interactive/ToastNotifications'
import BuilderRegistryProvider from '@/components/builder/BuilderRegistryProvider'

const inter = Inter({ subsets: ['latin'] })

 main

export const metadata: Metadata = {
  title: 'AIDYN Technologies - SerenaCare AI | Surveillance Intelligente pour RPA',
  description: 'Plateforme de surveillance intelligente SerenaCare AI pour résidences privées pour aînés. Détection automatique de chutes par IA sur infrastructure existante.',
  keywords: 'AIDYN, SerenaCare, IA, intelligence artificielle, RPA, résidences aînés, surveillance, santé, Québec',
  authors: [{ name: 'AIDYN Technologies' }],
  openGraph: {
    title: 'AIDYN Technologies - SerenaCare AI',
    description: 'Plateforme de surveillance intelligente pour résidences privées pour aînés',
    type: 'website',
    locale: 'fr_CA',
    siteName: 'AIDYN Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIDYN Technologies - SerenaCare AI',
    description: 'Plateforme de surveillance intelligente pour résidences privées pour aînés',
  },
  robots: {
    index: true,
    follow: true,
  },
  // Next.js détecte automatiquement icon.png et apple-icon.png dans src/app/
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
 codex/adjust-design-according-to-provided-images-2025-10-17
      <body className={`${inter.className} antialiased`}>
        <BuilderRegistryProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </BuilderRegistryProvider>

      <body className="antialiased">
        <WebVitalsReporter />
        {children}
 main
      </body>
    </html>
  )
}
