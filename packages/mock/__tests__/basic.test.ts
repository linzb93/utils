import { describe, it, expect } from "vitest";
import { mock } from "../lib";

describe("整数", () => {
  it("随机整数", () => {
    const obj = mock({
      age: "@integer",
    });
    expect(Number.isInteger(obj.age)).toBeTruthy();
    expect(obj.age).toBeLessThanOrEqual(1e10);
  });
  it("小于10的整数", () => {
    const obj = mock({
      age: "@integer(10)",
    });
    expect(Number.isInteger(obj.age)).toBeTruthy();
    expect(obj.age).toBeLessThanOrEqual(10);
  });
  it("50~100的整数", () => {
    const obj = mock({
      age: "@integer(50,100)",
    });
    expect(Number.isInteger(obj.age)).toBeTruthy();
    expect(obj.age).toBeLessThanOrEqual(100);
    expect(obj.age).toBeGreaterThanOrEqual(50);
  });
});

describe("浮点数", () => {
  it("浮点数", () => {
    const obj = mock({
      money: "@float(10,140, 2, 4)",
    });
    expect(Number(obj.money)).not.toBeNaN();
    expect(Number(obj.money)).not.toBe(parseInt(obj.money.toString()));
    expect(obj.money).toBeGreaterThan(10);
    expect(obj.money).toBeLessThan(141);
    expect(Number.isInteger(Number(obj.money) * 10000)).toBeTruthy();
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

describe("单个字符", () => {
  it("小写", () => {
    const obj = mock({
      char: "@char",
    });
    expect(obj.char).toMatch(/^[a-z]$/);
  });
});

describe("字符串", () => {
  it("默认长度的字符串", () => {
    const obj = mock({
      name: "@string",
    });
    expect(obj.name).toMatch(/^[a-z]{3,10}$/);
  });
  it("最多15位的字符串", () => {
    const obj = mock({
      name: "@string(15)",
    });
    expect(obj.name).toMatch(/^[a-z]+$/);
    expect(obj.name.toString().length).toBeLessThanOrEqual(15);
  });
  it("最多15位，最少9位的字符串", () => {
    const obj = mock({
      name: "@string(9, 15)",
    });
    expect(obj.name).toMatch(/^[a-z]+$/);
    const { length } = obj.name.toString();
    expect(length).toBeLessThanOrEqual(15);
    expect(length).toBeGreaterThanOrEqual(9);
  });
});
