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
    const page = await browserManager.newPage();
    console.log(`🔐 Logging into Instagram as ${username}...`);

    try {
      await page.goto(`${this.baseUrl}/accounts/login/`, { waitUntil: 'networkidle' });
      await delay(2000, 1000);

      // Handle cookies/consent if present
      const cookieButton = await page.$('button:has-text("Allow all cookies"), button:has-text("Allow essential and additional cookies"), button:has-text("Decline optional cookies")');
      if (cookieButton) {
        await cookieButton.click();
        await delay(1000, 500);
      }

      // Enter credentials
      await page.fill('input[name="username"]', username);
      await typingDelay();
      await page.fill('input[name="password"]', password);
      await typingDelay();

      await page.click('button[type="submit"]');
      await page.waitForNavigation({ waitUntil: 'networkidle' });

      // Handle "Save Login Info" and "Turn on Notifications" popups
      await this.handlePopups(page);

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
}

export default new InstagramBot();
