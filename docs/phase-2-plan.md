# Phase 2 Evolution Plan / Plan d'évolution Phase 2

_Phase objective_: deliver a fully automated SerenaCare landing experience ready for national go-to-market while keeping the Phase 1 storytelling intact.

## 1. Bilingual interface / Interface bilingue (français & anglais)

**Goals / Objectifs**
- Serve localized UI copy (navigation, sections, CTA) with runtime language toggle.
- Keep JSON content editable by marketing while guaranteeing type safety.

**Implementation steps / Étapes**
1. Introduce `next-intl` (or `@formatjs/intl`) with middleware locale detection and `/[locale]/` routing.
2. Split `config/site.json` and `content/*.json` into locale-aware structures (e.g., `content/fr/services.json`, `content/en/services.json`).
3. Create a `useLocale` hook + language switcher component (header + footer) respecting accessibility.
4. Update unit tests / lint rules to ensure untranslated keys fail CI (`npm run verify`).

**Dependencies**
- Requires updated content files from marketing (FR + EN).
- Aligns with existing JSON manifest introduced in Phase 1.

**Acceptance criteria / Critères**
- Default locale = fr-CA; manual toggle to en-CA persists via cookie.
- `npm run verify` + E2E smoke (Playwright) confirm both locales render without missing keys.

## 2. Interactive projects timeline / Timeline interactive des projets

**Goals / Objectifs**
- Showcase SerenaCare deployments (Phase 1 pilot, future RPA sites) via animated timeline.
- Provide filters (type de projet, statut) and milestone tooltips.

**Implementation steps / Étapes**
1. Create `content/projects.json` v2 with chronology, status, KPI metrics.
2. Build `ProjectsTimeline` component using `framer-motion` + `@headlessui/react` for keyboard controls.
3. Integrate scroll-based animations (AnimatePresence) and lazy-load analytics snippets.
4. Add snapshot tests (Vitest + React Testing Library) for state transitions.

**Dependencies**
- Needs dataset from ops team (dates, KPIs, media).
- Reuses UI primitives from Phase 1 (Button, AnimateIn).

**Acceptance criteria / Critères**
- Timeline renders ≥3 milestones with accessible keyboard navigation.
- Animations degrade gracefully (reduced motion) and pass Lighthouse performance ≥90.

## 3. SEO & metadata audit / Audit SEO & métadonnées

**Goals / Objectifs**
- Ensure Next.js metadata API covers Open Graph, Twitter, structured data.
- Generate sitemap + robots directives for bilingual routes.

**Implementation steps / Étapes**
1. Add `next-sitemap` configuration to output `/sitemap.xml` & `/robots.txt` per locale.
2. Enrich `src/app/layout.tsx` metadata (og:image per locale, JSON-LD for organization & product).
3. Configure `@vercel/analytics` or Plausible snippet for traffic insights.
4. Run Lighthouse CI (desktop + mobile) and capture scores.

**Dependencies**
- Requires final hero/pilot imagery URLs (CDN or Vercel). 
- Legal approval for schema.org fields (address, contact methods).

**Acceptance criteria / Critères**
- Google Rich Results Test passes without errors.
- Lighthouse SEO score ≥ 95 across locales.

## 4. SerenaCare Pilot Program CTA / CTA programme pilote

**Goals / Objectifs**
- Surface dynamic CTA linking to pilot onboarding (Typeform/HubSpot) with context-aware messaging.

**Implementation steps / Étapes**
1. Add `config/pilot.json` describing CTA copy, endpoints, fallback mailto.
2. Build `PilotBanner` component with animation + `mailto` fallback when API target fails.
3. Wire analytics event (`pilot_click`) via `window.dataLayer` or Plausible custom event.
4. Update `PhaseOne` & `Contact` sections to reuse the CTA component.

**Dependencies**
- Need final pilot intake URL & tracking requirements.
- Align with privacy policy for data capture.

**Acceptance criteria / Critères**
- CTA renders across hero/footer, switches copy based on timeline status (pre/post pilot).
- Analytics event recorded in chosen telemetry tool during QA.

## 5. CI/CD pipeline (GitHub Actions + GHCR) / Pipeline CI/CD

**Goals / Objectifs**
- Automate lint, type-check, build, Docker image publish to `ghcr.io/aidyn-tech/aidyn-landing` on `main` and preview tags on feature branches.

**Implementation steps / Étapes**
1. Create `.github/workflows/ci.yml` running `npm ci`, `npm run lint`, `npm run verify`.
2. Add Docker build job using multi-stage `Dockerfile` and push to GHCR (needs `GHCR_TOKEN`).
3. Publish build artifacts (Next.js `.next`, Lighthouse report) for QA.
4. Gate merges by requiring the CI workflow + lint checks in GitHub branch protection.

**Dependencies**
- Secrets: `GHCR_TOKEN`, `GHCR_USERNAME`, optional `LIGHTHOUSE_TOKEN`.
- Dockerfile + compose from Phase 1 (this commit).

**Acceptance criteria / Critères**
- PRs show green checks for lint/build/docker.
- Tagged releases push images `:vX.Y.Z-phase2-rcN` and update release notes automatically.

## Governance & timeline / Gouvernance & calendrier

- **Sprint 1 (2 semaines)**: bilingual setup + CTA pilot (tasks 1 & 4).
- **Sprint 2 (2 semaines)**: interactive projects timeline + supporting content.
- **Sprint 3 (1 semaine)**: SEO audit, Lighthouse tuning, docs.
- **Sprint 4 (1 semaine)**: CI/CD pipeline hardening, dry-run deploy with docker compose + Traefik.

_Next review_: présenter les résultats Phase 2 lors du comité produit (Mathieu + équipe) une semaine avant le pilote SerenaCare.
