import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AIDYN Technologies - SerenaCare AI',
    short_name: 'AIDYN',
    description: 'SerenaCare AI de Technologies AIDYN détecte les chutes, errances et détresses audio en RPA grâce à une IA multimodale edge/cloud.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617', // slate-950
    theme_color: '#06b6d4', // cyan-500
    orientation: 'portrait-primary',
    categories: ['healthcare', 'security', 'monitoring'],
    lang: 'fr-CA',
    dir: 'ltr',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
