import { isEmptyObject } from "./index";
describe("isEmptyObject", () => {
  it("是空对象", () => {
    expect(isEmptyObject({})).toBeTruthy();
  });
  it("不是空对象", () => {
    expect(isEmptyObject({ a: 1 })).toBeFalsy();
  });
  it("不是对象", () => {
    expect(isEmptyObject(3)).toBeFalsy();
  });
});
