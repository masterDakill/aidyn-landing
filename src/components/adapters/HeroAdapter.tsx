/**
 * Hero Adapter pour Builder.io
 *
 * Ce composant wrapper permet d'éditer le Hero dans Builder.io
 * avec des props personnalisables sans modifier le composant original.
 */

'use client'

import Hero from '../Hero'

/**
 * Interface des props éditables dans Builder.io
 */
interface HeroAdapterProps {
  // Props futures pour permettre l'édition du Hero
  // Pour l'instant, on utilise le Hero tel quel
  className?: string
}

/**
 * Wrapper du composant Hero pour Builder.io
 *
 * Ce composant permet d'utiliser Hero dans Builder.io tout en
 * conservant son comportement d'origine.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeroAdapter(_props: HeroAdapterProps) {
  return <Hero />
}

/**
 * Configuration Builder.io pour ce composant
 *
 * Définit les champs éditables qui apparaîtront dans l'interface Builder.io
 */
export const HeroAdapterConfig = {
  name: 'Hero',
  inputs: [
    {
      name: 'className',
      type: 'string',
      defaultValue: '',
      helperText: 'Classes CSS additionnelles (optionnel)'
    }
  ],
  // Tags pour faciliter la recherche dans Builder.io
  tags: ['section', 'hero', 'landing'],
  // Image d'aperçu (optionnel)
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fplaceholder'
}
