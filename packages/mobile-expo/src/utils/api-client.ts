/**
 * OpenCode API Client
 * Simple fetch-based client for communicating with OpenCode server
 */

export interface Session {
  id: string;
  title?: string;
  created?: string;
  updated?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface SessionDetails extends Session {
  messages?: Message[];
}

interface SessionsResponse {
  sessions: Session[];
}

export class OpencodeApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
  }

  /**
   * Check if server is reachable
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  /**
   * List all sessions
   */
  async listSessions(): Promise<Session[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/session`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SessionsResponse = await response.json();
      return data.sessions || [];
    } catch (error) {
      console.error('Failed to list sessions:', error);
      throw error;
    }
  }

  /**
   * Get session details including messages
   */
  async getSession(sessionId: string): Promise<SessionDetails | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/session/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get session:', error);
      throw error;
    }
  }

  /**
   * Send a message to a session (future implementation)
   */
  async sendMessage(sessionId: string, content: string): Promise<Message> {
    try {
      const response = await fetch(`${this.baseUrl}/api/session/${sessionId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }
}
