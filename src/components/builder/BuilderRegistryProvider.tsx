/**
 * BuilderRegistryProvider
 *
 * Composant client qui charge l'enregistrement des composants Builder.io.
 * Doit être utilisé dans layout.tsx pour initialiser Builder.io côté client.
 */

'use client'

// L'import de builder.register enregistre les composants
import '@/builder.register'

export default function BuilderRegistryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
