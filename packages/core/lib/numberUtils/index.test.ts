import { describe, it, expect } from 'vitest';
import { fix0, cutDecimal, fixContinuousNumber, hasMoreThan2Decimal } from ".";

describe("fix0", () => {
  it("需要补0", () => {
    expect(fix0(3)).toBe("03");
  });
  it("不需要补0", () => {
    expect(fix0(12)).toBe("12");
  });
});

describe("cutDecimal", () => {
  it("截断成功", () => {
    expect(cutDecimal(3.123)).toBe("3.12");
  });
  it("不需要截断", () => {
    expect(cutDecimal(3.22)).toBe("3.22");
  });
});

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

describe("hasMoreThan2Decimal", () => {
  it("有超过2位小数", () => {
    expect(hasMoreThan2Decimal(3)).toBeFalsy();
  });
  it("没有超过2位小数", () => {
    expect(hasMoreThan2Decimal(12.232)).toBeTruthy();
  });
});