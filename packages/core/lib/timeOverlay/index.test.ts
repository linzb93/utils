import { describe, it, expect } from 'vitest';
import { isTimeOverlay } from "./index";

describe("判断时间是否重叠", () => {
  it('两个时间段没有重叠', () => {
    expect(isTimeOverlay('08:00~10:00', '13:00~15:00')).toBeFalsy();
  });
  it('两个时间段有交叉', () => {
    expect(isTimeOverlay('08:00~10:00', '09:00~15:00')).toBeTruthy();
  });
  it('两个时间段相邻', () => {
    expect(isTimeOverlay('08:00~10:00', '10:00~12:00')).toBeFalsy();
  });
  it('两个时间段包含', () => {
    expect(isTimeOverlay('08:00~10:00', '09:00~09:30')).toBeTruthy();
  });
  it('两个时间段反包含', () => {
    expect(isTimeOverlay('08:00~10:00', '06:00~12:30')).toBeTruthy();
  });
  it('两个时间段相等', () => {
    expect(isTimeOverlay('08:00~10:00', '08:00~10:00')).toBeTruthy();
  });
  it("两个跨天的", () => {
    expect(isTimeOverlay("08:00~02:00", "12:00~01:00")).toBeTruthy();
  });
  it("第一个跨天的，第二个不跨天，有重叠", () => {
    expect(isTimeOverlay("08:00~02:00", "00:30~01:00")).toBeTruthy();
  });
  it("第一个跨天的，第二个不跨天，无重叠", () => {
    expect(isTimeOverlay("08:00~02:00", "03:30~06:00")).toBeFalsy();
  });
  it("第一个不跨天，第二个跨天的，有重叠", () => {
    expect(isTimeOverlay("08:00~10:00", "23:30~09:00")).toBeTruthy();
  });
  it("第一个不跨天，第二个跨天的，无重叠", () => {
    expect(isTimeOverlay("08:00~10:00", "23:30~05:00")).toBeFalsy();
  });
});
