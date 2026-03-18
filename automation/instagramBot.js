import browserManager from './browserManager.js';
import { delay, typingDelay } from './utils.js';
import scrollManager from './scrollManager.js';

class InstagramBot {
  constructor() {
    this.baseUrl = 'https://www.instagram.com';
  }

  /**
   * Logs into Instagram
   * @param {string} username 
   * @param {string} password 
   */
  async login(username, password) {
    // 1. Try to load existing session
    const sessionLoaded = await browserManager.loadSession(username);
    const page = await browserManager.newPage();
    
    if (sessionLoaded) {
      console.log(`✨ Using existing session for ${username}`);
      await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
      // Verify if we are actually logged in
      const isLoggedIn = await page.$('svg[aria-label="Home"], svg[aria-label="Accueil"]');
      if (isLoggedIn) {
        return page;
      }
      console.log('⚠️ Session expired or invalid, proceeding to full login.');
    }

    console.log(`🔐 Logging into Instagram as ${username}...`);
    try {
      await page.goto(`${this.baseUrl}/accounts/login/`, { waitUntil: 'networkidle' });
      await delay(2000, 1000);

      // Handle cookies/consent
      const cookieSelectors = [
        'button:has-text("Allow all cookies")',
        'button:has-text("Allow essential and additional cookies")',
        'button:has-text("Decline optional cookies")',
        'button:has-text("Autoriser tous les cookies")',
        'button:has-text("Accepter tout")'
      ];
      
      for (const selector of cookieSelectors) {
        const btn = await page.$(selector);
        if (btn) {
          await btn.click();
          await delay(1000, 500);
          break;
        }
      }

      // Enter credentials
      await page.fill('input[name="username"]', username);
      await typingDelay();
      await page.fill('input[name="password"]', password);
      await typingDelay();

      await page.click('button[type="submit"]');
      
      // Wait for login success - check for home icon or profile link
      try {
        await page.waitForSelector('svg[aria-label="Home"], svg[aria-label="Accueil"], a[href*="/direct/inbox/"]', { timeout: 20000 });
      } catch (e) {
        console.error('❌ Login timeout or verification needed.');
        throw new Error('Authentication failed or verification required.');
      }

      // Handle popups
      await this.handlePopups(page);

      // Save session
      await browserManager.saveSession(username);

      console.log('✅ Logged in successfully.');
      return page;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  /**
   * Handles common Instagram popups (Save Info, Notifications)
   */
  async handlePopups(page) {
    console.log('🧹 Handling post-login popups...');
    
    // "Save your login info?"
    const saveInfoBtn = await page.$('button:has-text("Not Now"), button:has-text("Plus tard")');
    if (saveInfoBtn) {
      await saveInfoBtn.click();
      await delay(1500, 500);
    }

    // "Turn on Notifications"
    const notifBtn = await page.$('button:has-text("Not Now"), button:has-text("Plus tard")');
    if (notifBtn) {
      await notifBtn.click();
      await delay(1000, 500);
    }
  }

  /**
   * Navigates to a specific profile
   */
  async goToProfile(page, username) {
    console.log(`🏃 Navigating to profile: ${username}`);
    await page.goto(`${this.baseUrl}/${username}/`, { waitUntil: 'networkidle' });
    await delay(2000, 1000);
  }

  /**
   * Browses the feed
   */
  async browseFeed(page) {
    console.log('👀 Browsing home feed...');
    await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
    await scrollManager.randomScroll(page);
  }

  /**
   * Extracts statistics for a given profile
   * @param {Page} page 
   * @param {string} username 
   */
  async extractStats(page, username) {
    await this.goToProfile(page, username);
    console.log(`📊 Extracting stats for ${username}...`);
    
    return await page.evaluate(() => {
      const statsElements = Array.from(document.querySelectorAll('header section ul li'));
      let followers = 0, following = 0, posts = 0;
      
      const parseCount = (str) => {
        const clean = str.replace(/[^\d.KMkm]/g, '').toLowerCase();
        if (clean.includes('k')) return parseFloat(clean) * 1000;
        if (clean.includes('m')) return parseFloat(clean) * 1000000;
        return parseInt(clean) || 0;
      };

      statsElements.forEach(el => {
        const text = el.innerText.toLowerCase();
        const count = parseCount(text);
        if (text.includes('follower') || text.includes('abonné')) followers = count;
        else if (text.includes('following') || text.includes('abonnement')) following = count;
        else if (text.includes('post') || text.includes('publication')) posts = count;
      });

      return { posts, followers, following };
    });
  }
}

export default new InstagramBot();
