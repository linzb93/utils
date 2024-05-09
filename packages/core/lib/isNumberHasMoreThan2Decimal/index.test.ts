import { isNumberHasMoreThan2Decimal } from "./index";
describe("isNumberHasMoreThan2Decimal", () => {
  it("有超过", () => {
    expect(isNumberHasMoreThan2Decimal(3)).toBeFalsy();
  });
  it("没有超过", () => {
    expect(isNumberHasMoreThan2Decimal(12.232)).toBeTruthy();
  });
});
