import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useServer } from '../contexts/ServerContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Session'>;

export function SessionScreen({ route, navigation }: Props) {
  const { sessionId } = route.params;
  const { getSession } = useServer();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: `Session: ${sessionId.substring(0, 8)}` });
    loadMessages();
  }, [sessionId]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const sessionData = await getSession(sessionId);
      if (sessionData?.messages) {
        setMessages(sessionData.messages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const messageText = input.trim();
    setInput('');
    
    // Add user message optimistically
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    try {
      // This is a simplified version - you'd need to implement proper message sending
      // based on the actual OpenCode API
      console.log('Sending message:', messageText);
      await loadMessages(); // Reload messages after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {loading && messages.length === 0 ? (
          <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        ) : messages.length === 0 ? (
          <Text style={styles.emptyText}>No messages yet. Start a conversation!</Text>
        ) : (
          messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageItem,
                message.role === 'user' ? styles.userMessage : styles.assistantMessage,
              ]}
            >
              <Text style={styles.messageRole}>
                {message.role === 'user' ? 'You' : 'Assistant'}
              </Text>
              <Text style={styles.messageContent}>{message.content}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!input.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  loader: {
    marginTop: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },
  messageItem: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  messageRole: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  messageContent: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#0a0a0a',
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 14,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#333',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
