import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sandbox 3D | AIDYN Technologies',
  description: 'Espace expérimental 3D - Sandbox AIDYN Technologies'
}

export default function SandboxLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
