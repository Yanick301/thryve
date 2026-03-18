import { chromium } from 'playwright';

/**
 * BrowserManager handles the lifecycle of the Playwright browser instance.
 * It provides a consistent environment with human-like fingerprinting.
 */
class BrowserManager {
  constructor() {
    this.browser = null;
    this.context = null;
    this.sessionsDir = './automation/sessions';
  }

  /**
   * Initializes the browser and context
   * @param {Object} options - Playwright launch options
   */
  async init(options = {}) {
    if (this.browser) return this.browser;

    console.log('🚀 Initializing Browser...');
    
    this.browser = await chromium.launch({
      headless: options.headless !== undefined ? options.headless : false,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1280,720'
      ],
      ...options
    });

    this.context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 1,
      hasTouch: false,
      isMobile: false,
    });

    // Add extra evasions
    await this.context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    console.log('✅ Browser initialized successfully.');
    return this.browser;
  }

  /**
   * Loads a session for a specific user if it exists
   * @param {string} username 
   */
  async loadSession(username) {
    if (!this.browser) await this.init();
    
    const fs = await import('fs');
    const path = await import('path');
    const sessionPath = path.join(this.sessionsDir, `${username}.json`);

    if (fs.existsSync(sessionPath)) {
      console.log(`📂 Loading session for ${username}...`);
      this.context = await this.browser.newContext({
        storageState: sessionPath,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });
      return true;
    }
    return false;
  }

  /**
   * Saves the current session for a specific user
   * @param {string} username 
   */
  async saveSession(username) {
    if (!this.context) return;
    
    const fs = await import('fs');
    const path = await import('path');
    if (!fs.existsSync(this.sessionsDir)) {
      fs.mkdirSync(this.sessionsDir, { recursive: true });
    }

    const sessionPath = path.join(this.sessionsDir, `${username}.json`);
    await this.context.storageState({ path: sessionPath });
    console.log(`💾 Session saved for ${username}.`);
  }

  /**
   * Creates a new page in the current context
   */
  async newPage() {
    if (!this.context) await this.init();
    return await this.context.newPage();
  }

  /**
   * Closes the browser
   */
  async close() {
    if (this.browser) {
      console.log('🛑 Closing Browser...');
      await this.browser.close();
      this.browser = null;
      this.context = null;
    }
  }
}

export default new BrowserManager();
