# AGENTS.md

## Project Direction

- This repository is web-only.
- This app is intended for public open-source use.
- OpenStreetMap is the default map source.
- Keep map tile URLs configurable.
- Keep OpenStreetMap attribution visible anywhere a map is rendered.
- Prefer browser-compatible APIs and web-safe behavior.
- Preserve existing working web camera, GPS, OpenStreetMap map, and photo-stamp behavior.

## Platform Constraints

- Do not add Android work.
- Do not add iOS work.
- Do not add native mobile build work.
- Do not keep archived or deprecated Android/iOS/native build folders in the repository.
- Do not add Gradle, Kotlin, Swift, Java, or platform-specific implementation.
- Do not expand native media-library or gallery behavior.
- Do not use Google Maps.
- Do not use Mapbox.
- Do not use paid map providers.
- Do not introduce secrets or paid API keys.

## Workflow Rules

- Read `CODEX_MEMORY_MAP.md` before starting future work.
- Update `CODEX_MEMORY_MAP.md` after every meaningful change.
- Do not rewrite the whole app unless explicitly requested.
- Do not remove existing working web behavior without a justified replacement.
- Prefer permanent fixes over patches.
- Keep changes targeted and reversible.
- Record commands run and known limitations in `CODEX_MEMORY_MAP.md`.

## Validation Rules

- Run `npm run typecheck` after changes.
- Run unit tests after changes when a unit test command exists.
- If a command fails, record the exact command and failure in `CODEX_MEMORY_MAP.md`.

## Current Priority

- Move the project toward a production-ready web-only GPS Map Camera app.
- Preserve current web routes and flows while extracting stable reusable logic.
- Keep OpenStreetMap-first behavior and configurable tile URLs intact.
