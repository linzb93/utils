import { isInteger } from "lodash-es";
// 二分查找，找到第一个满足条件的数
export function binarySearch(
  {
    start,
    end,
    desc = true,
  }: {
    start: number;
    end: number;
    desc: boolean; // 数据呈单调下降形式
  },
  callback: (data: number) => boolean
) {
  if (!isInteger(start) || !isInteger(end) || start >= end) {
    throw new Error("start 和 end 必须是正整数，且 start 的值要小于 end ");
  }
  let s = start;
  let e = end;
  // 先写单调下降的
  const rs = callback(s);
  const re = callback(e);
  if (rs) {
    // 如果第一个就为true，那么全部的值都是为true了
    return s;
  }
  if (!re) {
    // 如果最后一个值都为false，那么全部的值都是为false了
    return e;
  }
  while (Math.abs(s - e) > 1) {
    const boolRet = callback(parseInt(((s + e) / 2).toString())) && callback(e);
    if (!boolRet) {
      s = parseInt(((s + e) / 2).toString());
    } else {
      e = parseInt(((s + e) / 2).toString());
    }
  }
  if (callback(s)) {
    return s;
  }
  return e;
}
