/**
 * Common utilities for browser automation
 */

/**
 * Wait for a specified amount of time with optional randomness
 * @param {number} ms - Base milliseconds to wait
 * @param {number} randomRange - Optional random range to add
 */
export const delay = (ms, randomRange = 0) => {
  const waitTime = ms + Math.floor(Math.random() * randomRange);
  return new Promise(resolve => setTimeout(resolve, waitTime));
};

/**
 * Generate a human-like delay between keystrokes
 */
export const typingDelay = () => delay(50, 150);

/**
 * Randomize a value slightly
 */
export const randomize = (val, percent = 0.1) => {
  const offset = val * percent;
  return val + (Math.random() * offset * 2 - offset);
};

/**
 * Human-like random pause
 */
export const randomPause = async () => {
  const chance = Math.random();
  if (chance > 0.8) {
    console.log('⏳ Taking a short breath...');
    await delay(2000, 3000);
  } else if (chance > 0.95) {
    console.log('☕ Taking a coffee break...');
    await delay(10000, 5000);
  }
};
