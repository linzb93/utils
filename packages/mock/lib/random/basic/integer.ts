/**
 * 生成0~10亿之间的随机整数。
 * @example
 * @integer(9); // 生成0~9之间的随机数
 * @integer(10, 100); // 生成10~100之间的随机数
 */
function randomInteger(): number;
function randomInteger(max: number): number;
function randomInteger(min: number, max: number): number;
function randomInteger(...args: any[]) {
  let max = 1e10;
  if (args.length === 0) {
    return parseInt((Math.random() * max).toString());
  }
  if (args.length === 1) {
    max = Number(args[0]);
    return parseInt((Math.random() * max).toString());
  }
  if (args.length === 2) {
    const min = Number(args[0]);
    const max = Number(args[1]);
    return parseInt((Math.random() * (max - min)).toString()) + min;
  }
}

export default randomInteger;
