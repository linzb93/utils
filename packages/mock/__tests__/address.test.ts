import { describe, it, expect } from "vitest";
import { mock } from "../lib";
import { findProvince } from "../lib/random/address/testUtil";

describe("地址", () => {
  it("省份", () => {
    const obj = mock({
      from: "@province",
    });
    const from = obj.from as string;
    expect(findProvince(from)).toBeTruthy();
  });
});
