import { describe, it, expect, vi } from 'vitest';
import { fakeProgress } from "./index";
import { sleep } from '../sleep/index';

describe('fakeProgress', () => {
    it.concurrent('3.5秒完成', async () => {
        const promise = sleep(3500);
        const resolveFn = vi.fn();
        const obs$ = fakeProgress(promise, 3);
        const collected: number[] = [];
        obs$.subscribe((data) => {
            collected.push(data);
        });
        obs$.then(resolveFn);
        await vi.waitUntil(() => obs$.resolved(), {
            timeout: 5000,
            interval: 100
        });
        expect(collected.every((item, index) => Math.abs(item - 33 * index) <= 5)).toBeTruthy();
        expect(resolveFn).toHaveBeenCalledTimes(1);
        expect(resolveFn).toHaveBeenCalledWith(3500)
    });
    it.concurrent('3.5秒完成，但是报错了', async () => {
        const promise = sleep(3500, true);
        const obs$ = fakeProgress(promise, 3);
        const rejectFn = vi.fn();
        const collected = [];
        obs$.subscribe((data) => {
            collected.push(data);
        });
        obs$.catch(rejectFn);
        await vi.waitUntil(() => obs$.resolved(), {
            timeout: 5000,
            interval: 100
        });
        expect(rejectFn).toHaveBeenCalledTimes(1);
        expect(rejectFn).toHaveBeenCalledWith(3500)
    });
});