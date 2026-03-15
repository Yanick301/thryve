import { delay } from './utils.js';

class EngagementManager {
  /**
   * Likes a post on Instagram
   * @param {Page} page 
   */
  async likeInstagramPost(page) {
    console.log('❤️ Liking Instagram post...');
    const likeBtn = await page.$('span:has(svg[aria-label="Like"])');
    if (likeBtn) {
      await likeBtn.click();
      await delay(1000, 500);
    }
  }

  /**
   * Comments on an Instagram post
   * @param {Page} page 
   * @param {string} comment 
   */
  async commentOnInstagramPost(page, comment) {
    console.log(`💬 Commenting on Instagram: "${comment}"`);
    try {
      await page.fill('textarea[aria-label="Add a comment..."]', comment);
      await delay(500, 200);
      await page.click('div:has-text("Post")');
      await delay(2000, 500);
    } catch (error) {
      console.error('❌ Failed to comment on Instagram:', error);
    }
  }

  /**
   * Likes a post on Threads
   * @param {Page} page 
   */
  async likeThreadsPost(page) {
    console.log('❤️ Liking Threads post...');
    const likeBtn = await page.$('svg[aria-label="Like"]');
    if (likeBtn) {
      await likeBtn.click();
      await delay(1000, 500);
    }
  }
}

export default new EngagementManager();
