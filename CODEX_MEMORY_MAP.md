# Codex Memory Map

## Project direction

- Web-only GPS Camera app.
- Open-source friendly.
- OpenStreetMap-first.
- No Expo.
- No React Native runtime or build target.
- No Android, iOS, Metro, or native mobile build pipeline.
- GitHub Pages is the intended deployment target.
- Unit tests only.

## Current active stack

- React
- TypeScript
- Vite-oriented app structure
- Browser APIs for camera, geolocation, storage, and sharing
- OpenStreetMap tile rendering
- Node built-in test runner over compiled TypeScript unit tests

## Active browser entry path

- `index.html`
- `src/main.tsx`
- `src/web/App.tsx`

## Browser API replacements in use

- Camera
  - `navigator.mediaDevices.getUserMedia`
  - `<video>` preview
  - canvas-based image rendering and export
- Location
  - `navigator.geolocation.watchPosition`
  - browser permission/error handling
- Photo capture/stamp
  - `canvas` rendering in `src/web/services/captureRenderer.ts`
  - browser download via temporary anchor element
- Persistence
  - `localStorage` for preferences
  - `sessionStorage` for capture history
- Sharing
  - Web Share API when supported

## Latest migration progress

- Verification timestamp: 2026-06-27T23:15:00+05:30
- `AGENTS.md` now states:
  - web-only
  - no Expo
  - no React Native runtime/build target
  - no Android/iOS/native build
  - GitHub Pages only
  - browser APIs where possible
  - unit tests only
- `README.md` now matches the pure web direction:
  - no Expo instructions
  - no React Native instructions
  - no Android/iOS/APK/App Store/Play Store guidance
  - uses `VITE_TILE_URL_TEMPLATE`
- `.github/workflows/deploy-github-pages.yml` now:
  - triggers on `main`
  - uses `npm ci`
  - runs typecheck, unit tests, and Vite build
  - no longer contains Expo-specific environment flags
- `.gitignore` now ignores:
  - `dist/`
  - `.tmp-tests/`
- `package.json` now keeps a minimal pure-web dependency set:
  - `react`
  - `react-dom`
  - `@types/react`
  - `@types/react-dom`
  - `@vitejs/plugin-react`
  - `typescript`
  - `vite`
- Deprecated Expo/React Native source files were removed from:
  - `src/components/**`
  - `src/screens/**`
  - unused `src/logics/**`
- Shared browser-used logic still lives in:
  - `src/logics/appPreferences.logic.ts`
  - `src/logics/functions.logic.ts`
- Active browser text cleanup fixes applied:
  - `src/web/components/MapAttribution.tsx`
  - `src/web/screens/OverviewScreen.tsx`
  - `src/web/screens/CameraScreen.tsx`

## Current dependency state

- `package.json`
  - runtime deps: `react`, `react-dom`
  - dev deps: `typescript`, `@types/react`, `@types/react-dom`, `vite`, `@vitejs/plugin-react`
- `expo-media-library`
  - removed from `package.json`
  - absent from `package-lock.json`
  - absent from active source
- `react-native-maps`
  - removed from `package.json`
  - absent from `package-lock.json`
  - absent from active source
- Dependency reconciliation
  - `npm install --no-fund --no-audit` succeeded
  - `npm ci --no-fund --no-audit` also succeeded
  - `package-lock.json` now matches `package.json`
  - `node_modules/.bin` now contains `vite`
  - old Expo/React Native install state was pruned from `node_modules`

## Build and validation state

- `npm run test:unit`
  - passed
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run typecheck`
  - passed
- `npm run build:web`
  - passed
  - Vite produced `dist/index.html`, `dist/assets/*.css`, and `dist/assets/*.js`
- `npx vite --version`
  - passed
  - `vite/7.3.0 win32-x64 node-v25.9.0`

## Search cleanup summary

- Active source, docs, and workflow no longer contain stale Expo/React Native runtime usage.
- Remaining search hits fall into these buckets:
  - valid non-runtime doc mentions such as "no Expo" or "no React Native"
  - historical notes inside this memory file
  - false-positive platform binary metadata inside `package-lock.json` for Vite toolchain dependencies such as `@esbuild/*android*`, `@rollup/*android*`, and `lightningcss-android-arm64`
- No active source import remains for:
  - `expo-camera`
  - `expo-location`
  - `react-native`
  - `react-native-view-shot`
  - `react-native-web`

## Native and workflow state

- `android/` is deleted in the working tree.
- `ios/` is absent.
- `app.json` is deleted in the working tree.
- Android CI workflows are deleted in the working tree.
- `.github/workflows/deploy-github-pages.yml` is present and pure web.
- No active package scripts remain for Android or iOS builds.

## Commands run in this phase

- `Get-Content AGENTS.md`
- `Get-Content CODEX_MEMORY_MAP.md`
- `Get-Content README.md`
- `Get-Content package.json`
- `Get-Content package-lock.json`
- `npm config get cache`
- `npm ls vite --depth=0`
- `npm ls @vitejs/plugin-react --depth=0`
- `npm cache ls vite --json`
- `npm cache ls @vitejs/plugin-react --json`
- `npm cache ls @types/react-dom --json`
- `npm cache ls @types/react --json`
- `npm cache ls typescript --json`
- `npm cache ls react-dom --json`
- `npm cache ls react --json`
- `Get-ChildItem .github\workflows -File | Select-Object -ExpandProperty Name`
- `Get-ChildItem src\components -Recurse -File | Select-Object -ExpandProperty FullName`
- `Get-ChildItem src\screens -Recurse -File | Select-Object -ExpandProperty FullName`
- `Get-ChildItem src\logics -Recurse -File | Select-Object -ExpandProperty FullName`
- `rg -n -S '\bexpo\b|Expo|react-native|React Native|metro|app\.json|expo-camera|expo-location|react-native-view-shot|\bandroid\b|\bios\b|gradle|kotlin|swift|\bapk\b|\baab\b|play store|app store|Platform\.OS' AGENTS.md README.md src tests package.json package-lock.json .github`
- `npm run test:unit`
- `npm run typecheck`
- `npm run build:web`
- `Get-Content vite.config.ts`
- `npm install --no-fund --no-audit`
- `npx vite --version`
- `npm ci --no-fund --no-audit`
- `Get-Content .gitignore`
- attempted: `npm install --no-fund --no-audit`
  - blocked by approval system before execution because escalation credits were unavailable
- attempted: `npm install --offline --no-fund --no-audit`
  - failed with `ENOTCACHED`
  - first on `@types/react-dom`
  - then on `@vitejs/plugin-react`
  - then on `vite`
- attempted: `npm install --prefer-offline --no-fund --no-audit`
  - failed with `EACCES` while trying to reach `https://registry.npmjs.org/vite`
  - confirms the remaining blocker is dependency installation, not source code
- attempted: `npm install --no-fund --no-audit`
  - failed with `EACCES`
  - exact failing fetch target: `https://registry.npmjs.org/vite`
  - npm also failed to write logs under `C:\Users\NARAYANA N GOURAV\AppData\Local\npm-cache\_logs`
  - confirms dependency reconciliation is still blocked by environment/network or permission constraints
- completed: `npm install --no-fund --no-audit`
  - succeeded
  - installed `vite`
  - installed `@vitejs/plugin-react`
  - installed `@types/react-dom`
  - pruned old Expo/React Native install state from `node_modules`
  - updated `package-lock.json` to match `package.json`
- completed: `npm ci --no-fund --no-audit`
  - succeeded
  - confirmed the corrected lockfile works for the GitHub Pages workflow path

## Known issues

- The repository is still in an uncommitted working-tree state.
- `.tmp-tests/` is regenerated by `npm run test:unit` and is now ignored.

## Next recommended work

1. Commit or otherwise reconcile the working tree now that dependency and build validation are green.
2. If desired, add a license file when the project owner chooses one.
