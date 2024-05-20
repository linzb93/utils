import { describe, it, expect } from 'vitest';
import { fixContinuousNumber } from "./index";

describe("fixContinuousNumber", () => {
  it("简单设置成功", () => {
    expect(fixContinuousNumber(5).map(item => Number(item))).toStrictEqual([0, 1, 2, 3, 4, 5]);
  });
  it("复杂设置成功", () => {
    expect(
      fixContinuousNumber({
        start: 1,
        max: 5,
        step: 1,
        useFix0: true,
      })
    ).toStrictEqual(["01", "02", "03", "04", "05"]);
  });
});
