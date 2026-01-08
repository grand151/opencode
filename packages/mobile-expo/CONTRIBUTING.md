# Contributing to OpenCode Mobile

Thank you for your interest in contributing to the OpenCode mobile app!

## Development Setup

### Prerequisites

1. **Node.js** (v20 or higher)
   ```bash
   node --version
   ```

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **Expo CLI** (will be installed with dependencies)

4. **Android Development** (choose one):
   - **Expo Go App** (easiest): Install from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **Android Studio**: For running on an emulator
   - **Physical Device**: Connected via USB with developer mode enabled

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/anomalyco/opencode.git
   cd opencode/packages/mobile-expo
   ```

2. Install dependencies:
   ```bash
   npm install --no-workspaces
   ```
   
   Note: The `--no-workspaces` flag is required because this is part of a monorepo.

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your device:
   - **Expo Go**: Scan the QR code with the Expo Go app
   - **Android Emulator**: Press `a` in the terminal
   - **iOS Simulator** (macOS only): Press `i` in the terminal

## Project Structure

```
packages/mobile-expo/
├── App.tsx                 # Main app entry point with navigation
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── SessionScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── contexts/          # React contexts for state management
│   │   └── ServerContext.tsx
│   ├── components/        # Reusable UI components
│   │   ├── EmptyState.tsx
│   │   └── LoadingSpinner.tsx
│   ├── utils/             # Utility functions and helpers
│   │   └── api-client.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   └── hooks/             # Custom React hooks (empty for now)
├── assets/                # Images, fonts, etc.
├── package.json
├── tsconfig.json
└── app.json              # Expo configuration
```

## Code Style

- We use TypeScript for type safety
- Follow React Native best practices
- Use functional components with hooks
- Keep components small and focused
- Use StyleSheet for styling (not inline styles)

## Testing Your Changes

1. **Type checking**:
   ```bash
   npm run typecheck
   ```

2. **Testing on device**:
   - Make sure you test on actual Android hardware when possible
   - Test different screen sizes (phone and tablet)
   - Test both portrait and landscape orientations

3. **Testing with OpenCode server**:
   - You need a running OpenCode server to test full functionality
   - Start the server locally:
     ```bash
     # In the root of the opencode repo
     cd packages/opencode
     bun dev
     ```
   - The server will run on `http://localhost:4096` by default
   - Configure this URL in the mobile app

## Common Tasks

### Adding a New Screen

1. Create a new file in `src/screens/`
2. Add the screen to `RootStackParamList` in `src/types/index.ts`
3. Add the screen to the navigator in `App.tsx`

### Adding a New Component

1. Create a new file in `src/components/`
2. Export the component
3. Use it in your screens

### Updating API Client

1. Modify `src/utils/api-client.ts`
2. Update types as needed
3. Update the ServerContext if new methods are needed

## Debugging

### React Native Debugger

1. Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android) in emulator
2. Select "Debug" to open Chrome DevTools
3. Use `console.log()` for debugging

### Common Issues

**"npm install" fails with catalog error**:
- Always use `npm install --no-workspaces` in the mobile-expo directory

**App won't connect to server**:
- Make sure the server URL is correct
- Check that the OpenCode server is running
- On Android emulator, use `http://10.0.2.2:4096` instead of `localhost`
- On physical device, use your computer's IP address

**TypeScript errors**:
- Run `npm run typecheck` to see all errors
- Make sure you have the latest dependencies installed

## Submitting Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Add my new feature"
   ```

3. Push and create a pull request:
   ```bash
   git push origin feature/my-new-feature
   ```

4. In your PR description:
   - Explain what you changed and why
   - Include screenshots for UI changes
   - List any testing you did
   - Mention any breaking changes

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Questions?

- Join our [Discord](https://discord.gg/opencode)
- Open an issue on [GitHub](https://github.com/anomalyco/opencode/issues)
- Check the main [OpenCode documentation](https://opencode.ai/docs)
