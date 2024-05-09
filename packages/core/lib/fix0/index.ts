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
