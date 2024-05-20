import {describe, it, expect} from 'vitest';
import { formatWeekCircle } from "./index";

describe("formatWeekCircle", () => {
  it("一个日期", () => {
    expect(formatWeekCircle(["周五"])).toEqual("周五");
  });
  it("间断的日期", () => {
    expect(formatWeekCircle(["周一", "周三", "周五"])).toEqual(
      "周一、周三、周五"
    );
  });
  it("不连续的日期", () => {
    expect(formatWeekCircle(["周一", "周二", "周五"])).toEqual(
      "周一、周二、周五"
    );
  });
  it("只有一个连续的日期", () => {
    expect(formatWeekCircle(["周一", "周二", "周三"])).toEqual("周一~周三");
  });
  it("有一个连续的日期", () => {
    expect(formatWeekCircle(["周一", "周二", "周三", "周五"])).toEqual(
      "周一~周三、周五"
    );
  });
  it("有两个连续的日期", () => {
    expect(
      formatWeekCircle(["周一", "周二", "周三", "周五", "周六", "周日"])
    ).toEqual("周一~周三、周五~周日");
  });
  it("有两个相邻的日期", () => {
    expect(formatWeekCircle(["周一", "周二", "周四", "周五", "周日"])).toEqual(
      "周一、周二、周四、周五、周日"
    );
  });
  it("有一个连续的日期和一个相邻的日期", () => {
    expect(formatWeekCircle(["周一", "周二", "周三", "周五", "周六"])).toEqual(
      "周一~周三、周五、周六"
    );
  });
  it("中间有连续的日期", () => {
    expect(formatWeekCircle(["周一", "周三", "周四", "周五", "周日"])).toEqual(
      "周一、周三~周五、周日"
    );
  });
  it("长连续的日期", () => {
    expect(
      formatWeekCircle(["周一", "周二", "周三", "周四", "周五", "周六"])
    ).toEqual("周一~周六");
  });
  it("全部日期", () => {
    expect(
      formatWeekCircle(["周一", "周二", "周三", "周四", "周五", "周六", "周日"])
    ).toEqual("周一~周日");
  });
  it("全部日期，改写全部的文字", () => {
    expect(
      formatWeekCircle(
        ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        {
          allText: "全部",
        }
      )
    ).toEqual("全部");
  });
  it("分隔符用逗号", () => {
    expect(
      formatWeekCircle(["周一", "周三", "周四", "周五", "周日"], {
        separator: ",",
      })
    ).toEqual("周一,周三~周五,周日");
  });
});
