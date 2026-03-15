import { chromium } from 'playwright';

/**
 * BrowserManager handles the lifecycle of the Playwright browser instance.
 * It provides a consistent environment with human-like fingerprinting.
 */
class BrowserManager {
  constructor() {
    this.browser = null;
    this.context = null;
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
