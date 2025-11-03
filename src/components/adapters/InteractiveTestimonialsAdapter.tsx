/**
 * InteractiveTestimonials Adapter pour Builder.io
 *
 * Ce composant wrapper permet d'éditer la section témoignages dans Builder.io.
 */

'use client'

import InteractiveTestimonials from '../Interactive/InteractiveTestimonials'

/**
 * Interface des props éditables dans Builder.io
 */
interface InteractiveTestimonialsAdapterProps {
  title?: string
  subtitle?: string
  autoPlayEnabled?: boolean
  autoPlayInterval?: number
  className?: string
}

/**
 * Wrapper du composant InteractiveTestimonials pour Builder.io
 *
 * Note: Le composant actuel ne prend pas de props.
 * Cette structure permet d'ajouter des options configurables dans le futur.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function InteractiveTestimonialsAdapter(_props: InteractiveTestimonialsAdapterProps) {
  return <InteractiveTestimonials />
}

/**
 * Configuration Builder.io pour ce composant
 *
 * Définit les champs éditables dans l'interface Builder.io
 */
export const InteractiveTestimonialsAdapterConfig = {
  name: 'InteractiveTestimonials',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Ils Nous Font Confiance',
      helperText: 'Titre principal de la section témoignages'
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Découvrez comment nos solutions RPA transforment la vie quotidienne',
      helperText: 'Sous-titre descriptif'
    },
    {
      name: 'autoPlayEnabled',
      type: 'boolean',
      defaultValue: true,
      helperText: 'Activer le défilement automatique des témoignages'
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      defaultValue: 5000,
      helperText: 'Intervalle de défilement automatique (en millisecondes)'
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: '',
      helperText: 'Classes CSS additionnelles (optionnel)'
    }
  ],
  tags: ['section', 'testimonials', 'interactive', 'témoignages'],
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fplaceholder'
}
