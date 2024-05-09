import { validate } from "../validate/index";
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
