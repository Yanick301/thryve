/**
 * ScrollManager provides human-like scrolling capabilities.
 * It uses easing functions and variable speeds to avoid detection.
 */
class ScrollManager {
  /**
   * Smoothly scrolls to a specific position or until an element is found
   * @param {Page} page - Playwright page instance
   * @param {number} distance - Distance to scroll (optional)
   */
  async smoothScroll(page, distance = 500) {
    console.log(`📜 Scrolling smoothly (${distance}px)...`);
    
    await page.evaluate(async (scrollDistance) => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          const step = Math.floor(Math.random() * 30) + 10;
          window.scrollBy(0, step);
          totalHeight += step;

          if (totalHeight >= scrollDistance || totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 40 + Math.random() * 60);
      });
    }, distance);
  }

  /**
   * Scrolls to the bottom of the page
   */
  async scrollToBottom(page) {
    console.log('📜 Scrolling to bottom...');
    let previousHeight;
    while (true) {
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await this.smoothScroll(page, 1000);
      await page.waitForTimeout(1000 + Math.random() * 2000); // Random wait
      const currentHeight = await page.evaluate('document.body.scrollHeight');
      if (currentHeight === previousHeight) break;
    }
  }

  /**
   * Random scroll to simulate browsing
   */
  async randomScroll(page) {
    const scrolls = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < scrolls; i++) {
      const dist = 300 + Math.floor(Math.random() * 600);
      await this.smoothScroll(page, dist);
      await page.waitForTimeout(500 + Math.random() * 1500);
    }
  }
}

export default new ScrollManager();
