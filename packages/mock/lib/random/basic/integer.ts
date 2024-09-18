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
  let max = 0;
  let min = 0;
  if (args.length < 2) {
    max = args.length == 1 ? Number(args[0]) : 1e9;
  } else {
    min = Number(args[0]);
    max = Number(args[1]);
  }
  return parseInt((Math.random() * (max - min)).toString()) + min;
}

export default {
  name: "integer",
  serve: randomInteger,
};
