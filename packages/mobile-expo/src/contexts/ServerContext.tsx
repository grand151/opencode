import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OpencodeApiClient, type Session, type SessionDetails } from '../utils/api-client';

interface ServerContextType {
  serverUrl: string;
  setServerUrl: (url: string) => void;
  connected: boolean;
  fetchSessions: () => Promise<Session[]>;
  getSession: (id: string) => Promise<SessionDetails | null>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export function ServerProvider({ children }: { children: ReactNode }) {
  const [serverUrl, setServerUrl] = useState('http://localhost:4096');
  const [connected, setConnected] = useState(false);
  const [apiClient, setApiClient] = useState<OpencodeApiClient | null>(null);

  useEffect(() => {
    if (!serverUrl) {
      setConnected(false);
      setApiClient(null);
      return;
    }

    const client = new OpencodeApiClient(serverUrl);
    setApiClient(client);

    // Test connection
    client.checkHealth()
      .then((isHealthy) => setConnected(isHealthy))
      .catch(() => setConnected(false));
  }, [serverUrl]);

  const fetchSessions = async (): Promise<Session[]> => {
    if (!apiClient) return [];
    try {
      return await apiClient.listSessions();
    } catch (error) {
      console.error('Error fetching sessions:', error);
      return [];
    }
  };

  const getSession = async (id: string): Promise<SessionDetails | null> => {
    if (!apiClient) return null;
    try {
      return await apiClient.getSession(id);
    } catch (error) {
      console.error('Error fetching session:', error);
      return null;
    }
  };

  return (
    <ServerContext.Provider 
      value={{ 
        serverUrl, 
        setServerUrl, 
        connected,
        fetchSessions,
        getSession,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}

export function useServer() {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServer must be used within a ServerProvider');
  }
  return context;
}
