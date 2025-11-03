# 🎨 AIDYN Technologies - Modèles 3D

Ce dossier contient les modèles 3D utilisés sur le site AIDYN Technologies.

## 📁 Fichiers Actuels

### Modèles Exemples (Temporaires)
Ces modèles sont des placeholders gratuits de Khronos Group pour démonstration:

1. **logo-aidyn.glb** (4.9 MB)
   - Type: IridescenceLamp (lampe géométrique)
   - Usage: Logo 3D animé dans Hero section
   - À remplacer par: Votre logo AIDYN 3D personnalisé

2. **serenacare-device.glb** (8.6 MB)
   - Type: WaterBottle (bouteille)
   - Usage: Dispositif SerenaCare showcase
   - À remplacer par: Modèle bracelet/dispositif wearable SerenaCare

3. **dashboard-3d.glb** (9.5 MB)
   - Type: Lantern (lanterne)
   - Usage: Dashboard 3D dans Innovation section
   - À remplacer par: Interface dashboard AIDYN 3D

4. **scene.glb** (11 MB)
   - Type: BoomBox
   - Usage: Scène complète RPA
   - À remplacer par: Environnement RPA avec système surveillance

## 🔄 Remplacement des Modèles

### Pour Uploader Vos Propres Modèles:

1. **Préparez vos fichiers**
   - Format recommandé: GLB (fichier unique avec textures)
   - Alternative: GLTF (+ dossier textures/)
   - Taille recommandée: < 5 MB par modèle

2. **Optimisez vos modèles** (recommandé)
   - Utilisez https://gltf.report/ pour compression
   - Ou https://gltf-transform.donmccurdy.com/
   - Cible: réduction 50-90% taille fichier

3. **Nommez correctement**
   - `logo-aidyn.glb` - Logo AIDYN 3D
   - `serenacare-device.glb` - Dispositif wearable
   - `dashboard-3d.glb` - Interface dashboard
   - `scene.glb` ou `scene.gltf` - Scène RPA complète

4. **Remplacez les fichiers**
   ```bash
   # Copie simple
   cp /chemin/vers/votre-logo.glb public/models/logo-aidyn.glb
   
   # Ou via upload interface (à créer)
   ```

## 📐 Spécifications Techniques

### Format GLB (Recommandé)
- ✅ Fichier binaire unique
- ✅ Textures incluses
- ✅ Chargement plus rapide
- ✅ Pas de chemins cassés

### Format GLTF
- ⚠️ Nécessite textures séparées
- ⚠️ Structure:
  ```
  models/
    ├── mon-modele.gltf
    └── textures/
        ├── texture1.png
        └── texture2.jpg
  ```

### Optimisation Recommandée
| Élément | Limite Recommandée |
|---------|-------------------|
| Taille fichier | < 5 MB |
| Vertices (polygones) | < 100,000 |
| Textures | Max 2048x2048 px |
| Matériaux | < 10 matériaux |

## 🎨 Création de Modèles

### Outils Recommandés

**Pour Créer:**
- Blender (gratuit, professionnel)
- Spline (web, facile)
- SketchFab (marketplace)

**Pour Optimiser:**
- gltf-pipeline (CLI)
- gltf.report (web)
- Draco compression

**Pour Exporter:**
- Blender: File → Export → glTF 2.0 (.glb)
- Options: Include → Selected Objects, Textures
- Transform: +Y Up

## 🔍 Sources Modèles Gratuits

Si vous avez besoin de placeholders:
- https://poly.pizza/
- https://sketchfab.com/3d-models?features=downloadable
- https://github.com/KhronosGroup/glTF-Sample-Models

## ⚡ Performance

### Chargement Actuel
- Logo: ~5 MB → 2-3 secondes
- Device: ~9 MB → 3-4 secondes
- Dashboard: ~10 MB → 4-5 secondes
- Scene: ~11 MB → 5-6 secondes

### Après Optimisation (Objectif)
- Logo: < 500 KB → < 1 seconde
- Device: < 2 MB → 1-2 secondes
- Dashboard: < 3 MB → 2-3 secondes
- Scene: < 5 MB → 3-4 secondes

## 📚 Documentation

Voir **GUIDE-MODELES-3D.md** à la racine du projet pour:
- Guide complet d'import
- Exemples d'utilisation
- Troubleshooting
- API des composants

## 🚀 Utilisation dans le Code

```tsx
import Model3D from '@/components/Model3D'

<Model3D 
  modelPath="/models/logo-aidyn.glb"
  scale={1.5}
  autoRotate={true}
  environmentPreset="city"
/>
```

## 💡 Besoin d'Aide?

1. Consultez GUIDE-MODELES-3D.md
2. Testez avec modèles exemples
3. Vérifiez console navigateur (F12)
4. Contactez support technique

---

**Dernière mise à jour:** 26 octobre 2025
