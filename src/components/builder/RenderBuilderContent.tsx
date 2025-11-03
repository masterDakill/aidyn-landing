/**
 * RenderBuilderContent Component
 *
 * Ce composant client gère le rendu du contenu Builder.io.
 * Il utilise le SDK Builder.io pour afficher les pages créées visuellement.
 */

'use client'

import { BuilderComponent, useIsPreviewing } from '@builder.io/react'
import { BuilderContent } from '@builder.io/sdk'

// Import de l'enregistrement des composants
import '@/builder.register'

interface RenderBuilderContentProps {
  content: BuilderContent | null
  model: string
}

/**
 * RenderBuilderContent
 *
 * Affiche le contenu Builder.io avec support du mode preview.
 * En mode preview, le contenu est toujours affiché même s'il n'est pas publié.
 */
export function RenderBuilderContent({ content, model }: RenderBuilderContentProps) {
  // Vérifier si on est en mode preview Builder.io
  const isPreviewing = useIsPreviewing()

  // Si pas de contenu et pas en mode preview, ne rien afficher
  if (!content && !isPreviewing) {
    return null
  }

  // Rendre le composant Builder.io
  return (
    <BuilderComponent
      model={model}
      content={content || undefined}
      // Options additionnelles
      options={{
        // Inclure les références de composants
        includeRefs: true,
      }}
    />
  )
}

/**
 * Note d'utilisation:
 *
 * Ce composant doit être utilisé dans vos pages Next.js comme ceci:
 *
 * ```tsx
 * import { builder } from '@builder.io/sdk'
 * import { RenderBuilderContent } from '@/components/builder/RenderBuilderContent'
 *
 * export default async function Page() {
 *   const content = await builder
 *     .get('page', { userAttributes: { urlPath: '/my-page' } })
 *     .toPromise()
 *
 *   return <RenderBuilderContent content={content} model="page" />
 * }
 * ```
 */
