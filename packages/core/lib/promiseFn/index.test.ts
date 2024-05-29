import {describe, it, expect, vi} from 'vitest'
import { pRetry, pLocate } from '.';
import { sleep } from '../sleep';

describe('pRetry', () => {
    let counter = 0;
        const pInput = (max:number) => () => {
            counter += 1;
            return new Promise((resolve, reject) => {
                if (counter < max) {
                    reject('pRetry error');
                } else {
                    counter = 0;
                    resolve(null);
                }
            })
        }
    it('重试2次成功', async () => {
        const callback = vi.fn((count) => `调用${count}次`);
        const ret = pRetry(pInput(3), {
            retries: 3,
            retryTimesCallback: callback
        });
        await expect(ret).resolves.toEqual(null);
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenLastCalledWith(2, undefined);
    });
    it('重试4次还是失败了', async () => {
        const ret = pRetry(pInput(6), {
            retries: 4
        });
        await expect(ret).rejects.toThrow('pRetry error')
    });
})

describe('pLocate', () => {
    const pFn = (isError: boolean) => {
        return pLocate(['error', isError ? 'erro' : 200, 'error'], async (item) => {
            if (Number.isInteger(item)) {
                return sleep(item);
            }
            return sleep(300, true);
        })
    }
    it('第二个是正确的', async () => {
        await expect(pFn(false)).resolves.toBe(200);
    });
    it('没有一个是正确的', async () => {
        await expect(() => pFn(true)).rejects.toThrow('pLocate error');
    });
});