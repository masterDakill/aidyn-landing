# 📸 Guide Polycam 3D - Intégration AIDYN

Guide complet pour scanner des objets réels avec Polycam et les intégrer au site AIDYN.

---

## 📱 Qu'est-ce que Polycam?

**Polycam** est une application mobile qui transforme votre téléphone en scanner 3D professionnel.

### Utilisations pour AIDYN:
- ✅ Scanner le **bracelet SerenaCare** réel
- ✅ Scanner des **environnements RPA** (salles, espaces)
- ✅ Scanner des **prototypes** de dispositifs
- ✅ Créer des **démos photoréalistes**

### Avantages vs Modélisation 3D:
- 📸 **Photoréalisme** - Textures réelles capturées
- ⚡ **Rapidité** - 5 minutes vs 5 heures de modélisation
- 🎯 **Précision** - Dimensions exactes de l'objet réel
- 💰 **Économique** - Pas besoin de 3D artist

---

## 🚀 Installation et Setup

### Étape 1: Télécharger Polycam

**iOS (iPhone/iPad):**
- App Store: https://apps.apple.com/app/polycam-lidar-3d-scanner/id1532482376
- Nécessite: iPhone 12 Pro ou plus récent (avec LiDAR pour meilleurs résultats)

**Android:**
- Google Play: https://play.google.com/store/apps/details?id=com.polycam3d
- Fonctionne sur la plupart des téléphones récents

### Étape 2: Créer un Compte

- Compte gratuit: 5 scans/mois
- Pro ($10/mois): Scans illimités + export GLB
- Team ($50/mois): Collaboration + 4K textures

**Pour AIDYN:** Le plan gratuit suffit pour tester, Pro recommandé pour production.

---

## 📸 Scanner un Objet avec Polycam

### Préparation du Scan

**1. Choisir l'Objet**
- Bracelet SerenaCare
- Prototype de dispositif
- Maquette d'environnement RPA

**2. Setup Environnement**
- ✅ **Éclairage uniforme** (pas de lumière directe dure)
- ✅ **Fond neutre** (éviter motifs complexes)
- ✅ **Objet stable** (poser sur table tournante si possible)
- ✅ **Éviter surfaces brillantes** (réflexions perturbent scan)

**3. Préparer l'Objet**
- Si brillant: Vaporiser poudre matifiante (optionnel)
- Si transparent: Coller marqueurs temporaires
- Si symétrique: Ajouter repères visuels

### Process de Scan (Étape par Étape)

#### Mode 1: LiDAR (iPhone Pro uniquement)

1. **Ouvrir Polycam** → Nouveau Scan → LiDAR
2. **Pointer vers l'objet** et attendre qu'il soit détecté (cadre vert)
3. **Tourner autour de l'objet lentement** (360°)
   - Garder distance ~30-50cm
   - Mouvements fluides et lents
   - Capturer tous les angles (haut, bas, côtés)
4. **Stop** quand zone bleue couvre tout l'objet
5. **Processing automatique** (1-2 minutes)

#### Mode 2: Photo Mode (Tous téléphones)

1. **Ouvrir Polycam** → Nouveau Scan → Photo Mode
2. **Prendre 30-50 photos** autour de l'objet
   - Superposition 70% entre photos
   - Varier hauteur et angles
   - Pas de flou de mouvement
3. **Upload photos** pour processing cloud
4. **Attendre processing** (5-15 minutes)

### Tips pour Scan de Qualité

**DO ✅:**
- Tourner autour de l'objet (pas bouger l'objet)
- Capturer tous les angles (haut, bas, dessous si possible)
- Mouvements lents et fluides
- Superposition 70% entre frames
- Éclairage indirect et uniforme

**DON'T ❌:**
- Bouger trop vite (flou)
- Sauter des angles (trous dans modèle)
- Scanner objets brillants/transparents sans préparation
- Scanner sous lumière directe du soleil
- Utiliser flash du téléphone

---

## 🎨 Éditer le Scan dans Polycam

### Après le Scan

1. **Crop (Recadrage)**
   - Enlever le fond et surfaces inutiles
   - Garder seulement l'objet d'intérêt
   - Utiliser outil sélection box ou lasso

2. **Smooth (Lissage)**
   - Réduire noise et artéfacts
   - Niveau: 2-3 (ne pas trop lisser)

3. **Fill Holes (Remplir Trous)**
   - Combler petits trous automatiquement
   - Vérifier résultat (parfois mieux laisser)

4. **Optimize Mesh**
   - Target: 50,000-100,000 triangles pour web
   - Balance qualité/performance

5. **Texture Quality**
   - 2K: Standard (web optimal)
   - 4K: Haute qualité (plan Pro)

---

## 💾 Exporter pour le Site AIDYN

### Format d'Export

**Recommandé: GLB**
- Fichier unique avec mesh + textures
- Compatible Three.js/React
- Facile à uploader

### Steps d'Export

1. **Dans Polycam** → Ouvrir le scan
2. **Share/Export** → Export as 3D Model
3. **Format:** GLB (glTF Binary)
4. **Options:**
   - Include textures: ✅ Oui
   - Optimize for web: ✅ Oui
   - Max texture size: 2048px (2K)
5. **Download** le fichier `.glb`

### Taille Fichier

**Objectifs:**
- Dispositif petit (bracelet): < 5 MB
- Objet moyen: < 10 MB
- Scène/environnement: < 20 MB

**Si trop gros:**
- Réduire texture à 1K (1024px)
- Optimize mesh plus agressif (moins triangles)
- Utiliser gltf.report pour compression

---

## 🚀 Intégrer au Site AIDYN

### Option A: Remplacer Modèle Existant

```bash
# Renomme ton export Polycam
mv mon-scan-polycam.glb polycam-example.glb

# Copie dans le dossier public
cp polycam-example.glb /home/user/webapp/public/models/

# Le site l'affichera automatiquement dans la galerie
```

### Option B: Ajouter Nouveau Slot

Édite `src/components/Model3DShowcase.tsx`:

```tsx
const models: ModelConfig[] = [
  // ... autres modèles ...
  {
    id: 'mon-scan',
    name: 'Scan Bracelet SerenaCare',
    description: 'Scan 3D réel du prototype bracelet',
    modelPath: '/models/mon-scan-polycam.glb',
    icon: Box,
    scale: 1.5,
    rotation: [0, 0, 0],
    position: [0, -0.2, 0],
    cameraPosition: [0, 0, 3],
    environmentPreset: 'studio'
  }
]
```

### Option C: Utiliser Directement

Dans n'importe quel composant:

```tsx
import dynamic from 'next/dynamic'
const Model3D = dynamic(() => import('@/components/Model3D'), { ssr: false })

<Model3D 
  modelPath="/models/mon-scan-polycam.glb"
  scale={1.5}
  autoRotate={true}
  environmentPreset="studio"
/>
```

---

## ⚡ Optimisation Post-Export

### Compression avec gltf.report

1. Va sur https://gltf.report/
2. Upload ton fichier GLB exporté de Polycam
3. Onglet **"Compress"**
4. Options recommandées:
   - Draco compression: ✅ Activé
   - Quantization: 12 bits (balance qualité/taille)
   - Texture compression: WebP ou Basis
5. Download version compressée (50-90% plus léger!)

### Avant/Après Exemples

| Modèle | Polycam Export | Après Compression | Gain |
|--------|---------------|-------------------|------|
| Bracelet | 8 MB | 1.2 MB | -85% |
| Dispositif | 12 MB | 2.5 MB | -79% |
| Environnement | 35 MB | 8 MB | -77% |

---

## 📐 Cas d'Usage AIDYN Spécifiques

### 1. Scanner Bracelet SerenaCare

**Setup:**
- Poser bracelet sur support neutre
- Éclairage: Boîte à lumière ou lumière diffuse
- 360° complet + vue dessus/dessous

**Résultat attendu:**
- Taille: ~5-8 MB (avant compression)
- Après optimisation: ~1-2 MB
- Qualité: Photoréaliste avec détails capteurs

**Usage sur site:**
- Hero section (rotation automatique)
- Page produit SerenaCare
- Galerie 3D interactive

---

### 2. Scanner Environnement RPA

**Setup:**
- Mode Room Scan (LiDAR)
- Capturer salle de séjour, chambre, ou couloir
- Inclure caméras UniFi dans le scan

**Résultat attendu:**
- Taille: ~20-40 MB (avant compression)
- Après optimisation: ~8-15 MB
- Usage: Démo immersive du déploiement

---

### 3. Scanner Prototypes Hardware

**Setup:**
- Prototype Jetson setup
- Dispositif edge computing
- Mockup installation

**Résultat attendu:**
- Documentation technique 3D
- Démos formation
- Marketing matériel

---

## 🎯 Workflow Complet AIDYN

### Workflow Idéal: Prototype → Site Web

```
1. Fabriquer prototype SerenaCare
   ↓
2. Scanner avec Polycam (LiDAR ou Photo)
   ↓
3. Éditer dans Polycam (crop, smooth, optimize)
   ↓
4. Exporter GLB (2K textures)
   ↓
5. Compresser avec gltf.report
   ↓
6. Uploader dans /public/models/
   ↓
7. Tester dans /modeles-3d
   ↓
8. Intégrer dans sections marketing
```

**Temps total:** 30-60 minutes (incluant scan et optimisation)

---

## 💡 Tips Avancés

### Améliorer Qualité Scan

**1. Multi-Pass Scanning**
- Pass 1: Scan général 360°
- Pass 2: Focus détails importants (capteurs, logo)
- Fusionner les deux dans Polycam

**2. Lighting Setup Pro**
- Boîte à lumière DIY (papier blanc + lampes)
- Éviter ombres dures
- Température couleur cohérente (5500K daylight)

**3. Texture Enhancement**
- Export textures séparément
- Éditer dans Photoshop (contraste, netteté)
- Réimporter dans Polycam

### Scans Difficiles

**Objets Brillants:**
- Vaporiser poudre matifiante temporaire
- Ou utiliser lumière polarisée
- Ou éditer texture post-scan

**Objets Transparents:**
- Coller marqueurs papier temporaires
- Scanner avec fond contrasté
- Post-process pour nettoyer

**Objets Noirs/Blancs Purs:**
- Ajouter repères visuels (stickers temporaires)
- Ajuster exposition caméra manuellement

---

## 📚 Ressources Utiles

### Tutoriels Polycam
- Chaîne YouTube officielle: https://www.youtube.com/c/Polycam3D
- Documentation: https://docs.polycam.ai/
- Community Discord: https://discord.gg/polycam

### Optimisation 3D
- gltf.report: https://gltf.report/
- glTF-Transform: https://gltf-transform.donmccurdy.com/
- Three.js docs: https://threejs.org/docs/

### Alternatives à Polycam
- **Luma AI** (iOS) - Plus automatique
- **Scaniverse** (iOS) - Gratuit, simple
- **RealityScan** (iOS/Android) - Epic Games
- **Meshroom** (Desktop) - Open source, gratuit

---

## ✅ Checklist Scan Parfait

Avant de scanner:
- [ ] Objet propre et bien éclairé
- [ ] Fond neutre préparé
- [ ] Batterie téléphone >50%
- [ ] Espace libre pour tourner autour
- [ ] Plan de scan (angles à capturer)

Pendant le scan:
- [ ] Mouvements lents et fluides
- [ ] Superposition 70% entre frames
- [ ] Tous angles capturés (360° + haut/bas)
- [ ] Distance constante (~30-50cm)
- [ ] Vérifier couverture en temps réel

Après le scan:
- [ ] Crop proprement (enlever fond)
- [ ] Smooth modéré (niveau 2-3)
- [ ] Optimize mesh (<100k triangles)
- [ ] Export GLB 2K
- [ ] Compression gltf.report
- [ ] Test sur site web
- [ ] Ajustements scale/position

---

## 🎬 Exemple Concret: Scanner SerenaCare

### Matériel Nécessaire
- iPhone 12 Pro ou plus récent (LiDAR)
- Bracelet SerenaCare prototype
- Support tournant (ou tourner manuellement)
- 2 lampes LED diffuses
- Fond blanc/gris neutre

### Steps Détaillés

**1. Setup (5 min)**
```
- Poser bracelet sur support à hauteur yeux
- 2 lampes à 45° de chaque côté
- Fond blanc vertical derrière
```

**2. Scan LiDAR (3 min)**
```
- Ouvrir Polycam → LiDAR
- Détecter bracelet (cadre vert)
- Tourner 360° lentement
- Capturer vue dessus (pencher téléphone)
- Stop quand couverture 100%
```

**3. Edit (5 min)**
```
- Crop: Enlever support et fond
- Smooth: Niveau 2
- Optimize: 75k triangles
- Texture: 2K
```

**4. Export (2 min)**
```
- Format: GLB
- Include textures: Oui
- Download
```

**5. Optimize (3 min)**
```
- Upload sur gltf.report
- Compress avec Draco
- Download (1.5 MB au lieu de 8 MB)
```

**6. Intégrer (2 min)**
```bash
mv bracelet-scan.glb serenacare-device.glb
cp serenacare-device.glb /home/user/webapp/public/models/
git add public/models/serenacare-device.glb
git commit -m "feat: add real SerenaCare device Polycam scan"
git push
```

**Total: 20 minutes** du scan à la mise en ligne! 🚀

---

## 💬 Besoin d'Aide?

Si tu scannes un objet AIDYN:
1. Suis ce guide étape par étape
2. Teste d'abord avec un objet simple
3. Envoie-moi le GLB pour vérification avant intégration
4. Je peux optimiser et intégrer pour toi

**Happy Scanning!** 📸✨
