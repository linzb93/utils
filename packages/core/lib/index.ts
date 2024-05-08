import { validate } from "./validate";
import { isNil } from "lodash-es";

/**
 * 判断是不是一个空的Object
 * @param {any} obj 判断的参数
 * @return {boolean} 是否是空的Object
 * @example
 * isEmptyObject({})
 * return true;
 *
 * isEmptyObject({user: '3'})
 * return false;
 *
 * isEmptyObject(3)
 * return false;
 */
export const isEmptyObject = (obj: any): boolean => {
  for (const key in obj) {
    return false;
  }
  return true;
};
/**
 * 为个位数前面补0
 * @param {any} data 参数
 * @return {string} 补0后的数，当入参大等于10时不需要补0
 * @example
 * fix0(3)
 * return '03';
 *
 * fix0(12)
 * return '12';
 */
export const fix0 = (data: any): string => {
  if (data < 10) {
    return `0${data}`;
  }
  return data.toString();
};

/**
 * 判断一个数是否有超过2位小数
 * @param {number} value 参数
 * @return {boolean} 是否超过2位小数
 * @example
 * isNumberHasMoreThan2Decimal(2.33)
 * return false;
 *
 * isNumberHasMoreThan2Decimal(2.333)
 * return true;
 */
export const isNumberHasMoreThan2Decimal = (value: number): boolean => {
  return !validate.isMoney(value.toString());
};
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

interface IContinuousNumber {
  useFix0?: boolean;
  start?: number;
  step?: number;
  max: number;
}
/**
 * 生成连续的数字数组
 * @param {string} max 最大值
 * @return {string[]} 生成的数组
 * @example
 * fixContinuousNumber(3)
 * return [1, 2, 3]
 */
export function fixContinuousNumber(max: number): string[];
/**
 * 生成连续的数字数组
 * @param options 参数
 * @param {boolean} options.useFix0 是否使用补0
 * @param {number} options.start 初始值，默认值为1
 * @param {number} options.step 步长，默认为1
 * @param {number} options.max 最大值
 * @return {string[]} 生成的数组
 * @example
 * fixContinuousNumber({
 *  max: 5,
 *  start: 2,
 *  useFix0: true
 * });
 * return ['02', '03', '04', '05'];
 */
export function fixContinuousNumber(options: IContinuousNumber): string[];
export function fixContinuousNumber(arg: number | IContinuousNumber) {
  const max = typeof arg === "number" ? arg : arg.max;
  const { useFix0, start = 0, step = 1 } = arg as IContinuousNumber;
  const arr: string[] = [];
  for (let i = start; i <= max; i += step) {
    const ret = useFix0 ? fix0(i) : cutDecimalSegNumber(i, 1);
    arr.push(ret);
  }
  return arr;
}
/**
 * 延时函数
 * @async
 * @param {number} time 需要延长的时间
 * @return {Promise<void>}
 */
export const sleep = (time: number): Promise<null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
export {validate};