import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Session {
  id: string;
  title?: string;
  created?: string;
}

interface ServerContextType {
  serverUrl: string;
  setServerUrl: (url: string) => void;
  connected: boolean;
  fetchSessions: () => Promise<Session[]>;
  getSession: (id: string) => Promise<any>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export function ServerProvider({ children }: { children: ReactNode }) {
  const [serverUrl, setServerUrl] = useState('http://localhost:4096');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!serverUrl) {
      setConnected(false);
      return;
    }

    // Test connection
    fetch(`${serverUrl}/api/health`)
      .then((res) => {
        if (res.ok) {
          setConnected(true);
        } else {
          setConnected(false);
        }
      })
      .catch(() => {
        setConnected(false);
      });
  }, [serverUrl]);

  const fetchSessions = async (): Promise<Session[]> => {
    try {
      const response = await fetch(`${serverUrl}/api/session`);
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
      const data = await response.json();
      return data.sessions || [];
    } catch (error) {
      console.error('Error fetching sessions:', error);
      return [];
    }
  };

  const getSession = async (id: string): Promise<any> => {
    try {
      const response = await fetch(`${serverUrl}/api/session/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch session');
      }
      return await response.json();
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
