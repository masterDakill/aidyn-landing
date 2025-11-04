# 🚀 Guide de Transition Builder.io - AIDYN Technologies

## 📊 Statut Actuel de la Configuration

### ✅ Ce qui est DÉJÀ configuré:
- [x] SDK Builder.io installé (`@builder.io/react` v8.2.9)
- [x] Clé API configurée dans `.env.local`
- [x] Configuration Builder.io (`src/lib/builder.ts`)
- [x] 4 composants adaptés et enregistrés:
  - HeroAdapter
  - FeaturesAdapter
  - InteractiveTestimonialsAdapter
  - ContactAdapter
- [x] Route dynamique `[...page]` pour pages Builder.io
- [x] BuilderRegistryProvider dans layout.tsx
- [x] Documentation complète

### 🔄 Ce qu'il reste à faire:
1. Configurer votre compte Builder.io en ligne
2. Créer votre premier modèle "page" dans Builder.io
3. Créer une page de test
4. Tester l'intégration en local
5. (Optionnel) Créer un modèle "section" pour sections réutilisables

---

## 🎯 Étape 1: Configuration du Compte Builder.io (15 min)

### 1.1 Créer/Se connecter à votre compte

1. Allez sur https://builder.io
2. Connectez-vous ou créez un compte gratuit
3. Créez un nouveau "Space" pour AIDYN Technologies (si pas déjà fait)

### 1.2 Vérifier votre clé API

1. Dans Builder.io, cliquez sur votre avatar en haut à droite
2. Allez dans **Account Settings** → **Space Settings**
3. Copiez votre **Public API Key**
4. Vérifiez qu'elle correspond à celle dans `.env.local`:
   ```bash
   NEXT_PUBLIC_BUILDER_API_KEY=4db9e5299a5e4e3f8495bde095aca588
   ```

✅ **Si la clé correspond**: Parfait, passez à l'étape suivante!
❌ **Si différente**: Mettez à jour `.env.local` avec la nouvelle clé

---

## 🎯 Étape 2: Démarrer le Serveur Local (2 min)

```bash
# Dans le terminal, à la racine du projet:
npm run dev
```

Votre site devrait être accessible sur **http://localhost:3000**

Vérifiez dans la console du terminal que vous voyez:
```
✅ Builder.io components registered: Hero, Features, InteractiveTestimonials, Contact
```

---

## 🎯 Étape 3: Créer Votre Premier Modèle "Page" (5 min)

### 3.1 Aller dans Models

1. Dans Builder.io, cliquez sur **Models** dans la barre latérale
2. Vous devriez voir le modèle "page" (créé automatiquement)
3. Si le modèle "page" n'existe pas, créez-le:
   - Cliquez sur **+ New Model**
   - Name: `page`
   - Type: **Page**
   - Description: "Pages complètes du site AIDYN"
   - Cliquez sur **Create Model**

### 3.2 Configurer le modèle "page"

1. Ouvrez le modèle "page"
2. Dans **Preview URL**, entrez: `http://localhost:3000`
3. Activez **Show Preview** pour voir les modifications en temps réel
4. Sauvegardez

---

## 🎯 Étape 4: Créer Votre Première Page de Test (10 min)

### 4.1 Créer une nouvelle page

1. Cliquez sur **Content** dans la barre latérale
2. Cliquez sur **+ New**
3. Sélectionnez le modèle **page**
4. Configurez:
   - **Name**: "Test Landing Page"
   - **URL Path**: `/test-builder` (important: commencer par `/`)

### 4.2 Ajouter vos composants personnalisés

1. Dans l'éditeur visuel, cherchez **"Custom Components"** dans le panneau de gauche
2. Vous devriez voir vos 4 composants:
   - **Hero**
   - **Features**
   - **InteractiveTestimonials**
   - **Contact**

3. Glissez-déposez le composant **Hero** dans la page
4. Cliquez sur le composant Hero pour voir les propriétés éditables
5. Modifiez le titre, sous-titre, etc.

### 4.3 Prévisualiser et publier

1. Cliquez sur **Preview** en haut à droite
2. Vérifiez que votre page s'affiche correctement
3. Cliquez sur **Publish** pour rendre la page publique

### 4.4 Tester la page

Ouvrez dans votre navigateur: **http://localhost:3000/test-builder**

Vous devriez voir votre page avec le composant Hero!

---

## 🎯 Étape 5: Créer un Modèle "Section" (Optionnel) (5 min)

Les sections permettent d'ajouter du contenu éditable ENTRE vos composants existants.

### 5.1 Créer le modèle "section"

1. Dans Builder.io, allez dans **Models**
2. Cliquez sur **+ New Model**
3. Configurez:
   - **Name**: `section`
   - **Type**: **Section**
   - **Description**: "Sections réutilisables (bannières, CTA, etc.)"
4. Cliquez sur **Create Model**

### 5.2 Créer une section de test

1. Allez dans **Content** → **+ New**
2. Sélectionnez le modèle **section**
3. Name: `promotional-banner`
4. Ajoutez du contenu (texte, bouton, image)
5. Publiez

### 5.3 Utiliser la section dans page.tsx

Ouvrez `src/app/page.tsx` et ajoutez:

```tsx
import BuilderSection from '@/components/builder/BuilderSection'

// Dans votre composant, entre deux sections existantes:
<BuilderSection sectionName="promotional-banner" />
```

Rechargez http://localhost:3000 - votre section devrait apparaître!

---

## 🎨 Stratégies de Transition Recommandées

### Option A: Transition Progressive (Recommandée)

**Avantages**: Moins risqué, testable étape par étape

**Étapes**:
1. **Semaine 1**: Créer des sections Builder.io pour bannières/CTA
   ```tsx
   <BuilderSection sectionName="black-friday-banner" />
   ```

2. **Semaine 2**: Créer une page landing complète dans Builder.io
   - URL: `/landing/promotion-noel`
   - Utiliser vos composants personnalisés

3. **Semaine 3**: Remplacer progressivement les sections statiques
   - Commencer par les sections qui changent souvent (Hero, Contact)

4. **Semaine 4**: Migration complète (si souhaité)

### Option B: Système Hybride (Recommandée pour AIDYN)

**Avantages**: Meilleur équilibre flexibilité/contrôle

**Configuration**:
- **Pages principales** (Home, About): Restent en code
- **Pages marketing** (Landing, Promos): Builder.io
- **Sections dynamiques** (Bannières, CTA): Builder.io
- **Composants core** (Navigation, Footer): Restent en code

**Exemple page.tsx hybride**:
```tsx
export default function HomePage() {
  return (
    <>
      <Navigation /> {/* Code */}

      <main>
        <section id="hero">
          <HeroImmersive3D /> {/* Code */}
        </section>

        {/* Section Builder.io éditable */}
        <BuilderSection sectionName="announcement-banner" />

        <section id="how-it-works">
          <HowItWorks /> {/* Code */}
        </section>

        {/* Section Builder.io pour promotions */}
        <BuilderSection sectionName="seasonal-promotion" />

        <section id="features">
          <Features /> {/* Code */}
        </section>
      </main>

      <Footer /> {/* Code */}
    </>
  )
}
```

### Option C: Builder.io First

**Avantages**: Maximum de flexibilité pour l'équipe marketing

**Quand utiliser**: Si vous voulez que l'équipe marketing puisse tout modifier

**Configuration**:
- Toutes les pages deviennent des pages Builder.io
- Les composants restent en code mais sont éditables via Builder.io

---

## 🔧 Cas d'Usage Pratiques

### Cas 1: Ajouter une bannière promotionnelle

**Dans Builder.io**:
1. Content → + New → section
2. Name: `cyber-monday-banner`
3. Ajoutez texte + bouton CTA
4. Publiez

**Dans votre code** (`src/app/page.tsx`):
```tsx
<BuilderSection sectionName="cyber-monday-banner" />
```

### Cas 2: Créer une landing page pour une campagne

**Dans Builder.io**:
1. Content → + New → page
2. Name: "Landing Campagne LinkedIn"
3. URL: `/landing/linkedin-q4`
4. Glissez-déposez: Hero → Features → Contact
5. Personnalisez le contenu
6. Publiez

**Résultat**: Page accessible sur `/landing/linkedin-q4`

### Cas 3: A/B Testing d'un Hero

**Dans Builder.io**:
1. Ouvrez votre page
2. Cliquez sur le composant Hero
3. Click sur **+ Add Variant** en haut
4. Créez "Variant B" avec un titre différent
5. Configurez le split 50/50
6. Publiez

Builder.io trackera automatiquement les conversions!

---

## 📊 Checklist de Validation

Avant de considérer la transition complète:

- [ ] Compte Builder.io configuré
- [ ] Clé API vérifiée dans `.env.local`
- [ ] Serveur local fonctionne (`npm run dev`)
- [ ] Console affiche "✅ Builder.io components registered"
- [ ] Modèle "page" créé dans Builder.io
- [ ] Page de test créée et publiée
- [ ] Page de test accessible sur `/test-builder`
- [ ] (Optionnel) Modèle "section" créé
- [ ] (Optionnel) Section de test intégrée dans page.tsx

---

## 🆘 Troubleshooting

### Problème 1: Les composants n'apparaissent pas dans Builder.io

**Symptôme**: L'onglet "Custom Components" est vide

**Solutions**:
1. Vérifiez que le serveur local tourne (`npm run dev`)
2. Vérifiez la console navigateur pour erreurs
3. Dans Builder.io, allez dans Settings → Advanced → Enter Preview URL: `http://localhost:3000`
4. Rechargez l'éditeur Builder.io (Ctrl+R / Cmd+R)
5. Vérifiez que `BuilderRegistryProvider` est bien dans `layout.tsx`

### Problème 2: "Builder API Key is missing"

**Symptôme**: Erreur au démarrage du serveur

**Solutions**:
1. Vérifiez que `.env.local` existe à la racine du projet
2. Vérifiez le contenu: `NEXT_PUBLIC_BUILDER_API_KEY=votre-cle`
3. Redémarrez le serveur: `npm run dev`
4. Si l'erreur persiste, copiez-collez la clé depuis Builder.io

### Problème 3: Page 404 pour `/test-builder`

**Symptôme**: La page Builder.io n'est pas accessible

**Solutions**:
1. Vérifiez que la page est **publiée** dans Builder.io (pas en draft)
2. Vérifiez l'URL dans Builder.io: doit commencer par `/`
3. Attendez 60 secondes (revalidation cache)
4. Forcez le refresh: Ctrl+Shift+R / Cmd+Shift+R
5. Vérifiez que `src/app/[...page]/page.tsx` existe

### Problème 4: Le contenu ne se met pas à jour

**Symptôme**: Les changements dans Builder.io ne sont pas visibles

**Solutions**:
1. Cliquez sur **Publish** dans Builder.io (pas seulement Save)
2. Attendez 60 secondes (ISR revalidation)
3. Forcez le refresh de la page
4. Videz le cache: Paramètres → Clear browsing data

---

## 🎓 Ressources et Formation

### Documentation Officielle
- [Builder.io Docs](https://www.builder.io/c/docs/developers)
- [Next.js + Builder.io](https://www.builder.io/c/docs/developers/frameworks/nextjs)
- [Custom Components](https://www.builder.io/c/docs/custom-components)

### Vidéos Tutoriels
- [Builder.io Getting Started](https://www.youtube.com/c/BuilderIO)
- [Next.js Integration](https://www.builder.io/c/docs/developers/tutorials)

### Communauté
- [Builder.io Forum](https://forum.builder.io/)
- [Discord Community](https://discord.gg/builderio)

---

## 📞 Support

**Questions techniques?**
- Documentation: [BUILDER_README.md](./BUILDER_README.md)
- Exemples: [BUILDER_INTEGRATION_EXAMPLE.md](./BUILDER_INTEGRATION_EXAMPLE.md)
- Support Builder.io: support@builder.io

**Besoin d'aide avec l'intégration?**
- Forum Builder.io: https://forum.builder.io/
- Documentation projet: Voir fichiers `BUILDER_*.md`

---

## ✅ Prochaines Actions Immédiates

1. **Maintenant**:
   ```bash
   npm run dev
   ```

2. **Ensuite**:
   - Allez sur https://builder.io
   - Créez votre première page de test
   - Testez sur http://localhost:3000/test-builder

3. **Puis**:
   - Décidez de votre stratégie (Progressive / Hybride / Builder First)
   - Commencez par une section simple (bannière)
   - Itérez progressivement

---

**Bonne transition vers Builder.io! 🚀**

_Dernière mise à jour: 2025-11-03_
