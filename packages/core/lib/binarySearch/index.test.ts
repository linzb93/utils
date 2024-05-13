import { binarySearch } from "./index";

describe('binarySearch', () => {
    it('计算单调递增的', () => {
        expect(binarySearch({
            start: 1,
            end: 100,
            callback: data => data < 40
        })).toBe(39);
    });
    it('计算单调递减的', () => {
        expect(binarySearch({
            start: 1,
            end: 100,
            callback: data => 100 - data < 50
        })).toBe(51);
    })
});