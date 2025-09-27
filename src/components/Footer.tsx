import { 
  Brain, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter,
  Github,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AIDYN</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Solutions d'intelligence artificielle pour révolutionner 
              votre business immobilier et maximiser vos investissements.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://linkedin.com/company/aidyn-technologies" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/aidyn_tech" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/aidyn-technologies" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-6">Solutions RPA</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#rpa-solution" className="text-gray-400 hover:text-white transition-colors">
                  Phase 1 - Système d'appel
                </Link>
              </li>
              <li>
                <Link href="#integrations" className="text-gray-400 hover:text-white transition-colors">
                  Intégrations réseau
                </Link>
              </li>
              <li>
                <Link href="#proof-kpi" className="text-gray-400 hover:text-white transition-colors">
                  Preuves & KPI
                </Link>
              </li>
              <li>
                <Link href="#grants" className="text-gray-400 hover:text-white transition-colors">
                  Subventions Québec
                </Link>
              </li>
              <li>
                <Link href="#roadmap" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Feuille de route (Phase 2)
                </Link>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold mb-6">Technologies</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Boutons étanches IP67</span>
              </li>
              <li>
                <span className="text-gray-400">Wi-Fi + RF 433MHz</span>
              </li>
              <li>
                <span className="text-gray-400">MQTT & API REST</span>
              </li>
              <li>
                <span className="text-gray-400">VLAN/QoS réseau</span>
              </li>
              <li>
                <span className="text-gray-400">Dashboard temps réel</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:admin@aidyn.ai"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    admin@aidyn.ai
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Nous contacter
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-max py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 AIDYN Technologies. Tous droits réservés.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Conditions d'utilisation
              </Link>
              <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}