/**
 * 随机生成浮点数，整数范围在1~10亿，小数最多支持7位。
 * @example
 * @float(3, 500, 2, 5) // 整数在3~500，小数在2~5位。
 * @float(5,10) // 整数在5~10，小数在1~7位。
 */
export default (min = 1, max = 1e9, dmin = 1, dmax = 7) => {
  const int = min + parseInt((Math.random() * (max - min)).toString());
  let dec = parseInt(
    (Math.random() * Math.pow(10, dmax)).toString()
  ).toString();
  if (Number(dec) < Math.pow(10, dmin)) {
    dec = "0".repeat(dmin - dec.toString().replace(/0+$/g, "").length) + dec;
  }
  return `${int}.${dec}`;
};
