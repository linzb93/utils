import { describe, it, expect } from "vitest";
import { mock } from "../lib";

describe("数字", () => {
  it("小于10的整数", () => {
    const obj = mock({
      age: "@integer(1,10)",
    });
    expect(Number.isInteger(obj.age)).toBeTruthy();
    expect(obj.age).toBeLessThan(10);
  });
  it("浮点数", () => {
    const obj = mock({
      money: "@float(10,140, 2, 4)",
    });
    expect(Number(obj.money)).not.toBeNaN();
    expect(Number(obj.money)).not.toBe(parseInt(obj.money.toString()));
  });
});

describe("布尔值", () => {
  it("对或错", () => {
    const obj = mock({
      isStudent: "@boolean",
    });
    expect(obj.isStudent === true || obj.isStudent === false).toBeTruthy();
  });
});

describe("字符", () => {
  it("小写", () => {
    const obj = mock({
      char: "@char",
    });
    expect(obj.char).toMatch(/^[a-z]$/);
  });
  it("字符串", () => {
    const obj = mock({
      name: "@string(4,9)",
    });
    expect(obj.name).toMatch(/^[a-z]{4,9}$/);
  });
});
