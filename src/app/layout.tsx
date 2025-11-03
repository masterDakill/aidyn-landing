import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import './globals.css'
import { ToastProvider } from '@/components/Interactive/ToastNotifications'
import BuilderRegistryProvider from '@/components/builder/BuilderRegistryProvider'

const inter = Inter({ subsets: ['latin'] })

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
