import { isInteger } from "lodash-es";
// 二分查找，找到第一个满足条件的数
export function binarySearch(
  {
    start,
    end,
  }: {
    start: number;
    end: number;
  },
  callback: (data: number) => boolean
) {
  if (!isInteger(start) || !isInteger(end) || start >= end) {
    throw new Error("start 和 end 必须是正整数，且 start 的值要小于 end");
  }
  let s = start;
  let e = end;
  if (callback(s) === callback(e)) {
    return e;
  }
  while (e - s > 1) {
    const ret1 = callback(parseInt(((s + e) / 2).toString()));
    const ret2 = callback(e);
    const boolRet = ret1 === !ret2;
    if (boolRet) {
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
