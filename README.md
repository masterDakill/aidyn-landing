# AIDYN Technologies – Landing Page

## Résumé / Overview
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
- **Produit**: SerenaCare AI – plateforme de surveillance intelligente pour résidences privées pour aînés (RPA).
- **Portée**: Mise de l’avant de la **Phase 1** du plan d’affaires 2025–2026 (fondations, pilote Auberge Boischatel, financement initial).
- **Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion.
- **Design**: Aligné sur les visuels fournis (gradients bleu nuit, cartes SerenaCare) avec une navigation en verre dépoli et un hero mobile-first.

## Mise en route / Getting started
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
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
 codex/adjust-design-according-to-provided-images-2025-10-19

- `npm run lint` doit retourner `✔ No ESLint warnings or errors` avant tout déploiement ou merge.

### Dépannage / Troubleshooting


- `npm run lint` doit retourner `✔ No ESLint warnings or errors` avant tout déploiement ou merge.

### Dépannage / Troubleshooting
 main
- **Erreur `Missing script: "dev"`** :
  - assurez-vous d'être dans le dossier `aidyn-landing` contenant `package.json` avant d'exécuter `npm run dev` ;
  - listez les scripts disponibles avec `npm run` si le doute persiste.
- **Erreur `Missing script: "lint"`** :
  - exécutez `npm install` après un `git pull` pour synchroniser les dépendances et scripts définis dans `package.json` ;
  - vérifiez la présence de la commande dans `package.json` > `scripts` et réessayez `npm run lint`.
- **Port déjà utilisé** :
  - pour le mode dev : `npm run dev -- --port 3001` ;
  - pour la prévisualisation : `PORT=4000 npm run preview` (adaptez le port libre).
- **Images SerenaCare absentes** :
  - la galerie charge maintenant une image par défaut ; si l’affichage reste vide, relancez `npm run dev` après avoir vérifié que le dossier `public/images` est bien synchronisé ;
 codex/adjust-design-according-to-provided-images-2025-10-19
  - le hero et la section produit pointent explicitement vers `public/images`, assurez-vous que les fichiers y sont présents (sinon mettez à jour les chemins) ;
  - en production, exécutez `npm run preview` pour reconstruire le bundle et valider que les assets sont servis sans 404.
- **Vidéo Synthesia bloquée** :
  - vérifiez que le navigateur autorise les iframes `share.synthesia.io` (désactiver les bloqueurs de contenu si nécessaire) ;
  - la section charge l’iframe en lazy-loading, patientez quelques secondes ou rechargez ;
  - en mode hors ligne, remplacez temporairement l’URL dans `VideoPitch.tsx` par un fichier local contrôlé.
- **Erreur `frontend/vite.config.ts` ou `Cannot find module 'vite'` pendant `npm run build` / Vercel** :
  - supprimez toute ancienne arborescence `frontend/` héritée d’une version Vite (`rm -rf frontend`) ;
  - confirmez que `git status` ne liste plus de fichiers `frontend/*` avant de relancer `npm run build` ;
  - Vercel reconstruira automatiquement après un nouveau push propre.

## Structure


  - en production, exécutez `npm run preview` pour reconstruire le bundle et valider que les assets sont servis sans 404.

## Structure
 main
- `src/app/page.tsx`: composition de la page principale.
- `src/components/Logo.tsx`: logotype dynamique (wordmark + monogramme) adapté aux fonds clairs et sombres.
- `src/components/Hero.tsx`: section d’introduction axée sur la confiance et la Phase 1, responsive mobile.
- `src/components/PhaseOne.tsx`: feuille de route détaillée Oct. 2025 – Fév. 2026.
- `src/components/RpaSolution.tsx`: présentation SerenaCare (dispositifs, architecture edge/cloud, respect vie privée).
- `src/components/Features.tsx`: piliers techniques alignés sur les livrables Phase 1.
 codex/adjust-design-according-to-provided-images-2025-10-19
- `src/components/VideoPitch.tsx`: capsule Synthesia intégrée avec rappels KPI et engagements Phase 1.

 main
- `src/components/Services.tsx`: verticales IA (Santé, Automatisation RPA, Immobilier).
- `public/`: visuels officiels AIDYN.

## Contenu Phase 1
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
- **Objectifs KPI**: précision ≥95 %, réduction incidents ≥40 %, uptime &gt;99,5 %.
- **Financement recherché**: Subventions MAPAQ (50 k$) et AGE-WELL (25 k$), alternatives CRSNG/PARI.
- **Pilote Auberge Boischatel**: installation capteurs, SLA &lt;1 h, collecte incidents (50+), rapports mensuels.
- **Prochaines étapes**: certification CE/RoHS et Série Seed 300 k$ après pilote réussi.

## Accessibilité & conformité
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
- Animations modérées (Framer Motion) désactivées si section hors écran.
- Couleurs contrastées selon palette bleu nuit AIDYN.
- Images optimisées via `next/image`.

## Déploiement
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
- Projet prêt pour Vercel (`npm run build`).
- Ajouter `NEXT_PUBLIC_ANALYTICS_ID` au besoin pour Google Analytics.

## Publication GitHub & mise en ligne / GitHub push & go-live
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
1. **Configurer le remote** (une seule fois) :
   ```bash
   git remote add origin git@github.com:<organisation>/<repo>.git
   git remote set-url origin git@github.com:<organisation>/<repo>.git  # pour mettre à jour
   ```
2. **Vérifier la branche active** : la convention est `codex/<feature>-<YYYY-MM-DD>`. Confirmez avec `git status` qu’aucun fichier n’est en attente.
3. **Pousser les commits** :
   ```bash
   git push -u origin <branch>
   ```
   Utilisez un PAT (Personal Access Token) ou une clé SSH avec les droits `repo` si GitHub demande une authentification.
4. **Ouvrir la PR** :
   - depuis la ligne de commande avec `gh pr create --fill` (GitHub CLI) ;
   - ou via l’interface Web en vous rendant sur `https://github.com/<organisation>/<repo>/compare`.
5. **Mettre le site en ligne / Preview** :
   ```bash
   npm run preview          # build + start sur 0.0.0.0:3000 (PORT surchargé si besoin)
   PORT=4000 npm run preview  # exemple si le port 3000 est occupé
   # ou déployer sur Vercel :
   vercel --prod            # nécessite Vercel CLI et variables d'environnement configurées
   ```
6. **Ouvrir le site** :
   - localement : http://localhost:3000 (ou votre adresse LAN) ;
   - Vercel : URL `https://<project>.vercel.app` affichée après le déploiement.

> ⚠️ L’assistant ne peut pas pousser vers GitHub ni déclencher Vercel à votre place ; exécutez les commandes ci-dessus sur votre machine.

---

## English snapshot
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
- **Product**: SerenaCare AI – intelligent safety platform for senior living facilities.
- **Scope**: Highlights Business Plan Phase 1 (foundations, Auberge Boischatel pilot, grants strategy).
- **Stack**: Next.js 14 + TypeScript + Tailwind + Framer Motion.
- **Design**: Matches provided dark teal visuals with a glassmorphism navigation bar and mobile-first hero layout.

### Development
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
```bash
npm install
npm run dev
npm run lint
```

- Ensure `npm run lint` completes with `✔ No ESLint warnings or errors` prior to merging.
 codex/adjust-design-according-to-provided-images-2025-10-19
- **SerenaCare gallery looks empty**: restart `npm run dev` after confirming the `public/images` directory is present. The default asset is auto-selected as of the 2024-02-15 refresh. The hero and SerenaCare product visuals also read from `public/images`, so double-check filenames there. Use `npm run preview` before shipping to confirm no 404s in production mode.
- **Synthesia video blocked**: allow the `share.synthesia.io` iframe (disable content blockers temporarily), wait for the lazy-loaded embed to appear, or replace the URL in `VideoPitch.tsx` with a temporary local asset when offline.
- **Build fails with `frontend/vite.config.ts` or `Cannot find module 'vite'`**: delete any leftover Vite workspace by running `rm -rf frontend`, ensure `git status` is clean, then trigger `npm run build` (or your Vercel redeploy) again.

### Publish to GitHub & launch


- **SerenaCare gallery looks empty**: restart `npm run dev` after confirming the `public/images` directory is present. The default asset is auto-selected as of the 2024-02-15 refresh. Use `npm run preview` before shipping to confirm no 404s in production mode.

### Publish to GitHub & launch
 main
1. Set or update your remote:
   ```bash
   git remote add origin git@github.com:<org>/<repo>.git
   git remote set-url origin git@github.com:<org>/<repo>.git
   ```
2. Confirm your branch follows `codex/<feature>-<YYYY-MM-DD>` and `git status` shows a clean tree.
3. Push your commits:
   ```bash
   git push -u origin <branch>
   ```
4. Open the pull request via GitHub CLI (`gh pr create --fill`) or the web compare view.
5. Serve the production build locally or deploy:
   ```bash
   npm run preview      # build + start on 0.0.0.0:3000 (override PORT as needed)
   PORT=4000 npm run preview  # example if port 3000 is busy
   vercel --prod        # optional Vercel CLI deployment
   ```
6. Visit http://localhost:3000 or your assigned Vercel URL.

> ⚠️ The assistant cannot run `git push` or trigger hosting for you; execute the steps above locally.

### Key sections
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
- `Logo`: dynamic logotype that adapts between compact and full wordmark variants.
- `Hero`: trust-first messaging, Phase 1 KPIs, optimized for small screens.
- `PhaseOne`: milestone timeline (Oct 2025 – Feb 2026) with success criteria.
- `RpaSolution`: hardware/software kit and privacy commitments.
- `Features`: technical pillars required for the pilot.
 codex/adjust-design-according-to-provided-images-2025-10-19
- `VideoPitch`: embedded executive video with KPI reminders and deployment commitments.
- `Services`: three business verticals (Health, RPA automation, Real estate).

### Phase 1 recap


- `Services`: three business verticals (Health, RPA automation, Real estate).

### Phase 1 recap
 main
- KPI targets: ≥95% detection accuracy, ≥40% fewer incidents, &gt;99.5% uptime.
- Funding: MAPAQ 50k CAD + AGE-WELL 25k CAD, alternative programs (NSERC Alliance, NRC IRAP).
- Pilot: Auberge Boischatel (12 UniFi cameras, 8 Vayyar sensors, Jetson modules, SLA &lt;1 h).
- Next steps: CE/RoHS certification and 300k CAD Seed round post-pilot.
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
