import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import instagramBot from './instagramBot.js';
import threadsBot from './threadsBot.js';
import postPublisher from './postPublisher.js';
import engagementManager from './engagementManager.js';
import scrollManager from './scrollManager.js';
import browserManager from './browserManager.js';
import interactiveLogin from './interactiveLogin.js';

import { downloadMedia } from './utils.js';

dotenv.config();

const app = express();
const PORT = process.env.AUTOMATION_PORT || 3001;

app.use(cors());
app.use(express.json());

// --- Routes ---

/**
 * Verify account credentials
 * Body: { platform, username, password }
 */
app.post('/api/verify', async (req, res) => {
  const { platform, username, password } = req.body;
  console.log(`🔍 Verifying ${platform} account for ${username}...`);
  
  try {
    let page;
    if (platform === 'instagram') {
      page = await instagramBot.login(username, password);
    } else if (platform === 'threads') {
      page = await threadsBot.login(username, password);
    }
    // If login didn't throw, it's successful
    res.json({ success: true, message: 'Account verified successfully' });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Authentication failed' });
  }
});

/**
 * Trigger Interactive Login (Opens browser)
 * Body: { platform }
 */
app.post('/api/login-interactive', async (req, res) => {
  const { platform } = req.body;
  console.log(`🌐 Launching interactive ${platform} session...`);
  
  try {
    const result = await interactiveLogin.start(platform);
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Trigger an Instagram post
 * Body: { username, password, caption, mediaUrls }
 */
app.post('/api/instagram/publish', async (req, res) => {
  const { username, password, passwordLegacy, caption, mediaUrls, type = 'post' } = req.body;
  const actualPassword = password || passwordLegacy;
  
  try {
    // Download media if they are URLs
    const localPaths = await Promise.all(
      mediaUrls.map(url => url.startsWith('http') ? downloadMedia(url) : url)
    );

    const page = await instagramBot.login(username, actualPassword);
    if (type === 'reel') {
      await postPublisher.publishReel(page, { 
        caption, 
        mediaPath: localPaths[0] 
      });
    } else if (type === 'story') {
      await postPublisher.publishStory(page, { 
        mediaPath: localPaths[0] 
      });
    } else {
      await postPublisher.publishPost(page, { 
        caption, 
        mediaPaths: localPaths 
      });
    }
    res.json({ success: true, message: `${type} published successfully` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Trigger a Threads post
 * Body: { username, password, text, mediaUrls }
 */
app.post('/api/threads/publish', async (req, res) => {
  const { username, password, passwordLegacy, text, mediaUrls } = req.body;
  const actualPassword = password || passwordLegacy;

  try {
    const localPaths = await Promise.all(
      mediaUrls.map(url => url.startsWith('http') ? downloadMedia(url) : url)
    );

    const page = await threadsBot.login(username, actualPassword);
    await postPublisher.publishToThreads(page, { text, mediaPaths: localPaths });
    res.json({ success: true, message: 'Thread published successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Trigger Engagement (Like/Comment)
 * Body: { platform, username, password, profileToVisit, comment }
 */
app.post('/api/engage', async (req, res) => {
  const { platform, username, password, passwordLegacy, profileToVisit, comment } = req.body;
  const actualPassword = password || passwordLegacy;

  try {
    let page;
    if (platform === 'instagram') {
      page = await instagramBot.login(username, actualPassword);
      if (profileToVisit) await instagramBot.goToProfile(page, profileToVisit);
      await engagementManager.likeInstagramPost(page);
      if (comment) await engagementManager.commentOnInstagramPost(page, comment);
    } else if (platform === 'threads') {
      page = await threadsBot.login(username, password);
      if (profileToVisit) await threadsBot.goToProfile(page, profileToVisit);
      await engagementManager.likeThreadsPost(page);
      if (comment) await engagementManager.commentOnThreadsPost(page, comment);
    }
    res.json({ success: true, message: 'Engagement complete' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Trigger Scrolling (Human simulation)
 * Body: { platform, username, password }
 */
app.post('/api/browse', async (req, res) => {
  const { platform, username, password, passwordLegacy } = req.body;
  const actualPassword = password || passwordLegacy;

  try {
    let page;
    if (platform === 'instagram') {
      page = await instagramBot.login(username, actualPassword);
      await instagramBot.browseFeed(page);
    } else if (platform === 'threads') {
      page = await threadsBot.login(username, password);
      await threadsBot.browseFeed(page);
    }
    res.json({ success: true, message: 'Browsing complete' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', browserInitialized: !!browserManager.browser });
});

app.listen(PORT, () => {
  console.log(`🤖 Automation server running on http://localhost:${PORT}`);
});
