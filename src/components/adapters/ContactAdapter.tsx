/**
 * Contact Adapter pour Builder.io
 *
 * Ce composant wrapper permet d'éditer la section contact dans Builder.io.
 */

'use client'

import Contact from '../Contact'

/**
 * Interface des props éditables dans Builder.io
 */
interface ContactAdapterProps {
  title?: string
  subtitle?: string
  emailAddress?: string
  responseTime?: string
  className?: string
}

/**
 * Wrapper du composant Contact pour Builder.io
 *
 * Note: Le composant Contact actuel ne prend pas de props.
 * Cette structure permet d'ajouter de la configuration dans le futur.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ContactAdapter(_props: ContactAdapterProps) {
  return <Contact />
}

/**
 * Configuration Builder.io pour ce composant
 *
 * Définit les champs éditables dans l'interface Builder.io
 */
export const ContactAdapterConfig = {
  name: 'Contact',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Démarrons votre projet RPA',
      helperText: 'Titre principal de la section contact'
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Prêt à sécuriser votre établissement RPA ? Contactez-nous pour planifier votre déploiement SerenaCare.',
      helperText: 'Texte descriptif sous le titre'
    },
    {
      name: 'emailAddress',
      type: 'string',
      defaultValue: 'admin@aidyn.ai',
      helperText: 'Adresse email de contact'
    },
    {
      name: 'responseTime',
      type: 'string',
      defaultValue: '24h',
      helperText: 'Temps de réponse garanti'
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: '',
      helperText: 'Classes CSS additionnelles (optionnel)'
    }
  ],
  tags: ['section', 'contact', 'form', 'formulaire'],
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fplaceholder'
}
