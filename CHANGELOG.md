# CHANGELOG

## [Unreleased]

- _Aucun changement pour le moment / No changes yet._

## [1.0.0-phase1] - 2025-10-19

### Added / Ajouts

- Multi-stage Dockerfile, `.dockerignore` et `compose.prod.yml` (Traefik) pour lancer la landing SerenaCare derrière un reverse proxy standard.
- Scripts npm `docker:dev` / `docker:down` pour gérer le cycle de vie des conteneurs depuis le projet.
- Automatisation des visuels SerenaCare (`images:import`, `images:opt`, `images:check`, `images:all`) avec manifest JSON documenté.
- UI primitives (`ui/Button.tsx`, `ui/AnimateIn.tsx`), nouveau hero `src/app/(site)/hero.tsx` et composant `VideoPitch` avec iframe Synthesia.
- Fallbacks d’erreurs (`ErrorBoundary`, `app/error.tsx`, `app/not-found.tsx`), logger Sentry-ready et squelette NextAuth désactivé.
- Contenus structurés (`config/site.json`, `content/*.json`) et plan Phase 2 détaillé (`docs/phase-2-plan.md`).

### Changed / Modifications

- Navigation, hero, sections solution/services/roadmap et CTA réécrits pour refléter le ton web Phase 1 et l’adresse `mailto:contact@aidyn.ai`.
- Documentation README mise à jour (guides Docker, troubleshooting, push GitHub, rappel Phase 2).
- Métadonnées globales alignées sur la proposition SerenaCare (Open Graph, Twitter cards).
- Nettoyage ESLint historique et uniformisation de la ponctuation pour garantir `npm run lint` vert.
- `npm run verify` ajouté pour chaîner lint + build CI.
- Nettoyage de l’ancien workspace Vite (`frontend/`) des builds TypeScript.
- Galerie dynamique ajustée pour précharger un visuel SerenaCare et pointer les assets vers `/public/images`.

### Ops & Quality / Ops & qualité

- Scripts preview renforcés (`scripts/preview.mjs`) avec rebuild automatique et support `HOST`/`PORT`.
- README bilingue enrichi (push GitHub, troubleshooting lint/dev, rappel Docker/Traefik).
- Phase 1 recap et jalons consignés pour publication tag `v1.0.0-phase1`.

## 2024-02-14

- Refonte du hero pour refléter la charte visuelle sombre fournie et mettre de l’avant la Phase 1 SerenaCare AI.
- Ajout de la section `PhaseOne` (jalons Oct. 2025 – Fév. 2026, critères de succès et budget).
- Mise à jour de `RpaSolution` avec visuel produit, piliers multimodaux et fiche matériel.
- Simplification des sections `Features` et `Services` pour correspondre aux cartes « Nos solutions IA ».
- Refonte de la feuille de route pour détailler le calendrier Phase 1 et les KPI cibles.
- Documentation actualisée (README bilingue) conforme aux attentes projet.
