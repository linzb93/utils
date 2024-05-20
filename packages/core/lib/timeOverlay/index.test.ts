import {describe, it, expect} from 'vitest';
import { validateTimeOverlay } from "./index";

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
  it("时间没有重叠", () => {
    expect(
      validateTimeOverlay(formatTimeList(["08:00~10:00", "12:00~15:00", "17:00~19:00"]))
    ).toBeTruthy();
  });
  it("时间有交叉", () => {
    expect(
      validateTimeOverlay(formatTimeList(["08:00~10:00", "09:30~15:00", "17:00~19:00"]))
    ).toBeFalsy();
  });
  it("时间有相邻", () => {
    expect(
      validateTimeOverlay(formatTimeList(["08:00~10:00", "10:00~15:00", "17:00~19:00"]))
    ).toBeTruthy();
  });
  it("时间有包含", () => {
    expect(
      validateTimeOverlay(formatTimeList(["08:00~10:00", "09:30~10:00", "17:00~19:00"]))
    ).toBeFalsy();
  });
});
