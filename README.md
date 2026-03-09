# GPS CAMERA

GPS Camera is an Expo React Native application for capturing photos and videos with GPS-based metadata overlays such as location, date, time, weather, latitude, and longitude.

## Prerequisites

Before starting, make sure the following are installed:

- Node.js LTS
- npm
- Git
- Android Studio with an emulator, or a physical Android device with USB debugging enabled
- Xcode if you want to run or build for iOS on macOS

Optional:

- Expo Go on your phone for quick testing
- `eas-cli` if you plan to use EAS cloud builds

## Project Requirements

This project uses:

- Expo
- React Native
- TypeScript
- `expo-camera`
- `expo-location`
- `expo-media-library`
- `react-native-maps`

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Environment Configuration

The app supports custom map tile configuration through `.env`.

Start from the example file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Example:

```env
EXPO_PUBLIC_TILE_URL_TEMPLATE=https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

Rules:

- Keep `.env` local only and do not commit it
- Commit `.env.example` with safe placeholder or public values only
- Keep machine-specific values like `ANDROID_HOME` in your system environment, not in `.env`

## How To Start The Project

Start the Expo development server on `http://localhost:8000`:

```bash
npm run start
```

Run directly on specific platforms:

```bash
npm run android
```

```bash
npm run ios
```

```bash
npm run web
```

## Development Notes

- Local development runs on port `8000`
- `npm run android` starts Expo and opens the Android target
- `npm run ios` works only on macOS with Xcode installed
- `npm run web` starts the app in the browser
- The app will ask for camera, location, and media-library permissions at runtime

## Dev Server Vs Build

These commands do not create a final distributable build:

- `npm run start`
- `npm run android`
- `npm run ios`
- `npm run web`

They only start the Expo development server.

## How To Build

### Whole Project Build

Build the local project deliverables available on Windows:

```bash
npm run build
```

This runs:

- TypeScript typecheck
- Web production export
- Android debug APK build

Output locations:

- Web: `dist`
- Android debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`

### Web Build

Build only the web production output:

```bash
npm run build:web
```

Equivalent direct Expo command:

```bash
npx expo export -p web
```

The exported files will be generated in:

- `dist`

Preview the production web build on `http://localhost:8081`:

```bash
npm run preview:web
```

### Android Local Native Build

Android local native build outputs are generated here after `npx expo prebuild -p android` and Android build commands:

- APKs: `d:\Learnings\GPS Camera\gps-camera\android\app\build\outputs\apk\`
- AABs/bundles: `d:\Learnings\GPS Camera\gps-camera\android\app\build\outputs\bundle\`

Build commands:

```bash
npx expo prebuild -p android
```

```powershell
cd android
.\gradlew assembleDebug
.\gradlew assembleRelease
.\gradlew bundleRelease
```

### Android Debug APK

Build only the Android debug APK:

```bash
npm run build:android
```

Equivalent commands:

```bash
npm run build:apk
npm run build:apk:debug
```

Debug APK output:

- `android/app/build/outputs/apk/debug/app-debug.apk`

### Android Release APK

Build a release APK locally:

```bash
npm run build:apk:release
```

Release APK output:

- `android/app/build/outputs/apk/release/app-release.apk`

### Android Release AAB

Build a release Android App Bundle locally:

```bash
npm run build:aab
```

Equivalent command:

```bash
npm run build:android:bundle
```

Release bundle output:

- `android/app/build/outputs/bundle/release/app-release.aab`

### iOS Build

Local iOS builds still require macOS. On Windows, `npm run build` does not build iOS.

If you are on macOS, you can use:

```bash
npm run build:ios
```

Typical local iOS build output is generated under:

- `ios/build/`

## Which File To Share Or Install

- Web: use the `dist` folder
- Android: use the generated `.apk` or `.aab` inside `android/app/build/outputs/...`
- iOS: use the generated app/archive from the `ios/build` flow

## GitHub Release Build

A GitHub Actions workflow is included to build signed Android release artifacts whenever you push a Git tag.

Workflow file:

- `.github/workflows/build-android-release.yml`

Trigger:

- Push any Git tag

Generated release files:

- `android/app/build/outputs/apk/release/app-release.apk`
- `android/app/build/outputs/bundle/release/app-release.aab`

Required GitHub repository secrets:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

The workflow uploads both files as workflow artifacts and attaches them to the GitHub release for that tag.

## Optional EAS Build

If you want cloud builds, install EAS CLI:

```bash
npm install -g eas-cli
```

Login and configure EAS:

```bash
eas login
```

Then build for Android or iOS:

```bash
eas build -p android
```

```bash
eas build -p ios
```

Note: EAS is optional and may require an `eas.json` file depending on your build setup.

## App Configuration

Current app metadata:

- App name: `GPS CAMERA`
- Version: `1.0.0`
- App icon: `assets/app-icon.png`

Main config file:

- `app.json`

## Permissions Used

The app requests:

- Camera permission
- Foreground location permission
- Media library permission

## Useful Commands

```bash
npm install
```

```bash
npm run start
```

```bash
npm run android
```

```bash
npm run ios
```

```bash
npm run web
```

```bash
npm run build
```

```bash
npm run build:web
```

```bash
npm run build:android
```

```bash
npm run build:apk:release
```

```bash
npm run build:aab
```

```bash
npm run build:ios
```

```bash
npm run preview:web
```

```bash
npx tsc --noEmit
```

## Project Structure

```text
src/
  components/
  logics/
  screens/
assets/
App.tsx
app.json
index.ts
```

## Troubleshooting

- If location is not fetched, make sure device GPS is enabled
- If camera is not opening, confirm camera permission is granted
- If the web map does not load, verify your internet connection and tile configuration
- If Metro behaves unexpectedly, restart it with:

```bash
npx expo start --clear
```
