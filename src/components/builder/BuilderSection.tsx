/**
 * BuilderSection Component
 *
 * Ce composant permet d'ajouter une section éditable Builder.io
 * n'importe où dans vos pages existantes.
 *
 * Utilisation dans page.tsx:
 *
 * ```tsx
 * import BuilderSection from '@/components/builder/BuilderSection'
 *
 * export default function HomePage() {
 *   return (
 *     <>
 *       <Navigation />
 *       <main>
 *         <Hero />
 *         <BuilderSection sectionName="hero-banner" />
 *         <Features />
 *         <BuilderSection sectionName="promotional-block" />
 *         <Contact />
 *       </main>
 *     </>
 *   )
 * }
 * ```
 */

'use client'

import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import { useEffect, useState } from 'react'

// Import de l'enregistrement des composants
import '@/builder.register'

interface BuilderSectionProps {
  /**
   * Nom unique de la section dans Builder.io
   * Ex: "hero-banner", "promotional-block", "testimonials-section"
   */
  sectionName: string

  /**
   * Modèle Builder.io à utiliser (par défaut: "section")
   */
  model?: string

  /**
   * Classes CSS additionnelles
   */
  className?: string
}

/**
 * BuilderSection
 *
 * Affiche une section Builder.io éditable qui peut être insérée
 * n'importe où dans vos pages code-first.
 */
export default function BuilderSection({
  sectionName,
  model = 'section',
  className = ''
}: BuilderSectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const isPreviewing = useIsPreviewing()

  useEffect(() => {
    // Récupérer le contenu de la section depuis Builder.io
    builder
      .get(model, {
        query: {
          name: sectionName
        }
      })
      .promise()
      .then((data) => {
        setContent(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(`Erreur lors du chargement de la section &quot;${sectionName}&quot;:`, error)
        setLoading(false)
      })
  }, [sectionName, model])

  // Afficher un indicateur de chargement
  if (loading && isPreviewing) {
    return (
      <div className={`py-4 ${className}`}>
        <div className="container-max px-6">
          <div className="text-center text-gray-500">
            Chargement de la section &quot;{sectionName}&quot;...
          </div>
        </div>
      </div>
    )
  }

  // Si pas de contenu et pas en mode preview, ne rien afficher
  if (!content && !isPreviewing) {
    return null
  }

  // Rendre la section Builder.io
  return (
    <div className={className}>
      <BuilderComponent
        model={model}
        content={content || undefined}
        options={{
          includeRefs: true,
        }}
      />
    </div>
  )
}

/**
 * Instructions pour créer une section dans Builder.io:
 *
 * 1. Allez sur https://builder.io
 * 2. Créez un nouveau modèle "section" si vous ne l'avez pas déjà
 * 3. Créez une nouvelle entrée et nommez-la (ex: "hero-banner")
 * 4. Ajoutez vos composants personnalisés (Hero, Features, etc.)
 * 5. Publiez la section
 * 6. La section apparaîtra automatiquement sur votre site
 *
 * Note: Pour créer le modèle "section":
 * - Allez dans Models
 * - Cliquez sur "+ New Model"
 * - Nommez-le "section"
 * - Type: Section
 * - Sauvegardez
 */
