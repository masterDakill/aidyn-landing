# 🏗️ Builder.io - Guide d'Intégration Complet

Ce document explique l'intégration complète de Builder.io dans le projet AIDYN Landing.

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du Setup](#architecture-du-setup)
3. [Fichiers Créés](#fichiers-créés)
4. [Configuration](#configuration)
5. [Utilisation](#utilisation)
6. [Déploiement](#déploiement)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Vue d'ensemble

Ce projet utilise **Builder.io Option C** (Registered Components), permettant:

✅ Éditer visuellement des composants existants dans Builder.io
✅ Créer de nouvelles pages sans toucher au code
✅ Maintenir les composants code-first tout en ajoutant de la flexibilité
✅ Garder Tailwind CSS + Framer Motion fonctionnels
✅ Site continue à fonctionner sans Builder.io (fallback code-first)

---

## 🏗️ Architecture du Setup

```
src/
├── lib/
│   └── builder.ts                    # Configuration Builder.io
├── builder.register.ts                # Enregistrement des composants
├── components/
│   ├── adapters/                      # Wrappers pour Builder.io
│   │   ├── HeroAdapter.tsx
│   │   ├── FeaturesAdapter.tsx
│   │   ├── InteractiveTestimonialsAdapter.tsx
│   │   └── ContactAdapter.tsx
│   └── builder/                       # Composants Builder.io
│       ├── RenderBuilderContent.tsx   # Rendu du contenu
│       └── BuilderSection.tsx         # Section éditable
└── app/
    ├── layout.tsx                     # Import de l'enregistrement
    ├── [...page]/
    │   └── page.tsx                   # Route dynamique pour pages Builder.io
    └── page.tsx                       # Page d'accueil (existante)
```

---

## 📁 Fichiers Créés

### 1. `src/lib/builder.ts`
**Rôle**: Initialise Builder.io avec la clé API.

```typescript
import { builder } from '@builder.io/react'
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)
export { builder }
```

### 2. `src/builder.register.ts`
**Rôle**: Enregistre les 4 composants dans Builder.io.

Les composants enregistrés:
- `Hero` - Section hero principale
- `Features` - Grille de fonctionnalités
- `InteractiveTestimonials` - Témoignages interactifs
- `Contact` - Formulaire de contact

### 3. `src/components/adapters/*`
**Rôle**: Wrappers qui exposent les composants existants à Builder.io.

Chaque adapter:
- Importe le composant d'origine
- Définit les props éditables (inputs)
- Configure les tags et métadonnées Builder.io

### 4. `src/components/builder/RenderBuilderContent.tsx`
**Rôle**: Composant client qui affiche le contenu Builder.io.

Fonctionnalités:
- Support du mode preview
- Gestion du contenu null
- Inclusion des références de composants

### 5. `src/components/builder/BuilderSection.tsx`
**Rôle**: Permet d'insérer une section éditable Builder.io dans n'importe quelle page.

Utilisation:
```tsx
<BuilderSection sectionName="promotional-banner" />
```

### 6. `src/app/[...page]/page.tsx`
**Rôle**: Route catch-all pour rendre les pages créées dans Builder.io.

Gère:
- Pages dynamiques (ex: `/landing/promo`)
- Rendu SSR avec revalidation
- Page 404 si contenu non trouvé

### 7. `src/app/layout.tsx`
**Rôle**: Mise à jour pour importer la configuration Builder.io.

Imports ajoutés:
```typescript
import '@/lib/builder'
import '@/builder.register'
```

---

## ⚙️ Configuration

### Étape 1: Vérifier la clé API

La clé API est déjà configurée dans `.env.local`:

```bash
NEXT_PUBLIC_BUILDER_API_KEY=4db9e5299a5e4e3f8495bde095aca588
```

✅ **Déjà fait** - Aucune action requise.

### Étape 2: Installer les dépendances

Le SDK Builder.io est déjà installé dans `package.json`:

```json
"@builder.io/react": "^8.2.9"
```

✅ **Déjà fait** - Aucune action requise.

### Étape 3: Démarrer le serveur de développement

```bash
npm run dev
```

Votre site sera accessible sur `http://localhost:3000`.

---

## 🚀 Utilisation

### Option A: Créer une page complète dans Builder.io

1. **Accédez à Builder.io**: https://builder.io
2. **Créez une nouvelle page**:
   - Cliquez sur **Content** → **+ New**
   - Sélectionnez le modèle "page"
   - Nommez votre page (ex: "Landing Promo")
   - Définissez l'URL (ex: `/promo`)

3. **Ajoutez vos composants**:
   - Dans l'éditeur, cherchez "Custom Components"
   - Glissez-déposez: `Hero`, `Features`, `InteractiveTestimonials`, `Contact`
   - Personnalisez le contenu

4. **Publiez**:
   - Cliquez sur **Publish**
   - Votre page sera accessible sur `http://localhost:3000/promo`

### Option B: Ajouter une section éditable dans une page existante

Dans `src/app/page.tsx`, ajoutez:

```tsx
import BuilderSection from '@/components/builder/BuilderSection'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />

        {/* Section Builder.io éditable */}
        <BuilderSection sectionName="promotional-banner" />

        <Features />
        <Contact />
      </main>
    </>
  )
}
```

Ensuite, dans Builder.io:

1. Créez un modèle "section" (si pas déjà fait):
   - Allez dans **Models** → **+ New Model**
   - Name: `section`
   - Type: Section

2. Créez une nouvelle section:
   - **Content** → **+ New** → Modèle "section"
   - Nommez-la: `promotional-banner`
   - Ajoutez du contenu
   - Publiez

### Option C: Remplacer un composant existant

Remplacez un composant statique par une version Builder.io:

```tsx
// Avant
import Hero from '@/components/Hero'
<Hero />

// Après
import BuilderSection from '@/components/builder/BuilderSection'
<BuilderSection sectionName="hero-section" />
```

---

## 🌐 Déploiement

### Vercel (Recommandé)

1. **Ajoutez la variable d'environnement**:
   - Dashboard Vercel → Votre projet → Settings → Environment Variables
   - Ajoutez: `NEXT_PUBLIC_BUILDER_API_KEY` = `4db9e5299a5e4e3f8495bde095aca588`

2. **Déployez**:
```bash
git add .
git commit -m "feat: Add Builder.io integration"
git push origin main
```

3. **Vérifiez**: Vos pages Builder.io seront automatiquement disponibles en production.

### Autres hébergeurs

Ajoutez simplement `NEXT_PUBLIC_BUILDER_API_KEY` dans vos variables d'environnement.

---

## 🔧 Troubleshooting

### Problème: Les composants n'apparaissent pas dans Builder.io

**Solution**:
1. Vérifiez que `src/builder.register.ts` est importé dans `layout.tsx`
2. Vérifiez la console du navigateur pour les erreurs
3. Rechargez l'éditeur Builder.io (Ctrl+R)

### Problème: "NEXT_PUBLIC_BUILDER_API_KEY is missing"

**Solution**:
1. Vérifiez que `.env.local` existe avec la clé API
2. Redémarrez le serveur: `npm run dev`
3. Si en production, vérifiez les variables d'environnement Vercel

### Problème: Page 404 pour une page Builder.io

**Solution**:
1. Vérifiez que la page est **publiée** dans Builder.io
2. Vérifiez l'URL dans Builder.io (doit commencer par `/`)
3. Vérifiez que `src/app/[...page]/page.tsx` existe
4. Testez en mode preview dans Builder.io

### Problème: Les styles Tailwind ne fonctionnent pas

**Solution**:
Les composants gardent leurs styles Tailwind car ils sont wrappés, pas remplacés.
Si problème:
1. Vérifiez que `globals.css` est importé dans `layout.tsx`
2. Vérifiez la configuration Tailwind dans `tailwind.config.ts`

### Problème: Framer Motion animations ne fonctionnent pas

**Solution**:
Les animations Framer Motion sont préservées dans les composants.
Si problème:
1. Vérifiez que les composants sont en `'use client'`
2. Vérifiez que `framer-motion` est installé: `npm list framer-motion`

---

## 📚 Ressources

- [Builder.io Documentation](https://www.builder.io/c/docs/developers)
- [Next.js + Builder.io Guide](https://www.builder.io/c/docs/developers/frameworks/nextjs)
- [Builder.io Forum](https://forum.builder.io/)
- [Exemples d'intégration](./BUILDER_INTEGRATION_EXAMPLE.md)

---

## ✅ Checklist de Validation

Avant de considérer l'intégration complète:

- [x] SDK Builder.io installé (`@builder.io/react`)
- [x] Clé API configurée dans `.env.local`
- [x] Configuration Builder.io créée (`src/lib/builder.ts`)
- [x] 4 composants adaptés et enregistrés
- [x] Route dynamique `[...page]` créée
- [x] `layout.tsx` mis à jour avec les imports
- [x] Composant `BuilderSection` créé pour usage flexible
- [x] Documentation complète fournie

---

## 🎉 Prochaines Étapes

1. **Testez l'intégration**:
```bash
npm run dev
```

2. **Créez votre première page Builder.io**:
   - Allez sur https://builder.io
   - Créez une page de test
   - Ajoutez vos composants personnalisés

3. **Explorez les possibilités**:
   - A/B testing
   - Personnalisation par audience
   - Scheduling de contenu
   - Analytics intégrés

---

**Questions?** Consultez la documentation ou contactez le support Builder.io.
