import { timejs } from "./index";

describe("timejs", () => {
  it("时间早于", () => {
    const time = timejs("2022-12-30 16:58:00");
    expect(time.isBefore("17:00:00")).toBeTruthy();
  });

  it("时间晚于", () => {
    const time = timejs("2022-12-30 17:58:00");
    expect(time.isBefore("17:00:00")).toBeFalsy();
  });
});
