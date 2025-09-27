# 🤖 Claude Code - Guide Complet AIDYN

## 🚀 Démarrage Rapide

```bash
# Option 1: Script automatique (recommandé)
cd ~/aidyn-landing
./start-claude.sh

# Option 2: Manuel
cd ~/aidyn-landing
export ANTHROPIC_API_KEY="your-api-key-here"
claude
```

## 💡 Exemples de Commandes

### Développement Landing Page
```bash
"Analyse ce projet AIDYN et améliore la structure des composants React"
"Crée une section hero moderne avec animation pour AIDYN Technologies"
"Optimise le design Tailwind CSS pour être plus professionnel"
"Ajoute une section témoignages clients avec du contenu placeholder"
```

### Améliorations Techniques
```bash
"Améliore les performances de ce site Next.js"
"Ajoute TypeScript strict et corrige toutes les erreurs"
"Crée un système de composants réutilisables"
"Configure ESLint et Prettier avec les meilleures pratiques"
```

### Business & Marketing
```bash
"Optimise le SEO de cette landing page pour 'technologies Québec'"
"Crée du contenu marketing pour une entreprise tech québécoise"
"Ajoute Google Analytics et pixels de conversion"
"Améliore les call-to-action pour augmenter les conversions"
```

## 🎯 Contexte Automatique

Claude Code connaît automatiquement :
- ✅ **Projet**: AIDYN Technologies Landing Page
- ✅ **Propriétaire**: Mathieu Chamberland  
- ✅ **Stack**: Next.js + TypeScript + Tailwind
- ✅ **Objectif**: Site marketing professionnel
- ✅ **Public**: Entrepreneurs québécois

## 🔧 Commandes Utiles

### Mode Interactif (recommandé)
```bash
claude                    # Démarre session interactive
```

### Mode One-Shot
```bash
claude --print "votre prompt ici"    # Réponse directe
```

### Continuer Session
```bash
claude --continue         # Continue dernière conversation
```

## 📂 Structure Projet

Le contexte CLAUDE.md informe automatiquement Claude sur :
- Architecture Next.js actuelle
- Objectifs business AIDYN
- Public cible québécois  
- Standards de code préférés

## 🚨 Résolution de Problèmes

### Si Claude ne démarre pas :
```bash
# Vérifier la version
claude --version

# Vérifier la clé API
echo $ANTHROPIC_API_KEY

# Réinstaller si nécessaire
npm install -g @anthropic-ai/claude-code
```

### Si erreur d'authentification :
- Vérifiez votre clé API sur console.anthropic.com
- Assurez-vous qu'elle commence par "sk-ant-api03-"
- Re-exportez la variable d'environnement

## 🎉 Prêt !

Votre Claude Code est maintenant configuré pour développer AIDYN Technologies !

**Commande de démarrage** :
```bash
cd ~/aidyn-landing && ./start-claude.sh
```