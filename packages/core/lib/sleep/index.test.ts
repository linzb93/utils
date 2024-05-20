import { describe, it, expect } from 'vitest';
import { sleep } from "./index";

describe('sleep', () => {
    it('延时2秒', async () => {
        const startTime = new Date().getTime();
        await sleep(2000);
        const delta = new Date().getTime() - startTime;
        expect(delta - 2000).toBeLessThan(50);
    });
})