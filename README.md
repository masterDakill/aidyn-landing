# AIDYN Technologies – Landing Page

## Résumé / Overview

- **Produit**: SerenaCare AI – plateforme de surveillance intelligente pour résidences privées pour aînés (RPA).
- **Portée**: Mise de l'avant de la **Phase 1** du plan d'affaires 2025–2026 (fondations, pilote Auberge Boischatel, financement initial).
- **Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion.
- **Design**: Aligné sur les visuels fournis (gradients bleu nuit, cartes SerenaCare) avec une navigation en verre dépoli et un hero mobile-first.
- **Contenu**: Textes marketing réécrits pour un ton web orienté clients et harmonisé avec la version en ligne.

## Mise en route / Getting started

```bash
# Installer les dépendances / install dependencies
npm install

# Préparer ou rafraîchir les visuels SerenaCare (copie + optimisation)
npm run images:all

# Lancer le serveur de dev / start dev server (port 3000, accessible sur le LAN)
npm run dev

# Variante Turbopack (optionnelle)
npm run dev:turbo

# Vérifier la qualité du code (ESLint) / lint the project
npm run lint

# Vérifier lint + build CI (intégré au workflow) / run lint + CI build in one step
npm run verify
```

### Qualité / Quality

- `npm run lint` doit retourner `✔ No ESLint warnings or errors` avant tout déploiement ou merge.
- `npm run verify` exécute `npm run lint` puis `CI=1 npm run build` pour reproduire la validation CI locale.

### Dépannage / Troubleshooting

- **Erreur `Missing script: "dev"`** :
  - assurez-vous d'être dans le dossier `aidyn-landing` contenant `package.json` avant d'exécuter `npm run dev` ;
  - listez les scripts disponibles avec `npm run` si le doute persiste.
- **Erreur `Missing script: "lint"`** :
  - exécutez `npm install` après un `git pull` pour synchroniser les dépendances et scripts définis dans `package.json` ;
  - vérifiez la présence de la commande dans `package.json` > `scripts` et réessayez `npm run lint`.
- **Port déjà utilisé** :
  - pour le mode dev : `npm run dev -- --port 3001` ;
  - pour la prévisualisation : `PORT=4000 npm run preview` (adaptez le port libre).

### Déploiement Docker / Docker deployment

```bash
# Construire l'image multi-stage (Next.js standalone)
npm run docker:build

# Lancer la stack Traefik + Next.js (mode détaché)
npm run docker:dev

# Arrêter et nettoyer les conteneurs
npm run docker:down
```

> Par défaut, Traefik publie l'appli sur http://aidyn.localhost (port 80) et son dashboard sur http://localhost:8080. Ajustez les labels dans `compose.prod.yml` pour votre domaine final.
- **Scripts images** :
  - installez libvips (`brew install vips` sur macOS) pour permettre à Sharp d'optimiser les visuels ;
  - assurez-vous que la variable `AIDYN_IMG_SRC` pointe vers le dossier source avant `npm run images:import` ;
  - `npm run images:check` échouera si un slug du manifest n'est pas référencé par le code (`getImage('slug')`).
- **Images SerenaCare absentes** :
  - la galerie charge maintenant une image par défaut ; si l'affichage reste vide, relancez `npm run dev` après avoir vérifié que le dossier `public/images` est bien synchronisé ;
  - le hero et la section produit pointent explicitement vers `public/images`, assurez-vous que les fichiers y sont présents (sinon mettez à jour les chemins) ;
  - en production, exécutez `npm run preview` pour reconstruire le bundle et valider que les assets sont servis sans 404.
- **Vidéo Synthesia bloquée** :
  - vérifiez que le navigateur autorise les iframes `share.synthesia.io` (désactiver les bloqueurs de contenu si nécessaire) ;
  - la section charge l'iframe en lazy-loading, patientez quelques secondes ou rechargez ;
  - en mode hors ligne, remplacez temporairement l'URL dans `VideoPitch.tsx` par un fichier local contrôlé.
- **Erreur `frontend/vite.config.ts` ou `Cannot find module 'vite'` pendant `npm run build` / Vercel** :
  - supprimez toute ancienne arborescence `frontend/` héritée d'une version Vite (`rm -rf frontend`) ;
  - confirmez que `git status` ne liste plus de fichiers `frontend/*` avant de relancer `npm run build` ;
  - Vercel reconstruira automatiquement après un nouveau push propre.

## Structure

- `src/app/page.tsx`: composition de la page principale.
- `src/components/Logo.tsx`: logotype dynamique (wordmark + monogramme) adapté aux fonds clairs et sombres.
- `src/app/(site)/hero.tsx`: hero mobile-first avec citation Steve Jobs, CTA `mailto:contact@aidyn.ai` et visuel manifest.
- `src/components/PhaseOne.tsx`: feuille de route détaillée Oct. 2025 – Fév. 2026.
- `src/components/RpaSolution.tsx`: présentation SerenaCare (dispositifs, architecture edge/cloud, respect vie privée).
- `src/components/Features.tsx`: piliers techniques alignés sur les livrables Phase 1.
- `src/components/VideoPitch.tsx`: capsule Synthesia intégrée avec rappels KPI et engagements Phase 1.
- `src/components/Services.tsx`: verticales IA (Santé, Automatisation RPA, Immobilier).
- `ui/Button.tsx` & `ui/AnimateIn.tsx`: primitives UI (boutons gradient, animations d'apparition).
- `src/lib/image-manifest.ts` + scripts `scripts/*.mjs`: gestion centralisée des visuels SerenaCare (import, optimisation, contrôle).
- `config/site.json` & `content/*.json`: contenu éditable (projets, services) sans toucher au code.
- `public/`: visuels officiels AIDYN (optimisés via Sharp).

## Gestion des images SerenaCare / SerenaCare image workflow

1. Définir la source des visuels :
   ```bash
   echo 'AIDYN_IMG_SRC="/chemin/vers/dossier/design"' >> .env.local
   ```
2. Importer, optimiser et valider :
   ```bash
   npm run images:import   # copie et slugification vers public/images/aidyn
   npm run images:opt      # Sharp -> WebP 320/640/1280/1920 + manifest.json
   npm run images:check    # vérifie que chaque slug est utilisé dans le code
   ```
3. En CI/CD ou pour un rafraîchissement complet, utilisez `npm run images:all`.

> ℹ️ Installez libvips (`brew install vips` sur macOS) si Sharp signale une absence de dépendance système.

## Contenu Phase 1

- **Objectifs KPI**: précision ≥95 %, réduction incidents ≥40 %, uptime &gt;99,5 %.
- **Financement recherché**: Subventions MAPAQ (50 k$) et AGE-WELL (25 k$), alternatives CRSNG/PARI.
- **Pilote Auberge Boischatel**: installation capteurs, SLA &lt;1 h, collecte incidents (50+), rapports mensuels.
- **Prochaines étapes**: certification CE/RoHS et Série Seed 300 k$ après pilote réussi.

## Accessibilité & conformité

- Animations modérées (Framer Motion) désactivées si section hors écran.
- Couleurs contrastées selon palette bleu nuit AIDYN.
- Images optimisées via `next/image`.

## SEO & métadonnées

- `src/app/layout.tsx` centralise désormais un titre, une description et des balises Open Graph/Twitter alignées sur SerenaCare AI Phase 1 (RPA, KPI ≥95 %, pilote Auberge Boischatel).
- Les visuels d'aperçu pointent vers `public/images/AIDYN_Hero_Dark_-_Variante_Optimise_Alternative.png` pour refléter le design final.
- `src/lib/logger.ts` active les logs console structurés et prépare l'activation Sentry via `NEXT_PUBLIC_SENTRY_DSN`.

### Authentification différée / Deferred authentication

- Le fichier `src/pages/api/auth/[...nextauth].ts` contient un squelette NextAuth commenté. Décommentez-le uniquement après avoir défini `NEXTAUTH_SECRET` et `NEXTAUTH_URL` (voir `.env.example`).
- Ajoutez les adaptateurs (BDD) et flux de validation nécessaires avant activation en production.

### Observabilité / Observability

- `src/components/ErrorBoundary.tsx` offre un fallback visuel avec bouton de retry pour les composants clients.
- `src/app/error.tsx` et `src/app/not-found.tsx` gèrent respectivement les erreurs globales et les routes inexistantes.
- Pour activer Sentry :
  1. `npm install @sentry/nextjs`
  2. Définir `NEXT_PUBLIC_SENTRY_DSN` (et variables serveur) dans `.env.local` ou Vercel.
  3. Redéployer. Sans DSN, les logs restent locaux.

## Déploiement

- Projet prêt pour Vercel (`npm run build`).
- Ajouter `NEXT_PUBLIC_ANALYTICS_ID` au besoin pour Google Analytics.

## Publication GitHub & mise en ligne / GitHub push & go-live

1. **Configurer le remote** (une seule fois) :
   ```bash
   git remote add origin git@github.com:<organisation>/<repo>.git
   git remote set-url origin git@github.com:<organisation>/<repo>.git  # pour mettre à jour
   ```
2. **Vérifier la branche active** : la convention est `codex/<feature>-<YYYY-MM-DD>`. Confirmez avec `git status` qu'aucun fichier n'est en attente.
3. **Pousser les commits** :
   ```bash
   git push -u origin <branch>
   ```
   Utilisez un PAT (Personal Access Token) ou une clé SSH avec les droits `repo` si GitHub demande une authentification.
4. **Ouvrir la PR** :
   - depuis la ligne de commande avec `gh pr create --fill` (GitHub CLI) ;
   - ou via l'interface Web en vous rendant sur `https://github.com/<organisation>/<repo>/compare`.
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

> ⚠️ L'assistant ne peut pas pousser vers GitHub ni déclencher Vercel à votre place ; exécutez les commandes ci-dessus sur votre machine.

---

## English snapshot

- **Product**: SerenaCare AI – intelligent safety platform for senior living facilities.
- **Scope**: Highlights Business Plan Phase 1 (foundations, Auberge Boischatel pilot, grants strategy).
- **Stack**: Next.js 14 + TypeScript + Tailwind + Framer Motion.
- **Design**: Matches provided dark teal visuals with a glassmorphism navigation bar and mobile-first hero layout.
- **Content**: Marketing copy refreshed to match the live site tone and highlight Phase 1 outcomes.

### Development

```bash
npm install
npm run images:all
npm run dev
npm run lint
npm run verify
```

- Ensure `npm run lint` completes with `✔ No ESLint warnings or errors` prior to merging.
- Run `npm run verify` to reproduce the CI lint + build sequence locally (`CI=1 npm run build`).
- Use `npm run images:all` to copy, optimise, and validate SerenaCare assets (requires libvips via `brew install vips` on macOS).
- **SerenaCare gallery looks empty**: restart `npm run dev` after confirming the `public/images` directory is present. The default asset is auto-selected as of the 2024-02-15 refresh. The hero and SerenaCare product visuals also read from `public/images`, so double-check filenames there. Use `npm run preview` before shipping to confirm no 404s in production mode.
- **Synthesia video blocked**: allow the `share.synthesia.io` iframe (disable content blockers temporarily), wait for the lazy-loaded embed to appear, or replace the URL in `VideoPitch.tsx` with a temporary local asset when offline.
- **Build fails with `frontend/vite.config.ts` or `Cannot find module 'vite'`**: delete any leftover Vite workspace by running `rm -rf frontend`, ensure `git status` is clean, then trigger `npm run build` (or your Vercel redeploy) again.

### SEO & metadata

- `src/app/layout.tsx` defines the SerenaCare AI Phase 1 title, description, and Open Graph/Twitter images (senior living focus, ≥95 % KPI target, Auberge Boischatel pilot).
- Keep the preview artwork under `public/images/AIDYN_Hero_Dark_-_Variante_Optimise_Alternative.png`, or update the paths if a new asset ships.
- `src/lib/logger.ts` keeps logs local by default and enables Sentry once `NEXT_PUBLIC_SENTRY_DSN` is provided.

### Deferred authentication

- `src/pages/api/auth/[...nextauth].ts` holds a fully-commented NextAuth credentials skeleton. Uncomment it only after setting `NEXTAUTH_SECRET` / `NEXTAUTH_URL` and wiring a secure user store.
- Refer to `.env.example` for the required environment variables.

### Error handling & observability

- `src/components/ErrorBoundary.tsx` renders a retry card when a client component throws.
- `src/app/error.tsx` and `src/app/not-found.tsx` deliver branded fallbacks for unhandled errors and missing routes.
- To enable Sentry: install `@sentry/nextjs`, set `NEXT_PUBLIC_SENTRY_DSN` (+ server DSN) in your environment, then redeploy. Without a DSN the logger remains console-only.

### Publish to GitHub & launch

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

- `Logo`: dynamic logotype that adapts between compact and full wordmark variants.
- `Hero`: trust-first messaging, Phase 1 KPIs, optimized for small screens.
- `PhaseOne`: milestone timeline (Oct 2025 – Feb 2026) with success criteria.
- `RpaSolution`: hardware/software kit and privacy commitments.
- `Features`: technical pillars required for the pilot.
- `VideoPitch`: embedded executive video with KPI reminders and deployment commitments.
- `Services`: three business verticals (Health, RPA automation, Real estate).

### Phase 1 recap

- KPI targets: ≥95% detection accuracy, ≥40% fewer incidents, &gt;99.5% uptime.
- Funding: MAPAQ 50k CAD + AGE-WELL 25k CAD, alternative programs (NSERC Alliance, NRC IRAP).
- Pilot: Auberge Boischatel (12 UniFi cameras, 8 Vayyar sensors, Jetson modules, SLA &lt;1 h).
- Next steps: CE/RoHS certification and 300k CAD Seed round post-pilot.

### Phase 2 outlook

- Consultez `docs/phase-2-plan.md` pour le plan détaillé (bilingue) couvrant :
  - bascule bilingue fr/en (UI + contenu JSON) ;
  - section « Projets » interactive avec timeline animée ;
  - audit SEO & métadonnées (Head, Open Graph, sitemaps) ;
  - CTA dynamique vers « SerenaCare Pilot Program » ;
  - pipeline CI GitHub Actions (lint, build, docker push GHCR).
- Chaque livrable inclut objectifs, étapes techniques, dépendances et critères d'acceptation pour accélérer la Phase 2.

---

© 2025 AIDYN Technologies Inc. Tous droits réservés.
