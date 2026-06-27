# GPS Camera

GPS Camera is a pure web GPS map camera built with React, TypeScript, and a browser-first runtime. It captures browser photos, adds GPS and OpenStreetMap context, and exports stamped images without Expo or React Native.

## Platform and mapping policy

- web-only
- no Expo
- no React Native runtime
- no Android build
- no iOS build
- no native mobile deployment path
- OpenStreetMap-first
- no Google Maps
- no Mapbox
- no paid map providers

## Features

- browser camera preview and photo capture
- automatic or manual location mode
- manual latitude and longitude entry with validation
- OpenStreetMap map preview and full-screen map route
- visible OpenStreetMap attribution where maps render
- date/time, address, coordinates, map, weather, accuracy, altitude, timezone, wind, humidity, and pressure stamp fields when enabled and available
- timer capture with `Off`, `3s`, `5s`, and `10s`
- browser-safe shutter sound toggle
- project naming in exported filenames
- current-session capture history
- browser download flow
- Web Share support when the browser supports it

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

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
VITE_TILE_URL_TEMPLATE=https://tile.openstreetmap.org/{z}/{x}/{y}.png
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

Build the static site:

```bash
npm run build:web
```

Preview the built site:

```bash
npm run preview:web
```

## GitHub Pages deployment

This repository includes a pure web GitHub Pages workflow at [`.github/workflows/deploy-github-pages.yml`](./.github/workflows/deploy-github-pages.yml).

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
3. `vite.config.ts` should keep a GitHub Pages-safe `base` setting. If the repository is hosted from a project-site path, set the base path accordingly before deployment.
4. Hash routing is preferred for Pages-safe route refresh behavior.

## Browser permissions

- camera
- location

## Browser limitations

- camera access requires HTTPS or `localhost`
- geolocation requires HTTPS or `localhost`
- Web Share support varies by browser
- torch support varies by browser and device
- front/back camera switching varies by browser and device
- capture history is session-only

## OpenStreetMap attribution

OpenStreetMap attribution remains visible anywhere map content is rendered in the app.

## License status

License to be decided.

- no `LICENSE` file is committed yet
- `package.json` is currently marked `UNLICENSED`

