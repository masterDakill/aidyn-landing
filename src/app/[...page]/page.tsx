/**
 * Builder.io Dynamic Page Route
 *
 * Cette route catch-all permet de rendre n'importe quelle page créée dans Builder.io.
 * Elle gère automatiquement le rendu côté serveur (SSR) et la génération statique (SSG).
 *
 * Routes supportées:
 * - /custom-page
 * - /landing/promo
 * - /about/team
 * - etc.
 *
 * Note: Cette route n'interfère PAS avec les routes existantes définies explicitement
 * dans votre app (comme /page.tsx). Next.js donne la priorité aux routes explicites.
 */

import { builder } from '@builder.io/sdk'
import { RenderBuilderContent } from '@/components/builder/RenderBuilderContent'

// Initialiser Builder.io
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)

interface PageProps {
  params: {
    page: string[]
  }
}

/**
 * Composant de page dynamique
 *
 * Récupère et affiche le contenu d'une page Builder.io basée sur l'URL
 */
export default async function Page(props: PageProps) {
  const urlPath = '/' + (props.params?.page?.join('/') || '')

  // Récupérer le contenu de la page depuis Builder.io
  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath
      }
    })
    .toPromise()

  // Si la page n'existe pas dans Builder.io, afficher 404
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-6">Page non trouvée</p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    )
  }

  // Rendre le contenu Builder.io
  return (
    <>
      {/* Rendu du contenu de la page Builder.io */}
      <RenderBuilderContent content={page} model="page" />
    </>
  )
}

/**
 * generateStaticParams - Génération statique des pages
 *
 * Cette fonction permet de pré-générer les pages Builder.io au moment du build.
 * Cela améliore les performances en créant des pages statiques.
 *
 * Note: Vous pouvez décommenter cette fonction si vous souhaitez utiliser
 * la génération statique (SSG) au lieu du rendu côté serveur (SSR).
 */

// export async function generateStaticParams() {
//   // Récupérer toutes les pages depuis Builder.io
//   const pages = await builder.getAll('page', {
//     options: { noTargeting: true },
//     apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY
//   })
//
//   // Générer les paramètres pour chaque page
//   return pages.map((page) => ({
//     page: page.data?.url?.split('/').filter(Boolean) || []
//   }))
// }

/**
 * revalidate - Revalidation incrémentielle (ISR)
 *
 * Définit la fréquence de revalidation des pages en secondes.
 * Par exemple, 60 signifie que Next.js régénérera la page
 * au maximum une fois par minute si elle reçoit du trafic.
 */
export const revalidate = 60
