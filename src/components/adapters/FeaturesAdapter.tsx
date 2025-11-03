/**
 * Features Adapter pour Builder.io
 *
 * Ce composant wrapper permet d'éditer la section Features dans Builder.io.
 */

'use client'

import Features from '../Features'

/**
 * Interface des props éditables dans Builder.io
 */
interface FeaturesAdapterProps {
  title?: string
  subtitle?: string
  className?: string
}

/**
 * Wrapper du composant Features pour Builder.io
 *
 * Note: Pour l'instant, le composant Features n'accepte pas de props externes.
 * Cette structure permet une évolution future où on pourrait passer
 * un titre/sous-titre personnalisé.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FeaturesAdapter(_props: FeaturesAdapterProps) {
  return <Features />
}

/**
 * Configuration Builder.io pour ce composant
 *
 * Définit les champs éditables dans l'interface visuelle de Builder.io
 */
export const FeaturesAdapterConfig = {
  name: 'Features',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Fondations techniques de la Phase 1',
      helperText: 'Titre de la section (à implémenter dans le composant)'
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Chaque fonctionnalité s\'aligne sur la feuille de route 2025-2026',
      helperText: 'Sous-titre de la section (à implémenter dans le composant)'
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: '',
      helperText: 'Classes CSS additionnelles (optionnel)'
    }
  ],
  tags: ['section', 'features', 'technique'],
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fplaceholder'
}
