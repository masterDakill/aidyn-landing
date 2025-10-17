import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import RpaSolution from '@/components/RpaSolution'
import Features from '@/components/Features'
import LiveStats from '@/components/Interactive/LiveStats'
import RPASimulator from '@/components/Interactive/RPASimulator'
import InteractiveTestimonials from '@/components/Interactive/InteractiveTestimonials'
import InteractiveOnboarding from '@/components/Interactive/InteractiveOnboarding'
import FloatingEngagement from '@/components/Interactive/FloatingEngagement'
import Integrations from '@/components/Integrations'
import ProofKpi from '@/components/ProofKpi'
import Grants from '@/components/Grants'
import Services from '@/components/Services'
import About from '@/components/About'
import Roadmap from '@/components/Roadmap'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import PhaseOne from '@/components/PhaseOne'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section id="hero">
          <Hero />
        </section>
        <section id="rpa-solution">
          <RpaSolution />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="phase-1">
          <PhaseOne />
        </section>
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