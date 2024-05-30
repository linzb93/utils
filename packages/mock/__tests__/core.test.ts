import { describe, it, expect } from "vitest";

const { mock } = require("@linzb93/mock");

// describe("姓名", () => {
//   const map = ["李小明", "张三", "李四", "王五"];
//   it("无筛选", () => {
//     expect(map.includes(mock({ name: "@cname" }).name)).toBeTruthy();
//   });
//   it("选一个姓", () => {
//     expect(
//       ["李小明", "李四"].includes(mock({ name: "@cname(李)" }).name)
//     ).toBeTruthy();
//   });
//   it("选一个姓，两个字的名字", () => {
//     expect(mock({ name: "@cname(李,2)" })).toEqual({ name: "李四" });
//   });
// });
