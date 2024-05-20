import { describe, it, expect } from 'vitest';
import { cutDecimalSegNumber } from "./index";

describe("cutDecimalSegNumber", () => {
  it("截断成功", () => {
    expect(cutDecimalSegNumber(3.123)).toBe("3.12");
  });
  it("不需要截断", () => {
    expect(cutDecimalSegNumber(3.22)).toBe("3.22");
  });
});
