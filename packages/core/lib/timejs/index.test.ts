import { timejs } from "./index";

describe("timejs", () => {
  it("时间早于", () => {
    const time = timejs("16:58:00");
    expect(time.isBefore("17:00:00")).toBeTruthy();
  });

  it("时间晚于", () => {
    const time = timejs("17:58:00");
    expect(time.isBefore("17:00:00")).toBeFalsy();
  });

  it("时间等于", () => {
    const time = timejs("17:58:00");
    expect(time.isSame('17:58')).toBeTruthy();
  });
});
