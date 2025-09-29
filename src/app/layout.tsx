import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/Interactive/ToastNotifications'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIDYN Technologies - Solutions IA pour l\'Immobilier',
  description: 'AIDYN Technologies révolutionne le secteur immobilier avec des solutions d\'intelligence artificielle avancées. Automatisation, analyse prédictive et optimisation de vos investissements.',
  keywords: 'IA immobilier, intelligence artificielle, automatisation immobilière, analyse prédictive, investissement immobilier, AIDYN',
  authors: [{ name: 'Mathieu Chamberland', url: 'https://aidyn-tech.com' }],
  creator: 'AIDYN Technologies',
  publisher: 'AIDYN Technologies',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://aidyn-tech.com',
    title: 'AIDYN Technologies - Solutions IA pour l\'Immobilier',
    description: 'Solutions d\'intelligence artificielle révolutionnaires pour le secteur immobilier',
    siteName: 'AIDYN Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIDYN Technologies',
    description: 'Solutions IA pour l\'immobilier',
    creator: '@aidyn_tech',
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
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}