'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, Mail } from 'lucide-react'

// ========================================
// FAQ DATABASE - Questions/Réponses locales
// ========================================
interface FAQItem {
  id: string
  keywords: string[]
  question: string
  answer: string
  category: string
}

const FAQ_DATABASE: FAQItem[] = [
  {
    id: 'detection-unifi',
    keywords: ['détection', 'chute', 'caméra', 'unifi', 'protect', 'comment', 'fonctionne'],
    question: 'Comment fonctionne la détection de chutes sur caméras UniFi?',
    answer: `AIDYN utilise vos caméras UniFi Protect existantes sans nouveau matériel. Notre IA analyse les images en temps réel (YOLOv8-Pose) pour détecter automatiquement les chutes avec plus de 95% de précision et moins de 5% de faux positifs. Le traitement est local sur un boîtier Jetson, garantissant une latence sous 500ms.`,
    category: 'Technique'
  },
  {
    id: 'confidentialite',
    keywords: ['confidentialité', 'données', 'privé', 'local', 'sécurité', 'rgpd', 'protection'],
    question: 'Mes données vidéo sont-elles sécurisées?',
    answer: `Oui, totalement sécurisé! Toutes les analyses IA sont effectuées LOCALEMENT sur votre site (Jetson edge computing). Aucune vidéo n'est envoyée dans le cloud. Seuls les événements détectés (métadonnées) sont transmis à votre dashboard. Conformité RGPD garantie avec traitement local des données sensibles.`,
    category: 'Sécurité'
  },
  {
    id: 'precision',
    keywords: ['précision', 'fiable', 'erreur', 'faux', 'positif', 'latence', 'rapide', 'temps'],
    question: 'Quelle est la précision et la vitesse du système?',
    answer: `Nos objectifs Phase 1 sont très stricts:
• Précision: ≥95% de détection correcte
• Faux positifs: <5% d'erreurs
• Latence: <500ms entre l'incident et l'alerte
• Disponibilité: 99.9% uptime

Le système fonctionne 24/7 avec alertes instantanées (Slack, Email, SMS).`,
    category: 'Performance'
  },
  {
    id: 'budget-calendrier',
    keywords: ['prix', 'coût', 'budget', 'calendrier', 'quand', 'date', 'lancement', '2026'],
    question: 'Quel est le budget et le calendrier?',
    answer: `Phase 1 (2026) - Détection IA + Dashboard 3D:
• Lancement: Q1 2026
• Installation: <1 journée
• Budget estimé: Variable selon nombre de caméras et résidences

Phase 2 (2027): Analyse prédictive + Assistant vocal
Phase 3 (2028): Plateforme SaaS multi-résidences

Contactez-nous pour un devis personnalisé!`,
    category: 'Commercial'
  },
  {
    id: 'demo',
    keywords: ['démo', 'démonstration', 'essai', 'test', 'voir', 'présentation', 'rendez-vous'],
    question: 'Comment obtenir une démo?',
    answer: `Excellente question! Planifions une démo personnalisée:

📧 Email: admin@aidyn.ai
📅 Démo live: 30-45 minutes
🎯 Contenu:
  • Dashboard 3D en temps réel
  • Détection de chutes live
  • Intégration UniFi Protect
  • Replay forensique 3D
  • Questions/réponses

Cliquez sur "Contacter par email" ci-dessous pour réserver votre démo!`,
    category: 'Commercial'
  },
  {
    id: 'installation',
    keywords: ['installation', 'déploiement', 'installer', 'matériel', 'équipement', 'requis'],
    question: 'Quel matériel est nécessaire?',
    answer: `AIDYN s'intègre à votre infrastructure existante:

✅ Caméras UniFi Protect (déjà installées)
✅ UniFi Dream Machine Pro (UDM Pro)
✅ Boîtier Jetson Nano/Orin (fourni par AIDYN)
✅ Connexion réseau locale

Aucune nouvelle caméra requise! Nous utilisons vos caméras UniFi actuelles. Installation complète en moins d'une journée.`,
    category: 'Technique'
  },
  {
    id: 'jumeau-3d',
    keywords: ['3d', 'jumeau', 'visualisation', 'dashboard', 'interface', 'replay'],
    question: 'Qu\'est-ce que le Jumeau Numérique 3D?',
    answer: `Le Jumeau Numérique est une réplique 3D interactive de votre résidence:

🏢 Visualisation temps réel des positions
📍 Localisation précise (<10cm) des résidents
🎬 Rejeu forensique des incidents (30s pré-incident + 1min post)
🗺️ Heatmap des zones à risque
📊 Timeline navigable pour analyses

C'est votre résidence en 3D avec toutes les données de sécurité superposées. Inclus dès Phase 1!`,
    category: 'Fonctionnalités'
  },
  {
    id: 'alertes',
    keywords: ['alerte', 'notification', 'slack', 'email', 'sms', 'prévenir'],
    question: 'Comment sont envoyées les alertes?',
    answer: `Alertes multi-canaux instantanées:

📱 Slack: Message dans votre channel dédié
📧 Email: admin@aidyn.ai et équipes configurées
💬 SMS: Numéros d'urgence prédéfinis
🖥️ Dashboard: Notification temps réel + son

Vous choisissez quels canaux activer et qui reçoit quoi. Escalade automatique possible si pas de réponse.`,
    category: 'Fonctionnalités'
  }
]

// ========================================
// SCORING ENGINE - Matcher questions
// ========================================
function scoreMatch(userInput: string, faqItem: FAQItem): number {
  const input = userInput.toLowerCase().trim()
  const words = input.split(/\s+/)
  
  let score = 0
  
  // Score par keyword exact match
  faqItem.keywords.forEach(keyword => {
    if (input.includes(keyword.toLowerCase())) {
      score += 10
    }
  })
  
  // Score par mots individuels
  words.forEach(word => {
    if (word.length < 3) return // Ignorer mots courts
    faqItem.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())) {
        score += 3
      }
    })
  })
  
  // Bonus si question contient les mots
  words.forEach(word => {
    if (word.length < 3) return
    if (faqItem.question.toLowerCase().includes(word)) {
      score += 2
    }
  })
  
  return score
}

function findBestMatch(userInput: string): FAQItem | null {
  if (!userInput.trim()) return null
  
  let bestMatch: FAQItem | null = null
  let bestScore = 0
  
  FAQ_DATABASE.forEach(faq => {
    const score = scoreMatch(userInput, faq)
    if (score > bestScore) {
      bestScore = score
      bestMatch = faq
    }
  })
  
  // Seuil de pertinence minimum
  return bestScore >= 5 ? bestMatch : null
}

// ========================================
// MESSAGE TYPES
// ========================================
interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

// ========================================
// COMPOSANT PRINCIPAL
// ========================================
interface AskAidynProps {
  mailto?: string
}

export default function AskAidyn({ mailto = 'admin@aidyn.ai' }: AskAidynProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      type: 'bot',
      content: '👋 Bonjour! Je suis l\'assistant AIDYN. Posez-moi vos questions sur notre système de détection de chutes IA!',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const match = findBestMatch(inputValue)
      
      let botResponse: string
      if (match) {
        botResponse = match.answer
      } else {
        botResponse = `Je n'ai pas trouvé de réponse précise à votre question. 

Les sujets que je connais bien:
• Détection de chutes sur UniFi
• Sécurité et confidentialité
• Précision et performance
• Budget et calendrier
• Demander une démo

Pour toute autre question, contactez-nous directement à ${mailto}!`
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  const quickQuestions = [
    'Comment ça fonctionne?',
    'Est-ce sécurisé?',
    'Quelle précision?',
    'Demander une démo'
  ]

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/50"
        aria-label="Ouvrir Ask AIDYN"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">Ask AIDYN</h3>
                <p className="text-xs text-slate-300">Assistant IA local</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-800 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="border-t border-slate-200 bg-white p-3">
              <p className="mb-2 text-xs font-semibold text-slate-600">Questions rapides:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white transition-colors hover:bg-emerald-700 disabled:bg-slate-300"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            
            {/* Mailto Fallback */}
            <a
              href={`mailto:${mailto}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              <Mail className="h-4 w-4" />
              Contacter par email
            </a>
          </div>
        </div>
      )}
    </>
  )
}
