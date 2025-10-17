# AIDYN Technologies – Landing Page

## Résumé / Overview
- **Produit**: SerenaCare AI – plateforme de surveillance intelligente pour résidences privées pour aînés (RPA).
- **Portée**: Mise de l’avant de la **Phase 1** du plan d’affaires 2025–2026 (fondations, pilote Auberge Boischatel, financement initial).
- **Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion.
- **Design**: Aligné sur les visuels fournis (gradients bleu nuit, cartes SerenaCare, grilles structurant les jalons).

## Mise en route / Getting started
```bash
# Installer les dépendances / install dependencies
npm install

# Lancer le serveur de dev / start dev server (port 3000, accessible sur le LAN)
npm run dev

# Variante Turbopack (optionnelle)
npm run dev:turbo

# Vérifier la qualité du code (ESLint) / lint the project
npm run lint
```

### Qualité / Quality
- `npm run lint` doit retourner `✔ No ESLint warnings or errors` avant tout déploiement ou merge.

### Dépannage / Troubleshooting
- **Erreur `Missing script: "dev"`** :
  - assurez-vous d'être dans le dossier `aidyn-landing` contenant `package.json` avant d'exécuter `npm run dev` ;
  - listez les scripts disponibles avec `npm run` si le doute persiste.
- **Erreur `Missing script: "lint"`** :
  - exécutez `npm install` après un `git pull` pour synchroniser les dépendances et scripts définis dans `package.json` ;
  - vérifiez la présence de la commande dans `package.json` > `scripts` et réessayez `npm run lint`.
- **Port déjà utilisé** : lancez `npm run dev -- --port 3001` pour choisir un autre port.

## Structure
- `src/app/page.tsx`: composition de la page principale.
- `src/components/Hero.tsx`: section d’introduction axée sur la confiance et la Phase 1.
- `src/components/PhaseOne.tsx`: feuille de route détaillée Oct. 2025 – Fév. 2026.
- `src/components/RpaSolution.tsx`: présentation SerenaCare (dispositifs, architecture edge/cloud, respect vie privée).
- `src/components/Features.tsx`: piliers techniques alignés sur les livrables Phase 1.
- `src/components/Services.tsx`: verticales IA (Santé, Automatisation RPA, Immobilier).
- `public/`: visuels officiels AIDYN.

## Contenu Phase 1
- **Objectifs KPI**: précision ≥95 %, réduction incidents ≥40 %, uptime &gt;99,5 %.
- **Financement recherché**: Subventions MAPAQ (50 k$) et AGE-WELL (25 k$), alternatives CRSNG/PARI.
- **Pilote Auberge Boischatel**: installation capteurs, SLA &lt;1 h, collecte incidents (50+), rapports mensuels.
- **Prochaines étapes**: certification CE/RoHS et Série Seed 300 k$ après pilote réussi.

## Accessibilité & conformité
- Animations modérées (Framer Motion) désactivées si section hors écran.
- Couleurs contrastées selon palette bleu nuit AIDYN.
- Images optimisées via `next/image`.

## Déploiement
- Projet prêt pour Vercel (`npm run build`).
- Ajouter `NEXT_PUBLIC_ANALYTICS_ID` au besoin pour Google Analytics.

---

## English snapshot
- **Product**: SerenaCare AI – intelligent safety platform for senior living facilities.
- **Scope**: Highlights Business Plan Phase 1 (foundations, Auberge Boischatel pilot, grants strategy).
- **Stack**: Next.js 14 + TypeScript + Tailwind + Framer Motion.
- **Design**: Matches provided dark teal visuals and SerenaCare product shots.

### Development
```bash
npm install
npm run dev
npm run lint
```

- Ensure `npm run lint` completes with `✔ No ESLint warnings or errors` prior to merging.

### Key sections
- `Hero`: trust-first messaging, Phase 1 KPIs.
- `PhaseOne`: milestone timeline (Oct 2025 – Feb 2026) with success criteria.
- `RpaSolution`: hardware/software kit and privacy commitments.
- `Features`: technical pillars required for the pilot.
- `Services`: three business verticals (Health, RPA automation, Real estate).

### Phase 1 recap
- KPI targets: ≥95% detection accuracy, ≥40% fewer incidents, &gt;99.5% uptime.
- Funding: MAPAQ 50k CAD + AGE-WELL 25k CAD, alternative programs (NSERC Alliance, NRC IRAP).
- Pilot: Auberge Boischatel (12 UniFi cameras, 8 Vayyar sensors, Jetson modules, SLA &lt;1 h).
- Next steps: CE/RoHS certification and 300k CAD Seed round post-pilot.

