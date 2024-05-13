import { validateTimeOverlay } from "./index";

describe("timeOverlay", () => {
  it('时间没有重叠', () => {
    validateTimeOverlay([]);
  });
  it('时间有重叠', () => {});
  it('时间没有重叠，有相交', () => {});
  it('时间完全重叠', () => {});
  it('时间没有重叠，有过24点的', () => {});
  it('时间有重叠，有过24点的', () => {});
  it('时间没有重叠，有相交，有过24点的', () => {});
  it('时间完全重叠，有过24点的', () => {});
});
