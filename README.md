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

## How To Build

### Android Debug Build

Generate the native Android project if needed:

```bash
npx expo prebuild -p android
```

Build and install a debug version:

```bash
npx expo run:android
```

### Android Release Build

Build a release variant locally:

```bash
npx expo run:android --variant release
```

### iOS Debug Build

Generate the native iOS project if needed:

```bash
npx expo prebuild -p ios
```

Run the iOS app locally:

```bash
npx expo run:ios
```

### iOS Release Build

Build a release version locally on macOS:

```bash
npx expo run:ios --configuration Release
```

### Web Build

Export the web app:

```bash
npx expo export -p web
```

The exported files will be generated in the output directory created by Expo.

Preview the production web build on `http://localhost:8081`:

```bash
npm run build:web
```

```bash
npm run preview:web
```

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
npm run build:web
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
