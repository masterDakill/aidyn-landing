/**
 * Builder.io Component Registration
 *
 * Ce fichier enregistre tous les composants personnalisés dans Builder.io.
 * Une fois enregistrés, ces composants apparaîtront dans l'interface visuelle
 * de Builder.io et pourront être glissés-déposés dans les pages.
 *
 * Mode utilisé: Option C - "Registered components"
 * Les composants existants sont wrappés et exposés à Builder.io avec des props éditables.
 *
 * @see https://www.builder.io/c/docs/custom-components
 */

'use client'

import { Builder } from '@builder.io/react'

// Import des adapters
import HeroAdapter, { HeroAdapterConfig } from './components/adapters/HeroAdapter'
import FeaturesAdapter, { FeaturesAdapterConfig } from './components/adapters/FeaturesAdapter'
import InteractiveTestimonialsAdapter, { InteractiveTestimonialsAdapterConfig } from './components/adapters/InteractiveTestimonialsAdapter'
import ContactAdapter, { ContactAdapterConfig } from './components/adapters/ContactAdapter'

/**
 * Enregistrement du composant Hero
 *
 * Ce composant sera disponible dans Builder.io sous le nom "Hero"
 */
Builder.registerComponent(HeroAdapter, HeroAdapterConfig)

/**
 * Enregistrement du composant Features
 *
 * Ce composant sera disponible dans Builder.io sous le nom "Features"
 */
Builder.registerComponent(FeaturesAdapter, FeaturesAdapterConfig)

/**
 * Enregistrement du composant InteractiveTestimonials
 *
 * Ce composant sera disponible dans Builder.io sous le nom "InteractiveTestimonials"
 */
Builder.registerComponent(InteractiveTestimonialsAdapter, InteractiveTestimonialsAdapterConfig)

/**
 * Enregistrement du composant Contact
 *
 * Ce composant sera disponible dans Builder.io sous le nom "Contact"
 */
Builder.registerComponent(ContactAdapter, ContactAdapterConfig)

/**
 * Note importante:
 *
 * Pour que ces composants apparaissent dans Builder.io, ce fichier doit être
 * importé dans votre layout.tsx principal AVANT tout autre code Builder.io.
 *
 * Exemple dans layout.tsx:
 * import './builder.register'
 *
 * Les composants seront alors visibles dans l'onglet "Custom Components"
 * de l'interface Builder.io lors de l'édition de pages.
 */

console.log('✅ Builder.io components registered: Hero, Features, InteractiveTestimonials, Contact')
