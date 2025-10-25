# 🔒 SYNTHÈSE INTERNE - CONFIDENTIEL

**AIDYN Technologies - Phase 1 AI Vision UniFi (2026)**

> ⚠️ **DOCUMENT CONFIDENTIEL - USAGE INTERNE UNIQUEMENT**
> 
> Ce document contient des informations sensibles sur le budget, la stratégie technique, et les partenaires.
> Ne pas partager publiquement.

---

## 🏠 1. Hero Section (Version Complète)

**Titre:**
AIDYN Technologies — AI Vision UniFi

**Sous-titre:**
IA de détection de chutes sur vos caméras UniFi existantes
Déploiement pilote 2026 · Aucun changement matériel requis

**CTA principaux:**
- Planifier une démo
- Voir l'architecture technique

**KPI rapides:**
- ≥ 95% précision visée
- 36–54k$ budget Phase 1
- Déploiement pilote 2026
- Résidence partenaire (50 lits)

---

## 🏗️ 2. Architecture Technique Détaillée

**Pipeline complet:**
```
Caméras UniFi Protect (RTSP H.264)
    ↓
NVIDIA Jetson Nano/Orin (Edge AI)
    ↓
YOLOv8 Pose Detection (ONNX FP16/INT8)
    ↓
FastAPI Backend + PostgreSQL + Redis
    ↓
React Dashboard + WebSocket temps réel
    ↓
Alertes: Slack webhooks + SendGrid email
```

**Infrastructure:**
- Caméras UniFi Protect existantes (aucun ajout matériel)
- UDM Pro comme routeur/NVR
- Jetson Nano (budget) ou Orin (performance) pour inférence locale
- Traitement Edge Computing local et temps réel

**Sécurité:**
- Analyse vidéo edge sans cloud
- Conformité HIPAA/GDPR
- Hébergement Québec souverain
- Logs auditables

**KPI techniques:**
- Précision détection: > 95% (YOLOv8 fine-tuned)
- Latence: < 500ms par frame
- Faux positifs: < 5% (< 2 fausses alertes / 100h footage)
- Uptime visé: > 99.5%
- Scalabilité: 1-8 caméras par Jetson selon modèle

---

## ⚙️ 3. Fonctionnalités Techniques

### Analyse Vidéo
- Consommation flux RTSP UniFi Protect
- Preprocessing + inférence YOLOv8 à 30 FPS
- Détection posture + classification chute temps réel

### Edge AI
- NVIDIA Jetson Nano ou Orin
- GPU CUDA acceleration
- Modèle ONNX optimisé (quantization FP16/INT8)

### Alertes
- Webhooks HTTP POST vers FastAPI
- Notifications Slack/Email (SendGrid)
- Dashboard WebSocket temps réel
- Configuration seuils par caméra (confidence > 0.85+)

### Backend
- FastAPI + Python 3.11
- PostgreSQL (événements, analytics)
- Redis (cache, performance)
- Hébergement cloud Québec

### Frontend
- React 18 + TypeScript
- TailwindCSS
- Multi-camera grid view
- Timeline alertes + graphes analytics

### Tests & QA
- Tests unitaires (pytest)
- E2E tests (Cypress)
- CI/CD GitHub Actions
- Monitoring production

---

## 💰 4. Budget Détaillé Phase 1

| Élément | Détail | Coût estimé |
|---------|--------|-------------|
| **Hardware edge** | Jetson Nano (budget) ou Orin (prod) | 390–2,500 $ |
| **Dév. IA/ML** | 80h @ 100$/h (fine-tune YOLOv8, dataset, validation) | 8,000 $ |
| **Backend** | 50h @ 80$/h (FastAPI, PostgreSQL, Redis, webhooks) | 4,000 $ |
| **Frontend** | 50h @ 80$/h (React dashboard, analytics, multi-cam) | 4,000 $ |
| **QA & Tests** | 30h @ 60$/h (tests unitaires, E2E, validation site) | 1,800 $ |
| **Consultant Stratégie** | 150h @ 70$/h (subventions, business plan, pitch) | 10,500 $ |
| **Logiciels + Cloud** | 6 mois hébergement + licences | 1,320 $ |
| **Contingence** | 10% buffer | 4,000 $ |
| **Total MVP (Jetson Nano)** | | **≈ 36k CAD** |
| **Total Prod (Jetson Orin)** | | **≈ 54k CAD** |

**Équipe:**
- 1 développeur IA/ML senior (80h)
- 1 développeur full-stack (100h)
- 1 QA/testeur (30h)
- 1 consultant stratégie/subventions (150h)

---

## 🚀 5. Roadmap Détaillée 2026

### Sprint 1 · Semaines 1-2 (Mars 2026)
**Titre:** Préparation & Données

**Tasks:**
- Audit infrastructure UniFi @ résidence partenaire (caméras, RTSP, réseau)
- Collecte dataset chutes (UP-Fall, URFD, simulations Blender)
- Identification organismes subvention

**Budget:** 2-3k$

**Livrables:**
- Rapport audit technique complet
- Dataset 500-1000 images annotées
- Matrice opportunités financement

---

### Sprint 2 · Semaines 3-6 (Avril 2026)
**Titre:** Entraînement Modèle IA

**Tasks:**
- Fine-tune YOLOv8 pose detection (transfer learning)
- Validation >95% précision, <5% faux positifs
- Optimisation Jetson (quantization FP16/INT8, ONNX export)
- Intégration pipeline RTSP → Inference → Webhook

**Budget:** 12-15k$

**Livrables:**
- Modèle .onnx optimisé Jetson
- Performance report (précision, latence, FPS)
- FastAPI backend fonctionnel

---

### Sprint 3 · Semaines 7-9 (Mai 2026)
**Titre:** Dashboard & Alerting

**Tasks:**
- Dashboard React (multi-cam live, timeline alertes, analytics)
- Intégrations Slack/Email (SendGrid, webhooks)
- Configuration alerting rules (thresholds, debounce, routing)
- Tests unitaires + E2E (Cypress)

**Budget:** 5-7k$

**Livrables:**
- React app complète
- Docker image
- API documentation Swagger

---

### Sprint 4 · Semaines 10-13 (Juin 2026)
**Titre:** Testing & Pilot Go-Live

**Tasks:**
- Déploiement Jetson @ résidence partenaire
- QA site (chutes simulées, false positive testing)
- Formation personnel + procédures incident response
- Case study documentation + Subvention proposals finales

**Budget:** 10-12k$

**Livrables:**
- Site pilote live opérationnel
- QA report complet
- Case study + PR materials
- Dossiers subventions finalisés

---

## 🔬 6. Innovation 3D (Brevetable)

### Technologies Avancées

**1. Analyse Posturale Prédictive**
- YOLOv8 Pose Detection 3D
- MediaPipe 3D Skeleton tracking
- Score de risque prédictif (ML)
- Alertes préventives AVANT chute
- **Impact:** >60% réduction incidents

**2. Carte Thermique 3D Intelligente**
- Multi-View Geometry calibration
- Reconstruction 3D spatiale automatique
- Heatmap historique incidents géolocalisés
- Prédiction zones futures à risque
- ROI calculé par intervention

**3. Vision Multi-Caméra Fusionnée**
- Calibration multi-caméra 3D
- Tracking seamless entre caméras
- Position 3D précise ±10cm
- Précision détection: >98%

**4. Jumeau Numérique Temps Réel**
- WebGL 3D rendering (Three.js)
- Vue complète résidence temps réel
- Overlay résidents + personnel
- Replay incidents en 3D
- Formation virtuelle immersive

**Stack Technologique 3D:**
- YOLOv8 Pose Detection
- MediaPipe 3D Skeleton
- Multi-View Geometry (OpenCV)
- WebGL Rendering (Three.js)
- Real-Time Fusion (Kalman filters)
- Spatial Computing

**Propriété Intellectuelle:**
- Analyse posturale prédictive: Brevetable
- Carte thermique 3D: Exclusif
- Jumeau numérique: Innovation

---

## 📈 7. Critères de Succès MVP

### Métriques Techniques
- **Détection >95%** - Précision chutes détectées avec confidence >0.85 sur test set
- **Faux Positifs <5%** - Moins de 2 fausses alertes par 100h de footage caméra
- **Latence <500ms** - Temps traitement frame RTSP → alerte
- **Uptime >99.5%** - Disponibilité système Jetson + UDM Pro

### Métriques Business
- **Adoption Terrain** - Personnel RPA formé, feedback positif, procédures documentées
- **Satisfaction ≥8/10** - NPS score résidents et famille
- **Incidents Documentés** - 50+ événements capturés (chutes + near-miss)
- **Case Study** - Documentation complète pour marketing

### Financement Phase 2
- Programmes gouvernementaux approuvés
- Validation ROI pilote
- Pipeline commercial (3+ résidences intéressées)

---

## 🧭 8. Vision Produit Long-Terme

### Phase 1 (2026) - Détection Chute IA UniFi
**Focus:** MVP validation technique et marché

**Delivrables:**
- Intégration UniFi Protect + Jetson
- YOLOv8 optimisé edge
- Dashboard React temps réel
- Alertes Slack/Email
- Site pilote opérationnel

**Budget:** 36-54k$ CAD
**Timeline:** 4-6 mois (Mars - Août 2026)
**Partenaire:** Résidence (50 lits)

---

### Phase 2 (2027) - Assistant Vocal IA + Expansion
**Focus:** Évolution produit et scaling

**Nouvelles fonctionnalités:**
- Assistant vocal IA (Whisper STT + LLM local)
- Analyse émotionnelle (détresse, agitation)
- Rapports automatiques conformité
- API publique pour ERP/EMR

**Objectifs:**
- 3-5 résidences déployées
- 200-500 lits couverts
- ARR: 50-100k$ CAD
- Certification CE/RoHS

**Financement:** Seed 300-500k$ CAD

---

### Phase 3 (2028+) - Plateforme SaaS Complète
**Focus:** Produit mature et expansion géographique

**Évolution:**
- SaaS multi-tenant cloud
- Mobile apps (iOS/Android)
- Marché Québec + Ontario + USA (pilote)
- Intégrations avancées (telemedicine, IoT sensors)

**Objectifs:**
- 50+ résidences déployées
- 5,000+ lits couverts
- ARR: 1-2M$ CAD
- Équipe: 10-15 employés

**Financement:** Série A 2-3M$ CAD

---

## 🎯 9. Stratégie Financement

### Phase 1 (2026) - Bootstrap + Subventions
**Objectif:** 36-54k$ CAD

**Sources:**
1. **Subventions gouvernementales** (cible: 30-40k$)
   - Programmes innovation santé
   - Recherche & développement
   - IA & technologies émergentes

2. **Autofinancement** (10-15k$)
   - Fonds propres fondateurs
   - Préventes/pilote payant

3. **Anges Québec** (backup si pilote succès)
   - Pré-seed: 50-100k$
   - Validation KPI requis

### Phase 2 (2027) - Seed Round
**Objectif:** 300-500k$ CAD

**Validation requise:**
- Pilote réussi (KPI atteints)
- 3-5 clients payants signés
- ARR >50k$
- Équipe complétée (CTO, Sales)

### Phase 3 (2028+) - Série A
**Objectif:** 2-3M$ CAD

**Validation requise:**
- 50+ clients actifs
- ARR >1M$
- Équipe 10-15 personnes
- Expansion USA validée

---

## 👥 10. Équipe & Contacts

### Fondateur
**Mathieu Chamberland**
- CEO & Fondateur
- Spécialiste IA et systèmes d'urgence RPA
- Vision: Rendre la détection de chute accessible à toutes les RPA du Québec

### Contact Interne
📧 admin@aidyn.ai
📞 +1 (514) 123-4567
📅 Calendly: aidyn.ai/demo

### Conseillers & Partenaires
- **Technique:** [À définir - Expert IA/Vision]
- **Business:** [À définir - Consultant santé/RPA]
- **Légal:** [À définir - Avocat PI/santé]

---

## 📊 11. Données Marché (Confidentiel)

### Québec - RPA
- **50,000+ lits** en RPA privées
- **Taux chutes:** 30-50% résidents/an
- **Coût moyen incident:** 28,000$ CAD
- **Marché adressable:** 15-25M$ CAD/an

### Problématique
- Pénurie personnel (ratio 1:15+ nuit)
- Temps réponse incident: 10-30 min moyenne
- Traumatisme psychologique résidents/famille
- Coûts assurances en hausse

### Opportunité
- Infrastructure UniFi déjà présente (30-40% RPA)
- Pas de changement hardware = adoption facile
- ROI clair: réduction coûts incidents + assurances
- Conformité réglementaire (CNESST, RSSS)

---

## 🔐 Confidentialité

**Classification:** CONFIDENTIEL - USAGE INTERNE UNIQUEMENT

**Ne pas partager:**
- Budgets détaillés
- Stack technique précis
- Noms partenaires
- Données marché propriétaires
- Stratégie financement

**Autorisé à partager:** Version publique uniquement (voir SYNTHESE-PUBLIQUE.md)

---

**Document créé:** 2025-10-25
**Dernière mise à jour:** 2025-10-25
**Version:** 1.0
**Propriétaire:** AIDYN Technologies Inc.

© 2025 AIDYN Technologies Inc. - Tous droits réservés.
