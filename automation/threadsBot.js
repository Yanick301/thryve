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
    // 1. Try to load existing session
    const sessionLoaded = await browserManager.loadSession(username);
    const page = await browserManager.newPage();
    
    if (sessionLoaded) {
      console.log(`✨ Using existing session for ${username} on Threads`);
      await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
      // Verify if we are actually logged in - check for compose button or navigation
      const isLoggedIn = await page.$('svg[aria-label="Home"], svg[aria-label="Accueil"]');
      if (isLoggedIn) {
        return page;
      }
      console.log('⚠️ Threads session expired, proceeding to full login.');
    }

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
      
      // Wait for login success
      try {
        await page.waitForSelector('svg[aria-label="Home"], svg[aria-label="Accueil"]', { timeout: 20000 });
      } catch (e) {
        throw new Error('Threads login failed or verification needed.');
      }

      // Save session
      await browserManager.saveSession(username);

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

  /**
   * Extracts statistics for a given profile
   * @param {Page} page 
   * @param {string} username 
   */
  async extractStats(page, username) {
    await this.goToProfile(page, username);
    console.log(`📊 Extracting Threads stats for ${username}...`);
    
    return await page.evaluate(() => {
      // Threads layout is different
      const followersText = document.querySelector('span[class*="x1hq5gj4"]') ? document.querySelector('span[class*="x1hq5gj4"]').innerText : '0';
      
      const parseCount = (str) => {
        const clean = str.replace(/[^\d.KMkm]/g, '').toLowerCase();
        if (clean.includes('k')) return parseFloat(clean) * 1000;
        if (clean.includes('m')) return parseFloat(clean) * 1000000;
        return parseInt(clean) || 0;
      };

      return {
        posts: 0, // Threads doesn't easily show post count on mobile/lightweb
        followers: parseCount(followersText),
        following: 0
      };
    });
  }
}

export default new ThreadsBot();
