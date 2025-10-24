import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

// Critical components - loaded immediately
import RpaSolution from '@/components/RpaSolution'
import Features from '@/components/Features'
import PhaseOne from '@/components/PhaseOne'

// Below-the-fold components - lazy loaded with dynamic imports
const VideoPitch = dynamic(() => import('@/components/VideoPitch'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center">Chargement...</div>,
})

const LiveStats = dynamic(() => import('@/components/Interactive/LiveStats'), {
  loading: () => <div className="min-h-[300px]" />,
})

const RPASimulator = dynamic(() => import('@/components/Interactive/RPASimulator'), {
  loading: () => <div className="min-h-[500px]" />,
})

const Integrations = dynamic(() => import('@/components/Integrations'))
const InteractiveTestimonials = dynamic(() => import('@/components/Interactive/InteractiveTestimonials'))
const ProofKpi = dynamic(() => import('@/components/ProofKpi'))
const InteractiveOnboarding = dynamic(() => import('@/components/Interactive/InteractiveOnboarding'))
const Grants = dynamic(() => import('@/components/Grants'))
const Services = dynamic(() => import('@/components/Services'))
const About = dynamic(() => import('@/components/About'))
const Roadmap = dynamic(() => import('@/components/Roadmap'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

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
        {/* Critical above-the-fold content */}
        <section id="hero">
          <Hero />
        </section>
        <section id="rpa-solution">
          <RpaSolution />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="video-pitch">
          <VideoPitch />
        </section>
        <section id="phase-1">
          <PhaseOne />
        </section>

        {/* Below-the-fold content - lazy loaded */}
        <section id="live-stats">
          <LiveStats />
        </section>
        <section id="simulator">
          <RPASimulator />
        </section>
        <section id="integrations">
          <Integrations />
        </section>
        <section id="testimonials">
          <InteractiveTestimonials />
        </section>
        <section id="proof-kpi">
          <ProofKpi />
        </section>
        <section id="onboarding">
          <InteractiveOnboarding />
        </section>
        <section id="grants">
          <Grants />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="roadmap">
          <Roadmap />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </main>
      <FloatingEngagement />
    </>
  )
}
