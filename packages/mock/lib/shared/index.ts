import { sample } from "lodash-es";

export { sample };

const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function getLength(min: number, max?: number) {
  return !max ? min : min + parseInt((Math.random() * (max - min)).toString());
}
/**
 * 重复数字
 * @param min
 * @param max
 * @returns
 */
export const repeatNumber = (min = 1, max?: number) => {
  const totalLength = getLength(min, max);
  let output = "";
  for (let i = 0; i < totalLength; i++) {
    output += sample(numList);
  }
  return output;
};
/**
 * 重复字符
 * @param min
 * @param max
 * @returns
 */
export const repeatString = (min = 1, max?: number) => {
  const totalLength = getLength(min, max);
  let output = "";
  for (let i = 0; i < totalLength; i++) {
    output += sample(letters);
  }
  return output;
};

/**
 * 重复字符和数字
 * @param min
 * @param max
 * @returns
 */
export const repeatNumberAndString = (min = 1, max?: number) => {
  const totalLength = getLength(min, max);
  let output = "";
  const mixedList = [...numList, ...letters];
  for (let i = 0; i < totalLength; i++) {
    output += sample(mixedList);
  }
  return output;
};
