import browserManager from './browserManager.js';
import { delay, typingDelay } from './utils.js';
import scrollManager from './scrollManager.js';

class ThreadsBot {
  constructor() {
    this.baseUrl = 'https://www.threads.net';
  }

  /**
   * Logs into Threads (usually via Instagram credentials)
   * @param {string} username 
   * @param {string} password 
   */
  async login(username, password) {
    const page = await browserManager.newPage();
    console.log(`🔐 Logging into Threads as ${username}...`);

    try {
      await page.goto(`${this.baseUrl}/login`, { waitUntil: 'networkidle' });
      await delay(2000, 1000);

      // Enter credentials
      await page.fill('input[placeholder="Username, phone or email"]', username);
      await typingDelay();
      await page.fill('input[placeholder="Password"]', password);
      await typingDelay();

      await page.click('button[type="submit"]');
      await page.waitForNavigation({ waitUntil: 'networkidle' });

      console.log('✅ Logged into Threads successfully.');
      return page;
    } catch (error) {
      console.error('❌ Threads login failed:', error);
      throw error;
    }
  }

  /**
   * Navigates to a specific profile
   */
  async goToProfile(page, username) {
    console.log(`🏃 Navigating to Threads profile: ${username}`);
    await page.goto(`${this.baseUrl}/@${username}`, { waitUntil: 'networkidle' });
    await delay(2000, 1000);
  }

  /**
   * Browses the feed
   */
  async browseFeed(page) {
    console.log('👀 Browsing Threads feed...');
    await scrollManager.randomScroll(page);
  }
}

export default new ThreadsBot();
