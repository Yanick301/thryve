/**
 * THRYVE — Automation Service
 * Handles communication with the Playwright automation server.
 */

const AUTOMATION_API_URL = 'http://localhost:3001';

export interface AutomationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const automationService = {
  /**
   * Health check for the automation server
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${AUTOMATION_API_URL}/health`);
      const data = await response.json();
      return response.ok && data.status === 'ok';
    } catch (error) {
      console.error('Automation health check failed:', error);
      return false;
    }
  },

  /**
   * Publish a post to Instagram
   */
  async publishInstagram(data: {
    username: string;
    passwordLegacy?: string; // Note: For legacy/mock handling
    caption: string;
    mediaUrls: string[];
    type?: 'post' | 'story' | 'reel';
  }): Promise<AutomationResponse> {
    try {
      const response = await fetch(`${AUTOMATION_API_URL}/api/instagram/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Publish a post to Threads
   */
  async publishThreads(data: {
    username: string;
    passwordLegacy?: string;
    text: string;
    mediaUrls: string[];
  }): Promise<AutomationResponse> {
    try {
      const response = await fetch(`${AUTOMATION_API_URL}/api/threads/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Trigger direct engagement actions
   */
  async engage(data: {
    platform: 'instagram' | 'threads';
    username: string;
    passwordLegacy?: string;
    profileToVisit?: string;
    comment?: string;
  }): Promise<AutomationResponse> {
    try {
      const response = await fetch(`${AUTOMATION_API_URL}/api/engage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Warm up / Browse the feed to look human
   */
  async browse(data: {
    platform: 'instagram' | 'threads';
    username: string;
    passwordLegacy?: string;
  }): Promise<AutomationResponse> {
    try {
      const response = await fetch(`${AUTOMATION_API_URL}/api/browse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Verify account credentials by attempting a login on the automation server
   */
  async verifyAccount(data: {
    platform: 'instagram' | 'threads';
    username: string;
    passwordLegacy?: string;
  }): Promise<AutomationResponse> {
    try {
      const response = await fetch(`${AUTOMATION_API_URL}/api/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};
