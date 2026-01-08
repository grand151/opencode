import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useServer } from '../contexts/ServerContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const { serverUrl, connected } = useServer();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Server URL</Text>
          <Text style={styles.value}>{serverUrl}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, connected ? styles.connected : styles.disconnected]}>
            {connected ? 'Connected' : 'Disconnected'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Version</Text>
          <Text style={styles.value}>1.1.6</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Platform</Text>
          <Text style={styles.value}>Android (Expo)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>
          OpenCode is an open source AI coding agent. This mobile app allows you to connect to
          your OpenCode server and manage coding sessions on the go.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#fff',
  },
  connected: {
    color: '#00ff00',
  },
  disconnected: {
    color: '#ff3333',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
});
