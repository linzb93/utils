import browser from '../src/browser.js';
import { strict as assert } from 'assert';

assert.strictEqual(browser(), 'Hello from browser');
console.info("browser tests passed");
