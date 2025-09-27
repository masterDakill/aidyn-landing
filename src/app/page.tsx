import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import RpaSolution from '@/components/RpaSolution'
import Features from '@/components/Features'
import Integrations from '@/components/Integrations'
import ProofKpi from '@/components/ProofKpi'
import Grants from '@/components/Grants'
import Services from '@/components/Services'
import About from '@/components/About'
import Roadmap from '@/components/Roadmap'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

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
        <section id="integrations">
          <Integrations />
        </section>
        <section id="proof-kpi">
          <ProofKpi />
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
        <Roadmap />
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </main>
    </>
  )
}