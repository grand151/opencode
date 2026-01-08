# OpenCode Mobile - Quick Start Guide

This guide will help you get started with the OpenCode mobile app for Android.

## What is OpenCode Mobile?

OpenCode Mobile is an Android application that allows you to connect to your OpenCode server and manage coding sessions remotely. It's built with Expo and React Native, making it easy to develop and deploy.

## Features

✅ **Connect to OpenCode Server** - Connect to local or remote OpenCode instances  
✅ **Session Management** - View and browse your coding sessions  
✅ **Dark Theme** - Optimized dark UI that matches OpenCode's aesthetic  
✅ **Settings** - Configure server connection and view app info  

🚧 **Coming Soon**:
- Real-time message streaming
- Full session interaction (send messages, run commands)
- Terminal emulation
- File browser and editor
- Offline mode
- Push notifications

## Installation

### For Users

Currently, OpenCode Mobile is in development. To try it:

1. Install **Expo Go** from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Ask a developer to share the QR code from their dev server, or follow the developer setup below

### For Developers

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed development setup instructions.

Quick start:
```bash
cd packages/mobile-expo
npm install --no-workspaces
npm start
```

## Usage

### Connecting to Your Server

1. **Local Development** (on your computer):
   - Server URL: `http://localhost:4096`
   - Note: On Android emulator, use `http://10.0.2.2:4096` instead

2. **Physical Device** (same network):
   - Find your computer's IP address
   - Server URL: `http://YOUR_IP:4096`
   - Example: `http://192.168.1.100:4096`

3. **Remote Server**:
   - Server URL: Your server's public URL
   - Example: `https://your-server.com`
   - ⚠️ Always use HTTPS for remote connections

### Viewing Sessions

1. Enter your server URL on the home screen
2. Tap "Connect"
3. Once connected, you'll see a list of your sessions
4. Tap any session to view its details

### Settings

Access the Settings screen to:
- View your current server connection
- Check connection status
- See app version and platform info

## Troubleshooting

### Cannot Connect to Server

- **Check server is running**: Make sure your OpenCode server is running
- **Check URL format**: Should be `http://` or `https://` followed by host and port
- **Firewall**: Make sure your firewall allows connections to port 4096
- **Network**: Device must be on the same network as the server (or use public URL)

### App Crashes

- **Clear cache**: Shake device → "Reload" or "Clear cache"
- **Reinstall app**: Uninstall Expo Go and reinstall
- **Check logs**: Look at Metro bundler logs in the terminal

### TypeScript Errors

```bash
npm run typecheck
```

This will show any type errors that need to be fixed.

## Architecture

The mobile app uses a client-server architecture:

```
┌─────────────────┐          ┌──────────────────┐
│  Mobile App     │          │  OpenCode Server │
│  (React Native) │ ◄─────► │  (Node/Bun)      │
│                 │   HTTP   │                  │
└─────────────────┘          └──────────────────┘
```

Key components:
- **ServerContext**: Manages server connection and API calls
- **Navigation**: React Navigation for screen routing
- **API Client**: Handles HTTP requests to OpenCode server
- **Screens**: HomeScreen, SessionScreen, SettingsScreen

See [ARCHITECTURE.md](./ARCHITECTURE.md) for more details.

## FAQ

**Q: Does this work on iOS?**  
A: The code should work on iOS, but it hasn't been tested. iOS testing requires a Mac.

**Q: When will this be on the Play Store?**  
A: Not yet scheduled. This is currently an experimental feature.

**Q: Can I use this without an OpenCode server?**  
A: No, you need a running OpenCode server to connect to. The mobile app is a client.

**Q: Is this secure?**  
A: For local development, it's fine. For production/remote servers, always use HTTPS and proper authentication.

**Q: Can I contribute?**  
A: Yes! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Support

- 📖 [Documentation](https://opencode.ai/docs)
- 💬 [Discord Community](https://discord.gg/opencode)
- 🐛 [Report Issues](https://github.com/anomalyco/opencode/issues)
- 🌟 [Star on GitHub](https://github.com/anomalyco/opencode)

## License

MIT License - see [LICENSE](../../LICENSE) for details.
