import { describe, it, expect } from 'vitest';
import { isTimeOverlay, validateTimeOverlay } from "./index";

describe("判断时间是否重叠", () => {
  function formatTimeList(list: string[]) {
    return list.map(item => {
      const seg = item.split('~');
      return {
        startTime: seg[0],
        endTime: seg[1]
      }
    })
  }
  it('两个时间段没有重叠', () => {
    expect(isTimeOverlay(formatTimeList(['08:00~10:00', '13:00~15:00']))).toBeFalsy();
  });
  it('两个时间段有交叉', () => {
    expect(isTimeOverlay(formatTimeList(['08:00~10:00', '09:00~15:00']))).toBeTruthy();
  });
  it('两个时间段相邻', () => {
    expect(isTimeOverlay(formatTimeList(['08:00~10:00', '10:00~12:00']))).toBeFalsy();
  });
  it('两个时间段包含', () => {
    expect(isTimeOverlay(formatTimeList(['08:00~10:00', '09:00~09:30']))).toBeTruthy();
  });
  it('两个时间段反包含', () => {
    expect(isTimeOverlay(formatTimeList(['08:00~10:00', '06:00~12:30']))).toBeTruthy();
  });
  it('两个时间段相等', () => {
    expect(isTimeOverlay(formatTimeList(['08:00~10:00', '08:00~10:00']))).toBeTruthy();
  });
  it("时间组没有重叠", () => {
    expect(
      validateTimeOverlay(formatTimeList(["08:00~10:00", "12:00~15:00", "17:00~19:00"]))
    ).toBeFalsy();
  });
  it("时间组有交叉", () => {
    expect(
      validateTimeOverlay(formatTimeList(["08:00~10:00", "09:30~15:00", "17:00~19:00"]))
    ).toBeTruthy();
  });
  it("时间组有相邻", () => {
    expect(
      validateTimeOverlay(formatTimeList(["08:00~10:00", "10:00~15:00", "17:00~19:00"]))
    ).toBeFalsy();
  });
  it("时间组有包含", () => {
    expect(
      validateTimeOverlay(formatTimeList(["08:00~10:00", "09:30~10:00", "17:00~19:00"]))
    ).toBeTruthy();
  });
});
