# AGENTS.md

## Project Direction

- This repository is a pure web GPS Camera app.
- The runtime stack is React + TypeScript + Vite.
- GitHub Pages is the only deployment target.
- OpenStreetMap is the default map source.
- Keep map tile URLs configurable.
- Keep OpenStreetMap attribution visible anywhere a map is rendered.
- Prefer browser-native APIs where possible.
- Preserve working browser camera, geolocation, map, and stamped photo behavior.

## Platform Constraints

- Do not add Expo.
- Do not add React Native runtime or build targets.
- Do not add Android work.
- Do not add iOS work.
- Do not add native mobile build work.
- Do not keep archived or deprecated Android/iOS/native build folders in the repository.
- Do not add Metro, Gradle, Kotlin, Swift, Java, or platform-specific implementation.
- Do not use Google Maps.
- Do not use Mapbox.
- Do not use paid map providers.
- Do not introduce secrets or paid API keys.

## Workflow Rules

- Read `.codex/memory-map.md` before handling every new prompt or task.
- Update `.codex/memory-map.md` after every meaningful change.
- Do not rewrite the whole app unless explicitly requested.
- Do not remove working browser behavior without a justified replacement.
- Prefer permanent fixes over patches.
- Keep changes targeted and reversible.
- Record commands run, results, and known limitations in `.codex/memory-map.md`.

## Validation Rules

- Run `npm run typecheck` after changes.
- Run `npm run test:unit` after changes.
- Run `npm run build:web` after changes when the toolchain is available.
- If a command fails, record the exact command and failure in `.codex/memory-map.md`.

## Testing Direction

- Unit tests only.
- Do not add Playwright.
- Do not add Cypress.
- Do not add Detox.
- Do not add Selenium.
- Do not add browser E2E automation.

## Current Priority

- Complete the migration away from Expo and React Native runtime/build assumptions.
- Keep the app browser-first, OpenStreetMap-first, and GitHub Pages-ready.
- Preserve current web routes and flows while keeping the UI modern, minimalist, and responsive.
