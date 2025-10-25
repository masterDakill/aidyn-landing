import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

// Critical components - loaded immediately
import RpaSolution from '@/components/RpaSolution'
import Features from '@/components/Features'
import PhaseOne from '@/components/PhaseOne'

// Below-the-fold components - lazy loaded with dynamic imports
const Services = dynamic(() => import('@/components/Services'))
const About = dynamic(() => import('@/components/About'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))
const Innovation3D = dynamic(() => import('@/components/Innovation3D'))

// Floating components - loaded with SSR disabled for better performance
const FloatingEngagement = dynamic(
  () => import('@/components/Interactive/FloatingEngagement'),
  { ssr: false }
)

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Section - Introduction */}
        <section id="hero">
          <Hero />
        </section>

        {/* Product Section - SerenaCare */}
        <section id="rpa-solution">
          <RpaSolution />
        </section>

        {/* Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* Innovation 3D Section - Technical Depth */}
        <section id="innovation-3d">
          <Innovation3D />
        </section>

        {/* Phase 1 Section */}
        <section id="phase-1">
          <PhaseOne />
        </section>

        {/* Services Section */}
        <section id="services">
          <Services />
        </section>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>

        {/* Footer */}
        <Footer />
      </main>
      <FloatingEngagement />
    </>
  )
}
