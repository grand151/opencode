import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ServerProvider } from './src/contexts/ServerContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { SessionScreen } from './src/screens/SessionScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import type { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ServerProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#000',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Session"
            component={SessionScreen}
            options={{ title: 'Session' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ServerProvider>
  );
}
