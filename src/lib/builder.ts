/**
 * Builder.io Configuration
 *
 * Ce fichier initialise et exporte l'instance Builder.io pour le projet.
 * Il utilise la clé API publique définie dans les variables d'environnement.
 *
 * @see https://www.builder.io/c/docs/developers
 */

import { builder } from '@builder.io/react'

// Récupérer la clé API depuis les variables d'environnement
// IMPORTANT: Cette clé doit être définie dans .env.local
const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY

if (!BUILDER_API_KEY) {
  throw new Error(
    '❌ NEXT_PUBLIC_BUILDER_API_KEY est manquante. ' +
    'Veuillez ajouter votre clé API Builder.io dans le fichier .env.local'
  )
}

// Initialiser Builder.io avec la clé API
builder.init(BUILDER_API_KEY)

// Exporter l'instance builder pour utilisation dans tout le projet
export { builder }

/**
 * Configuration optionnelle pour Builder.io
 *
 * Vous pouvez décommenter et ajuster ces options selon vos besoins:
 *
 * // Définir un délai d'expiration personnalisé pour les requêtes
 * builder.apiVersion = 'v3'
 *
 * // Activer le mode preview pour le développement
 * if (process.env.NODE_ENV === 'development') {
 *   builder.canTrack = false
 * }
 */
