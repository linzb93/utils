import { isNil } from "lodash-es";
/**
 * 截断小数位数
 * @param {number} num 传入参数
 * @param {number} digit 保留小数位数，默认值为2
 * @return {string} 截断后的数字，不做四舍五入。
 * @example
 * cutDecimalSegNumber(2.4599999)
 * return 2.45
 */
export const cutDecimalSegNumber = (num: number, digit: number = 2): string => {
  if (isNil(num)) {
    return "";
  }
  let decimalLength = 0;
  const exec = /\.[0-9]+$/.exec(num.toString());
  if (exec && exec[0]) {
    decimalLength = Math.min(exec[0].length - 1, digit);
  }
  return Number(num).toFixed(decimalLength);
};
