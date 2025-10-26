# 🎨 Guide Complet: Import Modèles 3D (GLTF/GLB)

## 📋 Table des Matières
1. [Prérequis](#prérequis)
2. [Structure des Fichiers](#structure-des-fichiers)
3. [Import Modèles](#import-modèles)
4. [Utilisation Composants](#utilisation-composants)
5. [Optimisation Performance](#optimisation-performance)
6. [Exemples Concrets](#exemples-concrets)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prérequis

### Packages Installés (Déjà fait ✅)
```json
{
  "three": "^0.169.0",
  "@react-three/fiber": "^8.18.0",
  "@react-three/drei": "^9.122.0"
}
```

### Formats Supportés
- ✅ **GLTF** (.gltf + textures séparées)
- ✅ **GLB** (.glb fichier unique binaire) ← **Recommandé**
- ❌ OBJ, FBX, STL (nécessitent loaders additionnels)

---

## 📁 Structure des Fichiers

### Où Placer tes Modèles 3D?

```
public/
  └── models/
      ├── logo-aidyn.glb          ← Logo AIDYN 3D
      ├── serenacare-device.glb   ← Dispositif wearable
      ├── dashboard-3d.glb        ← Interface dashboard
      ├── scene.gltf              ← Scène complète
      └── textures/               ← Textures (si GLTF séparé)
          ├── texture1.png
          └── texture2.jpg
```

### Pourquoi `public/models/`?
- ✅ Next.js sert automatiquement depuis `/public`
- ✅ Accessible via URL: `/models/ton-fichier.glb`
- ✅ Pas de bundling (fichiers 3D volumineux)

---

## 📥 Import de Tes Modèles

### Méthode 1: Upload Manuel (Simple)

**Si tu as les fichiers sur ton ordinateur:**

1. Copie tes fichiers `.glb` ou `.gltf` dans `public/models/`
2. Utilise les composants créés

**Exemple:**
```bash
# Copie ton fichier
cp ~/Downloads/mon-logo.glb public/models/logo-aidyn.glb

# Vérifie
ls public/models/
```

### Méthode 2: Upload via Interface (À créer)

Je peux créer une page d'admin pour uploader des modèles directement depuis le navigateur.

### Méthode 3: Depuis URL Externe

Si ton modèle est hébergé ailleurs:
```tsx
<Model3D 
  modelPath="https://example.com/models/mon-modele.glb"
  scale={1.5}
/>
```

---

## 🎮 Utilisation des Composants

### Composant Simple: `Model3D`

**Usage Basique:**
```tsx
import Model3D from '@/components/Model3D'

export default function MaPage() {
  return (
    <div className="h-96 w-full">
      <Model3D 
        modelPath="/models/logo-aidyn.glb"
        scale={1.5}
        autoRotate={true}
      />
    </div>
  )
}
```

**Toutes les Props Disponibles:**
```tsx
<Model3D 
  // Requis
  modelPath="/models/mon-modele.glb"
  
  // Optionnel
  scale={1.5}                              // Taille (défaut: 1)
  rotation={[0.2, 0.5, 0]}                // Rotation initiale [x, y, z]
  position={[0, -1, 0]}                   // Position [x, y, z]
  autoRotate={true}                       // Rotation auto (défaut: true)
  cameraPosition={[0, 0, 5]}              // Position caméra
  enableZoom={true}                       // Activer zoom molette
  showShadows={true}                      // Afficher ombres
  environmentPreset="studio"              // Éclairage: studio, city, sunset...
  className="rounded-xl shadow-2xl"       // Classes Tailwind
/>
```

### Composant Showcase Complet: `Model3DShowcase`

**Page avec Sélecteur de Modèles:**
```tsx
import Model3DShowcase from '@/components/Model3DShowcase'

export default function Page3D() {
  return <Model3DShowcase />
}
```

**Fonctionnalités incluses:**
- ✅ Sélecteur de modèles (4 slots)
- ✅ Contrôles (rotation auto, ombres)
- ✅ Instructions utilisateur
- ✅ Loading states
- ✅ Design professionnel

---

## ⚡ Optimisation Performance

### 1. Optimiser tes Fichiers GLB/GLTF

**Avant d'importer, réduis la taille:**

#### Option A: En Ligne (Gratuit)
- **gltf.report** → https://gltf.report/
  - Upload ton .glb
  - Analyse performance
  - Compresse automatiquement

- **glTF-Transform** → https://gltf-transform.donmccurdy.com/
  - Draco compression
  - Supprime données inutiles
  - Réduit jusqu'à 90% taille

#### Option B: CLI (Avancé)
```bash
# Installer gltf-pipeline
npm install -g gltf-pipeline

# Optimiser
gltf-pipeline -i input.glb -o output.glb -d
```

### 2. Lazy Loading (Déjà implémenté ✅)

Les composants utilisent déjà:
```tsx
const Model3D = dynamic(() => import('./Model3D'), { 
  ssr: false  // Pas de render côté serveur (Three.js client-only)
})
```

### 3. Niveau de Détail (LOD)

Pour scènes complexes:
```tsx
import { Lod } from '@react-three/drei'

<Lod>
  <mesh geometry={highDetail} material={mat} distance={0} />
  <mesh geometry={mediumDetail} material={mat} distance={10} />
  <mesh geometry={lowDetail} material={mat} distance={20} />
</Lod>
```

### 4. Taille Fichiers Recommandée

| Type | Taille Max | Recommandé |
|------|------------|------------|
| Logo/Icône | 2 MB | < 500 KB |
| Produit | 5 MB | 1-2 MB |
| Scène complète | 10 MB | 3-5 MB |

---

## 🎯 Exemples Concrets AIDYN

### Exemple 1: Logo 3D Animé dans Hero

```tsx
// src/app/page.tsx
import dynamic from 'next/dynamic'

const Model3D = dynamic(() => import('@/components/Model3D'), { ssr: false })

export default function Home() {
  return (
    <section className="bg-slate-950 py-32">
      <div className="container grid lg:grid-cols-2 gap-12">
        {/* Texte */}
        <div>
          <h1 className="text-5xl font-bold text-white">
            AIDYN Technologies
          </h1>
          <p className="mt-4 text-xl text-slate-300">
            Intelligence artificielle pour la sécurité des aînés
          </p>
        </div>

        {/* Logo 3D */}
        <div className="h-96">
          <Model3D 
            modelPath="/models/logo-aidyn.glb"
            scale={2}
            autoRotate={true}
            environmentPreset="city"
            showShadows={false}
          />
        </div>
      </div>
    </section>
  )
}
```

### Exemple 2: Dispositif SerenaCare avec Info

```tsx
export default function SerenaCareSection() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
          {/* Modèle 3D */}
          <div className="h-[500px] rounded-3xl overflow-hidden bg-slate-950 p-8">
            <Model3D 
              modelPath="/models/serenacare-device.glb"
              scale={2.5}
              rotation={[0.3, 0, 0]}
              position={[0, -0.5, 0]}
              cameraPosition={[0, 0, 4]}
              environmentPreset="studio"
            />
          </div>

          {/* Spécifications */}
          <div>
            <h2 className="text-4xl font-bold text-white">
              Dispositif SerenaCare
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Bracelet connecté IP67 avec capteurs biométriques avancés
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sky-400">✓</span>
                <span className="text-slate-200">Protection IP67 étanche</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sky-400">✓</span>
                <span className="text-slate-200">Batterie 7 jours</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sky-400">✓</span>
                <span className="text-slate-200">HIPAA compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Exemple 3: Galerie Interactive (4 Modèles)

```tsx
// Utilise directement Model3DShowcase
import Model3DShowcase from '@/components/Model3DShowcase'

// Dans ta page:
<Model3DShowcase />
```

---

## 🛠️ Troubleshooting

### Problème 1: "Cannot find module 'three/examples/jsm/loaders/GLTFLoader'"

**Solution:**
```bash
# Installer types Three.js
npm install --save-dev @types/three
```

### Problème 2: Modèle ne s'affiche pas (écran noir)

**Vérifications:**
1. Fichier existe? → `public/models/ton-fichier.glb`
2. Path correct? → Doit commencer par `/models/...`
3. Console errors? → F12 → Console
4. Taille fichier? → Fichiers >20MB peuvent être trop gros

**Test rapide:**
```tsx
// Teste avec un modèle simple d'abord
<Model3D 
  modelPath="https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb"
  scale={1}
/>
```

### Problème 3: Performance lente (FPS faible)

**Solutions:**
1. Compresse ton GLB avec gltf.report
2. Réduis `scale` (modèle plus petit = plus rapide)
3. Désactive shadows: `showShadows={false}`
4. Utilise environment simple: `environmentPreset="studio"`

### Problème 4: Textures manquantes

**Si tu utilises GLTF (pas GLB):**
```
public/models/
  ├── mon-modele.gltf
  └── textures/
      ├── texture1.png
      └── texture2.jpg
```

**Mieux: Convertis en GLB** (fichier unique avec textures incluses)

### Problème 5: Hydration Error (Next.js)

**Solution: Toujours utiliser dynamic import**
```tsx
// ✅ Bon
const Model3D = dynamic(() => import('@/components/Model3D'), { ssr: false })

// ❌ Mauvais
import Model3D from '@/components/Model3D'
```

---

## 📚 Ressources Utiles

### Outils Création/Édition 3D
- **Blender** (gratuit) → https://www.blender.org/
- **Spline** (web, gratuit) → https://spline.design/
- **SketchFab** (marketplace) → https://sketchfab.com/

### Modèles 3D Gratuits
- **Khronos GLTF Samples** → https://github.com/KhronosGroup/glTF-Sample-Models
- **Poly Pizza** → https://poly.pizza/
- **Sketchfab Free** → https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount

### Compression GLTF/GLB
- **gltf.report** → https://gltf.report/
- **glTF-Transform** → https://gltf-transform.donmccurdy.com/
- **gltf-pipeline CLI** → https://github.com/CesiumGS/gltf-pipeline

### Documentation Three.js
- **React Three Fiber** → https://docs.pmnd.rs/react-three-fiber
- **Drei Helpers** → https://github.com/pmndrs/drei
- **Three.js Docs** → https://threejs.org/docs/

---

## 🎬 Prochaines Étapes

1. **Place tes fichiers GLB/GLTF** dans `public/models/`
2. **Teste avec composant simple:**
   ```tsx
   <Model3D modelPath="/models/ton-fichier.glb" scale={1.5} />
   ```
3. **Ajuste paramètres** (scale, rotation, camera)
4. **Intègre dans tes pages** (Hero, Product, etc.)
5. **Optimise performance** si nécessaire

---

## 💡 Besoin d'Aide?

Si tu as des questions ou problèmes:
1. Vérifie console navigateur (F12)
2. Teste avec un modèle exemple
3. Vérifie path et taille fichier
4. Demande assistance avec détails erreur

**Happy 3D Modeling! 🎨🚀**
