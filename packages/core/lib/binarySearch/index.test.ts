import { describe, it, expect } from 'vitest';
import { binarySearch } from "./index";

describe('binarySearch', () => {
    it('测试单调递增的', () => {
        expect(binarySearch({
            desc: false,
            start: 1,
            end: 100
        }, data => {
            return data < 40;
        })).toBe(39);
    });
    it('测试单调递减的', () => {
        expect(binarySearch({
            desc: false,
            start: 1,
            end: 100
        }, data => {
            return data > 40;
        })).toBe(41);
    });
});