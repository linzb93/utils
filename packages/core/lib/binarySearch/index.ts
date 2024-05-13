import { isInteger } from "lodash-es";
// 二分查找，找到第一个满足条件的数
export function binarySearch(
  {
    start,
    end,
    callback
  }: {
    start: number;
    end: number;
    callback:(data: number) => boolean 
  }
):number {
  if (!isInteger(start) || !isInteger(end) || start >= end) {
    throw new Error("start 和 end 必须是正整数，且 start 的值要小于 end ");
  }
  let s = start;
  let e = end;
  let rs = callback(s);
  let re = callback(e);
  if (!!rs === !!re) {
    // 所有值都相同，不用写了
    return;
  }
  while (Math.abs(s - e) > 1) {
    const middle = parseInt(((s + e) / 2).toString());
    const middleRet = callback(middle);
    if (!!middleRet === !!rs) {
      // 当中间值和初始值相同时，去处理中间值到结束值的数据
      s = middle;
    } else {
      e = middle;
    }
  }
  if (callback(s)) {
    return s;
  }
  return e;
}
