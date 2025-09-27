#!/bin/bash
# Script de test Claude Code pour AIDYN

echo "🤖 Test de Claude Code pour AIDYN Technologies"
echo "============================================"

# Configuration environnement
export ANTHROPIC_API_KEY="your-api-key-here"
export PATH="/Users/Mathieu/.npm-global/bin:$PATH"

# Aller dans le répertoire du projet
cd /Users/Mathieu/aidyn-landing

echo "📁 Répertoire actuel: $(pwd)"
echo "🔑 Clé API configurée: ${ANTHROPIC_API_KEY:0:20}..."
echo "⚙️  Version Claude: $(claude --version)"
echo ""

echo "🚀 Lancement de Claude Code..."
echo "Tapez 'exit' ou Ctrl+C pour quitter"
echo ""

# Lancer Claude Code en mode interactif
claude