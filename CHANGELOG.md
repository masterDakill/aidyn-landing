# CHANGELOG

## [Unreleased]
 codex/adjust-design-according-to-provided-images-2025-10-19


 main
- Set default dev server host/port to avoid "Missing script: dev" confusion and added troubleshooting guidance in the README.
- Cleared all legacy ESLint violations across interactive components and standardized typographic apostrophes to unblock `npm run lint`.
- Documented recovery steps for the "Missing script: lint" npm error to keep local environments aligned.
- Added GitHub push & deployment playbook (README) and LAN-friendly `npm run preview` script for production previews.
- Hardened the preview workflow with a Node launcher honoring `PORT`/`HOST` overrides and documented `EADDRINUSE` recovery steps.
- Modernised the navigation (glassmorphism, responsive logo) and hero layout to better match the provided design references and mobile constraints.
- Ensured the DynamicImageGallery preloads a default SerenaCare visual so assets appear immediately after deploy, and replaced the deprecated ShieldHeartbeat icon in Services.
 codex/adjust-design-according-to-provided-images-2025-10-19
- Pointed the hero and SerenaCare product visuals to the `/public/images` directory to match the reference deploy asset structure.
- Excluded the legacy `frontend/` Vite workspace from TypeScript builds and documented the cleanup to prevent Vercel failures.
- Reintroduced the Synthesia video pitch section from PR #3 in the Next.js layout and documented the embed troubleshooting steps.

## 2024-02-14



## 2024-02-14
 main
- Refonte du hero pour refléter la charte visuelle sombre fournie et mettre de l’avant la Phase 1 SerenaCare AI.
- Ajout de la section `PhaseOne` (jalons Oct. 2025 – Fév. 2026, critères de succès et budget).
- Mise à jour de `RpaSolution` avec visuel produit, piliers multimodaux et fiche matériel.
- Simplification des sections `Features` et `Services` pour correspondre aux cartes « Nos solutions IA ».
- Refonte de la feuille de route pour détailler le calendrier Phase 1 et les KPI cibles.
- Documentation actualisée (README bilingue) conforme aux attentes projet.
