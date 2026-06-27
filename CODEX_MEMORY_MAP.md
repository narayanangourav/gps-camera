# Codex Memory Map

## Project direction

- Web-only GPS Camera app.
- Open-source friendly.
- OpenStreetMap-first.
- No Android, iOS, native mobile build, Google Maps, Mapbox, or paid map providers.
- Unit tests only.

## Latest verification

- Verification timestamp: 2026-06-27T19:27:01.4789943+05:30
- Repository status: large uncommitted working tree from prior implementation work.
- Active browser entry path:
  - `index.html`
  - `src/main.tsx`
  - `src/web/App.tsx`
- Active typecheck scope:
  - `src/web/**`
  - `src/services/**`
  - `src/models/**`
  - `src/state/**`
  - `src/logics/appPreferences.logic.ts`
  - `src/logics/functions.logic.ts`

## Commands run

- `Get-Content AGENTS.md`
- `Get-Content CODEX_MEMORY_MAP.md`
- `Get-Content package.json`
- `Get-Content README.md`
- `git status --short`
- `git diff --stat`
- `Get-ChildItem .github -Recurse -File | Select-Object -ExpandProperty FullName`
- `Get-ChildItem src -Recurse -File | Select-Object -ExpandProperty FullName`
- `Get-ChildItem tests -Recurse -File | Select-Object -ExpandProperty FullName`
- `if (Test-Path app.json) { Get-Content app.json } else { Write-Output 'MISSING: app.json' }`
- `Get-Content package-lock.json`
- `npm run test:unit`
- `npm run typecheck`
- `npm run build:web`
- `Get-ChildItem node_modules\.bin | Select-Object -ExpandProperty Name`
- `Get-Content src/main.tsx`
- `Get-Content tsconfig.json`
- `Get-Content tsconfig.tests.json`
- `Get-Content src/state/AppPreferencesProvider.tsx`
- `Get-Content src/logics/appPreferences.logic.ts`
- `Get-Content src/services/persistence.service.ts`
- `Get-Content src/services/share.service.ts`
- `Get-Content src/services/stamp.service.ts`
- `Get-Content src/services/location.service.ts`
- `Get-Content src/web/App.tsx`
- `Get-Content src/web/screens/OverviewScreen.tsx`
- `Get-Content src/web/screens/CameraScreen.tsx`
- `Get-Content src/web/screens/MapScreen.tsx`
- `Get-Content src/web/screens/LocationSettingsScreen.tsx`
- `Get-Content src/web/screens/StampSettingsScreen.tsx`
- `Get-Content src/web/screens/CaptureHistoryScreen.tsx`
- `Get-Content src/web/hooks/useCameraCapture.ts`
- `Get-Content src/web/hooks/useCaptureHistoryActions.ts`
- `Get-Content src/web/hooks/useLocationSettingsForm.ts`
- `Get-Content src/web/hooks/useStampSettingsForm.ts`
- `Get-Content src/web/components/OsmMap.tsx`
- `Get-Content src/web/components/MapAttribution.tsx`
- `Get-Content src/services/mapConfig.service.ts`
- `Get-ChildItem src\web -Recurse -File | Select-String -Pattern 'Â|â€¦'`
- `Get-Date -Format o`
- attempted: `npm install --no-fund --no-audit`
  - blocked by approval system before execution because escalation credits were unavailable

## Actual results

- `npm run test:unit`: passed
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run typecheck`: passed
- `npm run build:web`: failed
  - exact failure: `'vite' is not recognized as an internal or external command, operable program or batch file.`
- Root cause of build failure:
  - `package.json` declares a Vite-based web toolchain
  - installed `node_modules` and `package-lock.json` still reflect the older Expo/React Native dependency graph
  - `node_modules/.bin` contains `expo` and `react-native`, but not `vite`

## Dependency state

- `expo-media-library`
  - removed from `package.json`
  - absent from `package-lock.json`
  - no active source import found
- `react-native-maps`
  - removed from `package.json`
  - absent from `package-lock.json`
  - no active source import found
- `package.json`
  - current declared dependencies are `react` and `react-dom`
  - current declared dev dependencies are `typescript`, `@types/react`, `@types/react-dom`, `vite`, `@vitejs/plugin-react`
- `package-lock.json`
  - does not match `package.json`
  - top-level lock entry still lists Expo/React Native packages including `expo`, `expo-camera`, `expo-location`, `react-native`, `react-native-view-shot`, and navigation packages
- `node_modules`
  - still reflects the old Expo install state
  - does not currently provide `vite`

## Import verification classification

- Active and must be removed
  - stale Expo/React Native install state in `package-lock.json` and `node_modules`
  - this is actively blocking `npm run build:web`
- Deprecated but harmless
  - legacy `src/components/**`, `src/logics/**`, and `src/screens/**` files still import `react-native`, `expo-camera`, `expo-location`, `expo-linear-gradient`, `expo-blur`, `@expo/vector-icons`, and `@react-navigation/native`
  - these files are not part of the active browser entry path and are excluded from the current `tsconfig.json` include set
- Required indirectly
  - none verified
- Unknown and needs manual review
  - none beyond the stale legacy source tree remaining in the repository

## Script state

- Present and active
  - `start`
  - `dev`
  - `web`
  - `typecheck`
  - `test:unit`
  - `build:web`
  - `preview:web`
  - `build`
- Not present as active package scripts
  - `android`
  - `ios`
  - Android APK/AAB build scripts
  - Playwright or E2E scripts

## Feature verification from active code

- Manual vs automatic location mode: implemented
- Manual coordinate form: implemented
- Coordinate validation: implemented
- Stamp settings UI: implemented
- Timer capture `Off/3s/5s/10s`: implemented
- Web-safe shutter sound toggle: implemented
- Project naming in filenames: implemented
- Separate site-name feature: not implemented as a distinct field
- Session capture history: implemented
- Web Share support for captured photos: implemented conditionally when browser support exists
- Full-screen OSM map route: implemented
- OSM attribution on overview and mini-map/full map rendering: implemented in active `OsmMap` and `MapAttribution`
- Browser `localStorage` preferences: implemented
- Browser `sessionStorage` capture history: implemented

## Native and deprecated state

- `.github/workflows/build-android-apk.yml`: deleted in working tree
- `.github/workflows/build-android-release.yml`: deleted in working tree
- `.github/workflows/deploy-github-pages.yml`: present
- `app.json`: deleted in working tree
- `android/`: deleted in working tree
- `ios/`: absent
- Old Expo/React Native source tree still exists under `src/components`, `src/logics`, and `src/screens`
  - current browser app no longer enters through those files

## Verification-only fixes applied in this session

- corrected visible attribution text in `src/web/components/MapAttribution.tsx`
- corrected broken visible text encoding in:
  - `src/web/screens/OverviewScreen.tsx`
  - `src/web/screens/CameraScreen.tsx`

## Mismatches against previous reports

- Previous memory reported an active Expo/React Native stack; actual active entry path is now browser-first Vite-style source under `src/main.tsx` and `src/web/**`
- Previous memory reported successful web build behavior; actual build is currently broken because `vite` is declared but not installed in the present working tree
- Previous memory reported `package-lock.json` as aligned; actual lockfile still reflects the older Expo dependency graph
- Previous memory implied the repository had fully reconciled runtime state; actual repository still contains a deprecated legacy Expo/React Native source tree on disk
- `README.md` is still stale in multiple places
  - still describes the app as Expo/React Native
  - still documents `EXPO_PUBLIC_TILE_URL_TEMPLATE`
  - still lists `App.tsx`, `app.json`, and `index.ts` in project structure

## Known issues

- The repository is not in a clean committed state.
- `package-lock.json` does not match `package.json`.
- `node_modules` does not match `package.json`.
- `npm run build:web` cannot pass until dependencies are reinstalled for the Vite toolchain.
- The approval system blocked the dependency refresh attempt during this session.
- `.tmp-tests/` is regenerated by `npm run test:unit` and may remain in the working tree unless removed manually.
- Legacy Expo/React Native source files remain on disk and can mislead future work unless removed or archived clearly.

## Next recommended work

1. Run `npm install` to reconcile `package-lock.json` and `node_modules` with the current Vite-based `package.json`.
2. Rerun `npm run build:web` after dependency reconciliation.
3. Remove the deprecated Expo/React Native source tree once the browser path is confirmed stable.
4. Update `README.md` so it matches the current browser-only runtime and environment variable names.
5. Commit or otherwise reconcile the large working tree so future reports can describe a stable repository state.
