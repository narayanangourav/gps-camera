# GPS Camera

GPS Camera is a web-only Expo/React Native app for capturing browser photos with GPS, OpenStreetMap context, and configurable stamp overlays.

## What it does

- browser camera capture
- automatic or manual location mode
- OpenStreetMap-first map preview with visible attribution
- timestamp, address, coordinates, weather, accuracy, altitude, timezone, wind, humidity, and pressure stamp fields when enabled and available
- project or site naming in exported filenames
- session capture history
- browser download flow
- Web Share support when the browser supports the Web Share API

## Mapping and platform policy

- web-only
- OpenStreetMap is the default map source
- map tile URLs stay configurable through `EXPO_PUBLIC_TILE_URL_TEMPLATE`
- no Google Maps
- no Mapbox
- no paid map provider requirement
- no Android build
- no iOS build
- no native mobile deployment path

## Local development

Install dependencies:

```bash
npm install
```

Start the web dev server:

```bash
npm run dev
```

Equivalent commands:

```bash
npm run start
```

```bash
npm run web
```

## Environment

Copy the example environment file:

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Set the tile template:

```env
EXPO_PUBLIC_TILE_URL_TEMPLATE=https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

## Validation

Unit tests:

```bash
npm run test:unit
```

Typecheck:

```bash
npm run typecheck
```

Build the static web export:

```bash
npm run build:web
```

Preview the built export:

```bash
npm run preview:web
```

## GitHub Pages deployment

This repository includes a web-only GitHub Pages workflow at [`.github/workflows/deploy-github-pages.yml`](./.github/workflows/deploy-github-pages.yml).

Workflow behavior:

- runs on pushes to `main`
- supports manual dispatch
- runs `npm ci`
- runs `npm run typecheck`
- runs `npm run test:unit`
- runs `npm run build:web`
- uploads `dist`
- deploys with official GitHub Pages actions

Setup notes:

1. Enable GitHub Pages in the repository settings and choose GitHub Actions as the source.
2. If your default branch is not `main`, update the branch trigger in [`.github/workflows/deploy-github-pages.yml`](./.github/workflows/deploy-github-pages.yml).
3. `npm run build:web` now normalizes the exported HTML for GitHub Pages by converting root-absolute asset references to relative paths, generating `404.html`, and adding `.nojekyll`.

## Browser requirements and limitations

Permissions required:

- camera
- location

Known limitations:

- camera access requires HTTPS or `localhost`
- geolocation requires permission and HTTPS or `localhost`
- Web Share API support varies by browser
- capture history is currently session-only
- browser sound feedback can still be suppressed until the page receives user interaction

## OpenStreetMap attribution

OpenStreetMap attribution remains visible anywhere map content is rendered in the app.

## License status

License to be decided.

- no `LICENSE` file is committed yet
- `package.json` is currently marked `UNLICENSED`

## Project structure

```text
src/
  components/
  logics/
  models/
  screens/
  services/
  state/
tests/
assets/
scripts/
App.tsx
app.json
index.ts
```
