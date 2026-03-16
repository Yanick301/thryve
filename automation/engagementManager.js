import { delay } from './utils.js';

class EngagementManager {
  /**
   * Likes a post on Instagram
   * @param {Page} page 
   */
  async likeInstagramPost(page) {
    console.log('❤️ Tentative de Like sur Instagram...');
    try {
      // Simulate interest by waiting a bit
      await delay(1500, 2000);
      const likeBtn = await page.$('span:has(svg[aria-label="Like"]), span:has(svg[aria-label="J’aime"])');
      if (likeBtn) {
        await likeBtn.click();
        console.log('✅ Like envoyé');
        await delay(1000, 500);
      }
    } catch (error) {
       console.error('❌ Erreur Like IG:', error);
    }
  }

  /**
   * Comments on an Instagram post
   * @param {Page} page 
   * @param {string} comment 
   */
  async commentOnInstagramPost(page, comment) {
    console.log(`💬 Commentaire IG : "${comment}"`);
    try {
      await delay(2000, 1000);
      const commentArea = await page.waitForSelector('textarea[aria-label="Add a comment..."], textarea[aria-label="Ajouter un commentaire..."]');
      await commentArea.click();
      await page.fill('textarea[aria-label="Add a comment..."], textarea[aria-label="Ajouter un commentaire..."]', comment);
      await delay(500, 200);
      await page.click('div:has-text("Post"), div:has-text("Publier")');
      await delay(2000, 500);
      console.log('✅ Commentaire envoyé');
    } catch (error) {
      console.error('❌ Échec commentaire IG:', error);
    }
  }

  /**
   * Likes a post on Threads
   * @param {Page} page 
   */
  async likeThreadsPost(page) {
    console.log('❤️ Tentative de Like sur Threads...');
    try {
      await delay(1000, 1000);
      const likeBtn = await page.$('svg[aria-label="Like"], svg[aria-label="J’aime"]');
      if (likeBtn) {
        await likeBtn.click();
        console.log('✅ Like Threads envoyé');
        await delay(1000, 500);
      }
    } catch (error) {
      console.error('❌ Échec Like Threads:', error);
    }
  }

  /**
   * Comments on a Threads post
   * @param {Page} page 
   * @param {string} comment 
   */
  async commentOnThreadsPost(page, comment) {
    console.log(`💬 Commentaire Threads : "${comment}"`);
    try {
      await delay(2000, 1000);
      // Threads comment selector might vary, using aria-label as fallback
      const commentArea = await page.waitForSelector('div[aria-label="Start a thread..."], div[aria-label="Démarrer un fil..."]');
      await commentArea.click();
      await page.fill('div[aria-label="Start a thread..."], div[aria-label="Démarrer un fil..."]', comment);
      await delay(500, 200);
      await page.click('div:has-text("Post"), div:has-text("Publier")');
      await delay(2000, 500);
      console.log('✅ Commentaire Threads envoyé');
    } catch (error) {
      console.error('❌ Échec commentaire Threads:', error);
    }
  }
}

export default new EngagementManager();
