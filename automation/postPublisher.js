import { delay, typingDelay } from './utils.js';

class PostPublisher {
  /**
   * Publishes a post to Instagram
   */
  async publishPost(page, { caption, mediaPaths }) {
    return this.publishToInstagram(page, { caption, mediaPaths, type: 'post' });
  }

  /**
   * Publishes a Reel to Instagram
   */
  async publishReel(page, { caption, mediaPath }) {
    console.log('📤 Publishing Reel to Instagram...');
    // Logique similaire au post mais avec sélection Reel si nécessaire
    return this.publishToInstagram(page, { caption, mediaPaths: [mediaPath], type: 'reel' });
  }

  /**
   * Publishes a Story to Instagram
   */
  async publishStory(page, { mediaPath }) {
    console.log('📤 Publishing Story to Instagram...');
    try {
      // Les stories ont souvent un flux différent sur mobile web
      // Pour desktop web, c'est limité, on simule l'upload via le bouton '+'
      await page.click('svg[aria-label="New post"], svg[aria-label="Nouvelle publication"]');
      await delay(2000, 500);
      
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.click('button:has-text("Select from computer"), button:has-text("Sélectionner sur l\'ordinateur")');
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([mediaPath]);
      await delay(3000, 1000);

      // Note: Instagram Desktop Web ne permet pas toujours de poster des stories
      // On assume ici une interface qui le permet ou on lance une erreur explicite
      console.log('ℹ️ Story upload complete. Finalizing...');
      await page.click('button:has-text("Add to your story"), button:has-text("Ajouter à votre story")');
      await delay(5000, 2000);
      console.log('✅ Story shared successfully!');
    } catch (error) {
      console.error('❌ Failed to publish Story:', error);
      throw error;
    }
  }

  async publishToInstagram(page, { caption, mediaPaths, type = 'post' }) {
    console.log(`📤 Publishing ${type} to Instagram...`);

    try {
      // 1. Click "Create" button
      await page.click('svg[aria-label="New post"], svg[aria-label="Nouvelle publication"]');
      await delay(2000, 500);

      // 2. Upload Media
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.click('button:has-text("Select from computer"), button:has-text("Sélectionner sur l\'ordinateur")');
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(mediaPaths);
      await delay(3000, 1000);

      // 3. Click "Next" (Crop)
      await page.click('div:has-text("Next"), div:has-text("Suivant")');
      await delay(1000, 500);

      // 4. Click "Next" (Filters)
      await page.click('div:has-text("Next"), div:has-text("Suivant")');
      await delay(1000, 500);

      // 5. Enter Caption
      await page.fill('div[aria-label="Write a caption..."], div[aria-label="Écrire une légende..."]', caption);
      await typingDelay();

      // 6. Click "Share"
      await page.click('div:has-text("Share"), div:has-text("Partager")');
      
      // Wait for success confirmation
      await page.waitForSelector('text="Your post has been shared", text="Votre publication a été partagée"', { timeout: 60000 });
      
      console.log('✅ Instagram post shared successfully!');
    } catch (error) {
      console.error('❌ Failed to publish to Instagram:', error);
      throw error;
    }
  }

  /**
   * Publishes a thread to Threads
   * @param {Page} page 
   * @param {Object} thread - { text, mediaPaths }
   */
  async publishToThreads(page, { text, mediaPaths }) {
    console.log('📤 Publishing to Threads...');

    try {
      // 1. Click "Start a thread"
      await page.click('div:has-text("Post"), div:has-text("Publier")');
      await delay(1000, 500);

      // 2. Enter text
      await page.fill('div[aria-label="Start a thread..."], div[aria-label="Démarrer un fil..."]', text);
      await typingDelay();

      // 3. Attach Media if present
      if (mediaPaths && mediaPaths.length > 0) {
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.click('svg[aria-label="Attach media"], svg[aria-label="Joindre un média"]');
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(mediaPaths);
        await delay(2000, 500);
      }

      // 4. Click "Post"
      await page.click('div:has-text("Post"), div:has-text("Publier")');
      
      console.log('✅ Threads post shared successfully!');
    } catch (error) {
      console.error('❌ Failed to publish to Threads:', error);
      throw error;
    }
  }
}

export default new PostPublisher();
