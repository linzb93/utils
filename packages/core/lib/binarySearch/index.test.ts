import { describe, it, expect } from 'vitest';
import { binarySearch } from "./index";

describe('binarySearch', () => {
    it('传参格式不正确，报错', () => {
        expect(() => binarySearch({
            start: 15,
            end: 10
        }, data => data < 40)).toThrowError('start 和 end 必须是正整数，且 start 的值要小于 end');
    });
    it('测试单调递增的', () => {
        expect(binarySearch({
            start: 1,
            end: 100
        }, data => data < 40)).toBe(39);
    });
    it('测试单调递减的', () => {
        expect(binarySearch({
            start: 1,
            end: 100
        }, data => data > 40)).toBe(41);
    });
});