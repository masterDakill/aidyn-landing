# 🎨 Builder.io - Exemples d'Intégration

Ce fichier contient des exemples d'utilisation de Builder.io dans votre projet.

## Option 1: Ajouter une section éditable dans page.tsx

Vous pouvez ajouter des sections éditables Builder.io entre vos composants existants:

```tsx
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Import du composant BuilderSection
import BuilderSection from '@/components/builder/BuilderSection'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section id="hero">
          <Hero />
        </section>

        {/* Section Builder.io éditable - Banner promotionnel */}
        <BuilderSection sectionName="promotional-banner" />

        <section id="features">
          <Features />
        </section>

        {/* Section Builder.io éditable - Bloc CTA personnalisé */}
        <BuilderSection sectionName="custom-cta" />

        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
```

## Option 2: Remplacer une section existante par une version Builder.io

Si vous voulez rendre une section entièrement éditable dans Builder.io:

```tsx
import Navigation from '@/components/Navigation'
// import Hero from '@/components/Hero' // Commenter le composant d'origine
import Features from '@/components/Features'
import Contact from '@/components/Contact'
import BuilderSection from '@/components/builder/BuilderSection'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Remplacer le Hero statique par une version Builder.io */}
        <section id="hero">
          <BuilderSection sectionName="hero-section" />
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  )
}
```

## Option 3: Utiliser les composants registered directement dans Builder.io

1. Allez sur https://builder.io
2. Créez une nouvelle page ou section
3. Dans l'éditeur visuel, vous verrez vos composants personnalisés:
   - **Hero**
   - **Features**
   - **InteractiveTestimonials**
   - **Contact**

4. Glissez-déposez ces composants dans votre page
5. Publiez la page
6. Elle sera accessible via la route dynamique `[...page]`

## Configuration Builder.io

### Étape 1: Obtenir votre clé API

1. Connectez-vous à https://builder.io
2. Allez dans Account Settings → Space Settings
3. Copiez votre "Public API Key"

### Étape 2: Créer votre fichier .env.local

Créez un fichier `.env.local` à la racine du projet:

```bash
NEXT_PUBLIC_BUILDER_API_KEY=votre-cle-api-ici
```

### Étape 3: Créer le modèle "section" dans Builder.io (optionnel)

Pour utiliser `BuilderSection`:

1. Dans Builder.io, allez dans **Models**
2. Cliquez sur **+ New Model**
3. Configurez:
   - Name: `section`
   - Type: **Section**
   - Description: "Sections réutilisables pour le site"
4. Sauvegardez

### Étape 4: Créer votre première section

1. Cliquez sur **Content** puis **+ New**
2. Sélectionnez le modèle "section"
3. Nommez-la (ex: "promotional-banner")
4. Ajoutez du contenu (texte, images, ou vos composants personnalisés)
5. Cliquez sur **Publish**

## Composants disponibles dans Builder.io

Après avoir suivi cette intégration, les composants suivants sont disponibles dans l'éditeur visuel:

### 🎯 Hero
Section hero avec titre, sous-titre, CTA et statistiques.

### ✨ Features
Grille de fonctionnalités avec icônes et descriptions.

### 💬 InteractiveTestimonials
Carousel interactif de témoignages clients avec flip cards.

### 📧 Contact
Formulaire de contact complet avec validation.

## Développement local avec Builder.io

Pour tester en mode preview:

1. Lancez votre serveur de développement:
```bash
npm run dev
```

2. Dans Builder.io, ouvrez votre page en édition
3. Cliquez sur le bouton "Preview" en haut à droite
4. Entrez l'URL: `http://localhost:3000`
5. Vos modifications seront visibles en temps réel

## Déploiement

Après avoir configuré Builder.io:

1. Ajoutez `NEXT_PUBLIC_BUILDER_API_KEY` dans vos variables d'environnement Vercel
2. Déployez normalement avec `git push`
3. Les pages Builder.io seront automatiquement accessibles

## Support et Documentation

- 📚 [Builder.io Documentation](https://www.builder.io/c/docs/developers)
- 🔧 [Next.js + Builder.io Guide](https://www.builder.io/c/docs/developers/frameworks/nextjs)
- 💬 [Builder.io Community Forum](https://forum.builder.io/)
