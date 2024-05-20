import { describe, it, expect } from 'vitest';
import { timejs } from "./index";

describe("timejs", () => {
  const time = timejs("16:58:00");
  it('传参格式不正确，报错', () => {
    expect(() => timejs('abac')).toThrowError('时间格式不合法，请修改为HH:mm或HH:mm:ss格式的');
  });
  it("时间早于", () => {
    expect(time.isBefore("17:00:00")).toBeTruthy();
  });

  it("时间晚于", () => {
    expect(time.isAfter("16:00:00")).toBeTruthy();
  });

  it("时间等于", () => {
    expect(time.isSame('16:58')).toBeTruthy();
  });

  it('时间在某个范围内', () => {
    expect(time.isInRange('16:50', '17:00')).toBeTruthy();
  })

});
