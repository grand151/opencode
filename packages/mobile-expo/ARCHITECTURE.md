# OpenCode Mobile App Architecture

## Overview

The OpenCode mobile app is an Android application built with Expo React Native that allows users to connect to an OpenCode server and manage coding sessions remotely.

## Architecture

### Client-Server Model

The mobile app follows the same client-server architecture as the desktop and web applications:

```
┌─────────────────────┐         ┌──────────────────────┐
│   Mobile App        │         │   OpenCode Server    │
│   (Expo/RN)         │ ◄─────► │   (packages/opencode)│
│                     │  HTTP   │                      │
└─────────────────────┘         └──────────────────────┘
```

### Components

1. **ServerContext**: Manages the connection to the OpenCode server
   - Handles server URL configuration
   - Tests connection health
   - Provides API methods for fetching sessions and data

2. **Navigation**: React Navigation stack navigator
   - HomeScreen: Server connection and session list
   - SessionScreen: View and interact with coding sessions
   - SettingsScreen: App configuration and information

3. **UI Components**: React Native components styled with StyleSheet
   - Dark theme consistent with OpenCode branding
   - Responsive layouts optimized for mobile screens

## API Communication

The mobile app communicates with the OpenCode server via REST API endpoints:

- `GET /api/health` - Check server health
- `GET /api/session` - List all sessions
- `GET /api/session/{id}` - Get session details
- `POST /api/session/{id}/message` - Send message to session (planned)

## Development Workflow

### Prerequisites

- Node.js 20+
- Expo CLI
- Android Studio (for emulator) or physical Android device with Expo Go

### Running the App

```bash
cd packages/mobile-expo
npm install --no-workspaces
npm start
```

### Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure project
eas build:configure

# Build for Android
eas build --platform android
```

## Known Limitations

- Currently read-only session viewing (writing messages not fully implemented)
- No terminal emulation (desktop feature)
- Limited file browsing
- iOS version not yet tested (should work but needs verification)

## Future Enhancements

- [ ] Full WebSocket support for real-time updates
- [ ] Terminal emulation for mobile
- [ ] File browser and editor
- [ ] Offline mode
- [ ] Push notifications for session updates
- [ ] iOS App Store release
- [ ] Google Play Store release

## Security Considerations

- Always use HTTPS when connecting to remote servers
- Server URL is stored in React Context (not persisted)
- No credentials are stored on the device
- Connection is established on-demand

## Contributing

When adding features to the mobile app:

1. Ensure consistency with desktop/web UX patterns
2. Test on both Android emulator and physical device
3. Consider mobile-specific UX patterns (touch, gestures, screen sizes)
4. Keep the app lightweight and performant
5. Follow React Native best practices
