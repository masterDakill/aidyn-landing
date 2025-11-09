/* eslint-disable react/no-unescaped-entities */
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'

// Critical components - loaded immediately
import HowItWorks from '@/components/HowItWorks'
import RpaSolution from '@/components/RpaSolution'
import Features from '@/components/Features'
import PhaseOne from '@/components/PhaseOne'

// Loading component for better UX
const ComponentLoader = () => (
  <div className="flex min-h-[400px] items-center justify-center bg-slate-950/50">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
  </div>
)

// Below-the-fold components - lazy loaded with dynamic imports
const Services = dynamic(() => import('@/components/Services'), {
  loading: ComponentLoader,
})
const About = dynamic(() => import('@/components/About'), {
  loading: ComponentLoader,
})
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: ComponentLoader,
})
const Footer = dynamic(() => import('@/components/Footer'))
const Innovation3D = dynamic(() => import('@/components/Innovation3D'), {
  loading: ComponentLoader,
  ssr: false,
})
const RoadmapCommercial = dynamic(() => import('@/components/RoadmapCommercial'), {
  loading: ComponentLoader,
})
const DashboardPWAPreview = dynamic(() => import('@/components/DashboardPWAPreview'), {
  loading: ComponentLoader,
  ssr: false,
})
const LiveCameraDemo = dynamic(() => import('@/components/LiveCameraDemo'), {
  loading: ComponentLoader,
  ssr: false,
})

// Floating components - loaded with SSR disabled for better performance
const AskAidyn = dynamic(
  () => import('@/components/AskAidyn'),
  { ssr: false }
)

// NEW: Hero 3D Immersive - loaded with SSR disabled for optimal performance
const HeroImmersive3D = dynamic(
  () => import('@/components/HeroImmersive3D'),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-400">Chargement de l'expérience 3D...</p>
        </div>
      </div>
    )
  }
)

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="relative z-10 min-h-screen">
        {/* NEW: Hero 3D Immersive Section - Full-screen premium experience */}
        <section id="hero">
          <HeroImmersive3D />
        </section>

        {/* How It Works - Phase 1 Pipeline */}
        <section id="how-it-works">
          <HowItWorks />
        </section>

        {/* Live Camera Demo - NEW: AI Detection in Real-Time */}
        <section id="live-demo">
          <LiveCameraDemo />
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

        {/* Roadmap Commercial - Products Evolution 2026-2028 */}
        <section id="roadmap">
          <RoadmapCommercial />
        </section>

        {/* Phase 1 Section */}
        <section id="phase-1">
          <PhaseOne />
        </section>

        {/* PWA Dashboard Preview Section - NEW */}
        <section id="pwa-dashboard">
          <DashboardPWAPreview />
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
      <AskAidyn mailto="admin@aidyn.ai" />
    </>
  )
}
