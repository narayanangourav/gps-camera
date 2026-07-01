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
- Tailwind CSS with CSS modules for local component/screen styling
- Browser APIs for camera, geolocation, storage, and sharing
- OpenStreetMap tile rendering
- Node built-in test runner over compiled TypeScript unit tests

## Active browser entry path

- `index.html`
- `src/main.tsx`
- `src/app/App.tsx`

## Browser API replacements in use

- Camera
  - `navigator.mediaDevices.getUserMedia`
  - `<video>` preview
  - canvas-based image rendering and export
- Location
  - `navigator.geolocation.watchPosition`
  - browser permission/error handling
- Photo capture/stamp
  - `canvas` rendering in `src/lib/captureRenderer.ts`
  - browser download via temporary anchor element
- Persistence
  - `localStorage` for preferences
  - `sessionStorage` for capture history
- Sharing
  - Web Share API when supported

## Latest migration progress

- Camera header fitment update timestamp: 2026-07-01T00:20:00+05:30
- The camera header layout was tightened for small screens:
  - back icon/title row now uses a compact two-column grid
  - the title uses a smaller mobile clamp and tighter leading
  - this prevents the previous oversized wrap/fit issue on narrow widths
- Camera header icon update timestamp: 2026-07-01T00:10:00+05:30
- The camera screen header now uses icon controls:
  - back icon on the left beside the title
  - refresh icon on the right
  - the old text buttons were removed
- Overview pill cleanup timestamp: 2026-07-01T00:00:00+05:30
- The overview source pill was removed from the GPS status section:
  - automatic/manual source is no longer shown as a pill
  - the accuracy pill still renders when accuracy is available
- Automatic no-location overview update timestamp: 2026-06-28T02:45:00+05:30
- Overview now preserves the same coordinate and map UI shape in automatic mode even when no location is available:
  - coordinates render as `0.000000, 0.000000`
  - address continues to show the unavailable message
  - map preview renders against the same fallback coordinates instead of collapsing to empty helper text
- Automatic fallback UI update timestamp: 2026-06-28T02:35:00+05:30
- The manual location screen is now explicitly reused as the automatic-location fallback UI:
  - when opened from `overview` after automatic location failure, `Location Settings` switches to fallback-specific copy
  - the same manual coordinate form is reused instead of introducing a second recovery screen
  - when opened from normal settings, the same screen still presents generic location settings copy
- Manual location flow update timestamp: 2026-06-28T02:20:00+05:30
- Manual location functionality was verified and tightened:
  - opening `Location Settings` from the overview fallback now returns to `overview`
  - opening the same screen from settings still returns to `settings`
  - switching to manual mode is now blocked until a manual location has actually been saved
  - this avoids an invalid `manual` mode state with no manual coordinates
- Camera flow update timestamp: 2026-06-28T02:05:00+05:30
- Camera screen now supports a device-camera-first path:
  - default capture entry is a hidden file input with `accept="image/*"` and `capture="environment"`
  - users can open the device camera app first on supported browsers
  - the existing `getUserMedia` browser stream remains available as an explicit fallback mode
- Stamped export is no longer limited to live video frames:
  - `src/lib/captureRenderer.ts` now renders from either `HTMLVideoElement` or `HTMLImageElement`
  - the same stamping, download, and capture-history pipeline is reused for both camera sources

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
  - triggers on `main` and `master`
  - uses `npm ci`
  - runs typecheck, unit tests, and Vite build
  - no longer contains Expo-specific environment flags
- `vite.config.ts` now derives a GitHub Pages-safe base path from `GITHUB_REPOSITORY`
  - user/org pages build to `/`
  - project pages build to `/<repo>/`
  - fixes deployed asset 404s caused by relative `./assets/...` URLs on GitHub Pages project sites
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
- Shared browser-used logic still lives in:
  - `src/logics/appPreferences.logic.ts`
  - `src/logics/functions.logic.ts`
- UI architecture refactor timestamp: 2026-06-28T00:35:00+05:30
- Styling architecture is now:
  - Tailwind CSS via `@tailwindcss/vite`
  - app-level base styles in `src/app/globals.css`
  - local CSS modules for screen/component-specific visuals
- Structure alignment timestamp: 2026-06-28T01:05:00+05:30
- Active UI structure now mirrors the `cv-portfolio` repo pattern more closely:
  - `src/app/` for app entry, route definitions, global styles, and screen composition
  - `src/components/` for reusable presentational building blocks
  - `src/hooks/` for browser and screen hooks
  - `src/lib/` for shared UI/runtime utilities
- Shared browser UI primitives now live in:
  - `src/components/ui/Button.tsx`
  - `src/components/ui/IconButton.tsx`
  - `src/components/ui/Card.tsx`
  - `src/components/ui/PageShell.tsx`
  - `src/components/ui/PageFrame.tsx`
  - `src/components/ui/Pill.tsx`
  - `src/components/ui/SectionHeader.tsx`
  - `src/components/ui/Icons.tsx`
- Screen presentation was migrated off the old monolithic stylesheet:
  - `src/app/screens/HomeScreen.tsx`
  - `src/app/screens/OverviewScreen.tsx`
  - `src/app/screens/SettingsScreen.tsx`
  - `src/app/screens/LocationSettingsScreen.tsx`
  - `src/app/screens/StampSettingsScreen.tsx`
  - `src/app/screens/CaptureHistoryScreen.tsx`
  - `src/app/screens/MapScreen.tsx`
  - `src/app/screens/CameraScreen.tsx`
- The old centralized UI stylesheet was removed:
  - `src/web/styles/global.css`
- Map rendering styles now live beside the map component:
  - `src/components/maps/OsmMap.module.css`
- Browser entry now uses:
  - `src/main.tsx`
  - `src/app/App.tsx`
  - `src/app/globals.css`
- The old active `src/web/` tree has been retired.

## Current dependency state

- `package.json`
  - runtime deps: `react`, `react-dom`
  - dev deps: `typescript`, `@types/react`, `@types/react-dom`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`
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

## Build and validation state

- `npm run typecheck`
  - passed after the camera header fitment adjustment
- `npm run test:unit`
  - passed after the camera header fitment adjustment
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run build:web`
  - passed after the camera header fitment adjustment
- `npm run typecheck`
  - passed after the camera header icon change
- `npm run test:unit`
  - passed after the camera header icon change
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run build:web`
  - passed after the camera header icon change
- `npm run typecheck`
  - passed after removing the overview source pill
- `npm run test:unit`
  - passed after removing the overview source pill
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run build:web`
  - passed after removing the overview source pill
- `npm run typecheck`
  - passed after the automatic no-location overview fallback change
- `npm run test:unit`
  - passed after the automatic no-location overview fallback change
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run build:web`
  - passed after the automatic no-location overview fallback change
- `npm run typecheck`
  - passed after the automatic fallback UI reuse change
- `npm run test:unit`
  - passed after the automatic fallback UI reuse change
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run build:web`
  - passed after the automatic fallback UI reuse change
- `npm run typecheck`
  - initially failed once after the manual-location flow change because `useState` was missing from `src/app/App.tsx`
  - passed after adding the missing import
- `npm run test:unit`
  - passed after the manual-location flow change
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run build:web`
  - passed after the manual-location flow change
- `npm run typecheck`
  - passed after the device-camera-first camera flow change
- `npm run test:unit`
  - passed after the device-camera-first camera flow change
  - 11 tests
  - 11 passing
  - 0 failing
- `npm run build:web`
  - passed after the device-camera-first camera flow change

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
- `npm install -D tailwindcss @tailwindcss/vite`
  - passed
  - added Tailwind styling toolchain for the responsive UI architecture migration
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

- `Get-Content .codex/memory-map.md`
- `Get-Content src/app/screens/CameraScreen.tsx`
- `Get-Content src/components/ui/SectionHeader.tsx`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build:web`
- `Get-Content .codex/memory-map.md`
- `Get-Content src/app/screens/CameraScreen.tsx`
- `Get-Content src/components/ui/IconButton.tsx`
- `Get-Content src/components/ui/SectionHeader.tsx`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build:web`
- `Get-Content src/app/screens/OverviewScreen.tsx`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build:web`
- `Get-Content src/components/maps/OsmMap.tsx`
- `Get-Content src/app/screens/OverviewScreen.tsx`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build:web`
- `Get-Content .codex/memory-map.md`
- `Get-Content src/app/screens/LocationSettingsScreen.tsx`
- `Get-Content src/app/screens/OverviewScreen.tsx`
- `Get-Content src/hooks/useLocationSettingsForm.ts`
- `Get-Content src/app/App.tsx`
- `Get-Content src/app/screens/LocationSettingsScreen.module.css`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build:web`
- `Get-Content .codex/memory-map.md`
- `Get-Content src/app/screens/LocationSettingsScreen.tsx`
- `Get-Content src/hooks/useLocationSettingsForm.ts`
- `rg -n "manual location|manualLocation|locationMode|setManualLocation|Enter Manual Location|Use current as manual|validate.*coordinate|latitude|longitude" src tests`
- `Get-Content src/services/location.service.ts`
- `Get-Content src/hooks/useLiveLocation.ts`
- `Get-Content tests/location.service.test.ts`
- `Get-Content src/app/screens/OverviewScreen.tsx`
- `Get-Content src/hooks/useHashRoute.ts`
- `Get-Content src/app/routes.ts`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build:web`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build:web`
- `Get-Content AGENTS.md`
- `Get-Content .codex/memory-map.md`
- `rg -n "Open Camera|getUserMedia|capture=|input type=|file input|Use Device Camera|camera" src`
- `Get-ChildItem -Recurse src/app/screens,src/components,src/hooks,src/lib | Select-Object FullName`
- `Get-Content src/app/screens/CameraScreen.tsx`
- `Get-Content src/hooks/useCameraCapture.ts`
- `Get-Content src/app/App.tsx`
- `Get-Content package.json`
- `Get-Content src/lib/captureRenderer.ts`
- `Get-Content src/services/stamp.service.ts`
- `Get-Content src/app/screens/CameraScreen.module.css`
- `Get-Content src/components/ui/Button.tsx`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build:web`

- `Get-Content AGENTS.md`
- `Get-Content README.md`
- `Get-Content package.json`
- `Get-Content package-lock.json`
- `Get-ChildItem .github\workflows -File | Select-Object -ExpandProperty Name`
- `Get-ChildItem src -Recurse | Select-Object FullName`
- `Get-Content src/main.tsx`
- `Get-Content vite.config.ts`
- `npm install --no-fund --no-audit`
- `npm ci --no-fund --no-audit`
- `npm run test:unit`
- `npm run typecheck`
- `npm run build:web`
- `npm install -D tailwindcss @tailwindcss/vite`
- `Move-Item src\web\App.tsx src\app\App.tsx`
- `Move-Item src\web\routes.ts src\app\routes.ts`
- `Move-Item src\web\screens\* src\app\screens\`
- `Move-Item src\web\styles\app.css src\app\globals.css`
- `Move-Item src\web\hooks\* src\hooks\`
- `Move-Item src\web\components\ui\* src\components\ui\`
- `Move-Item src\web\components\MapAttribution.tsx src\components\maps\MapAttribution.tsx`
- `Move-Item src\web\components\OsmMap.tsx src\components\maps\OsmMap.tsx`
- `Move-Item src\web\components\OsmMap.module.css src\components\maps\OsmMap.module.css`
- `Move-Item src\web\services\captureRenderer.ts src\lib\captureRenderer.ts`
- `Move-Item src\web\utils\cn.ts src\lib\cn.ts`
- `Remove-Item src\web -Recurse -Force`

## Known issues

- The repository is still in an uncommitted working-tree state.
- `.tmp-tests/` is regenerated by `npm run test:unit` and is now ignored.
- Responsive behavior was improved through shared primitives and Tailwind breakpoints, but visual QA was command-based only in this session; manual browser review across mobile/tablet/desktop is still recommended.
- Device-camera-first behavior depends on browser support for `capture="environment"`:
  - many mobile browsers will open the device camera app directly
  - desktop browsers typically fall back to file picking
  - torch and camera switching remain browser-stream-only capabilities in the fallback flow

## Next recommended work

1. Manually review all routes at mobile, tablet, and desktop widths to tune any remaining spacing or typography edge cases.
2. If desired, continue splitting any screen whose JSX grows again by extracting more presentational subcomponents under `src/components/ui/`.
3. Keep future presentational work in `src/components/**` and `src/app/screens/**` rather than recreating a separate `src/web/**` tree.
4. Commit or otherwise reconcile the working tree now that Tailwind, typecheck, unit tests, and Vite build are green.
