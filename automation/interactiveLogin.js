import browserManager from './browserManager.js';

/**
 * InteractiveLogin handles opening a browser for manual user authentication.
 */
class InteractiveLogin {
  /**
   * Opens a browser and navigates to the platform's login page
   * @param {string} platform - 'instagram' | 'threads'
   * @returns {Promise<{success: boolean, username?: string, error?: string}>}
   */
  async start(platform) {
    try {
      console.log(`🌐 Starting interactive login for ${platform}...`);
      
      // Ensure browser is initialised in non-headless mode
      await browserManager.init({ headless: false });
      const page = await browserManager.newPage();

      const loginUrl = platform === 'instagram' 
        ? 'https://www.instagram.com/accounts/login/' 
        : 'https://www.threads.net/login';

      await page.goto(loginUrl, { waitUntil: 'networkidle' });

      console.log('👀 Waiting for user to complete login in the opened browser...');

      // Wait for navigation to a "logged in" page
      // For Instagram/Threads, usually the home feed or a profile page
      try {
        await page.waitForURL((url) => {
          const u = url.toString();
          return u.includes('instagram.com/direct/') || 
                 u.includes('instagram.com/reels/') ||
                 (u.includes('instagram.com/') && !u.includes('/login') && !u.includes('/accounts/'));
        }, { timeout: 300000 }); // 5 minutes timeout for manual login
      } catch (e) {
        if (platform === 'threads') {
           // Basic check for threads too
           await page.waitForURL((url) => {
             const u = url.toString();
             return u.includes('threads.net') && !u.includes('/login');
           }, { timeout: 300000 });
        } else {
            throw new Error('Login timeout: L\'opération a pris trop de temps.');
        }
      }

      console.log('✅ Login detected!');
      
      // Try to extract username from profile link or something
      let username = 'unknown_nexus';
      try {
        if (platform === 'instagram') {
           username = await page.evaluate(() => {
             const link = document.querySelector('a[href*="/"] img[alt*="profil"]')?.closest('a')?.getAttribute('href');
             return link ? link.replace(/\//g, '') : 'operator_active';
           });
        }
      } catch (err) {
        console.warn('Could not extract username, using default.');
      }

      // Close page but maybe keep browser for other tasks if needed?
      // For now, let's keep it open or let browserManager handle it.
      // But we should probably return success so the frontend can update.
      
      return { success: true, username };
    } catch (error) {
      console.error('❌ Interactive login error:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new InteractiveLogin();
