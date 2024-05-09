import { fix0 } from "../fix0/index";
import { cutDecimalSegNumber } from "../cutDecimalSegNumber/index";

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
