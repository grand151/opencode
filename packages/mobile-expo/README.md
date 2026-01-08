# OpenCode Mobile (Expo React Native)

An Android mobile application for OpenCode AI coding agent, built with Expo and React Native.

## Features

- Connect to your OpenCode server
- View and manage coding sessions
- Send messages and interact with AI agent
- Dark theme optimized for mobile viewing

## Prerequisites

- Node.js 20+
- npm or yarn
- Expo CLI
- Android Studio (for Android emulator) or physical Android device

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS (requires macOS):

```bash
npm run ios
```

Run in web browser:

```bash
npm run web
```

## Building for Production

### Android APK

```bash
npx expo build:android
```

### Android App Bundle (AAB)

```bash
npx eas build --platform android
```

## Configuration

The app connects to an OpenCode server. By default, it tries to connect to `http://localhost:4096`.

You can change the server URL in the app's home screen.

## Architecture

- **ServerContext**: Manages connection to OpenCode server using `@opencode-ai/sdk`
- **Navigation**: React Navigation with native stack navigator
- **Screens**:
  - HomeScreen: Server connection and session list
  - SessionScreen: View and interact with a specific session
  - SettingsScreen: App settings and information

## Project Structure

```
src/
├── screens/         # Screen components
│   ├── HomeScreen.tsx
│   ├── SessionScreen.tsx
│   └── SettingsScreen.tsx
├── contexts/        # React contexts
│   └── ServerContext.tsx
├── components/      # Reusable components
├── hooks/           # Custom hooks
├── utils/           # Utility functions
└── types/           # TypeScript type definitions
```

## Known Limitations

- This is an initial port focusing on Android
- Some features from the desktop/web version may not be available
- Terminal emulation is not yet implemented
- File browsing is limited

## License

MIT
