import { fix0 } from "./index";
describe("fix0", () => {
  it("需要补0", () => {
    expect(fix0(3)).toBe("03");
  });
  it("不需要补0", () => {
    expect(fix0(12)).toBe("12");
  });
});
