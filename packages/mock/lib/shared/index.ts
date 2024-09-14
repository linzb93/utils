// import { fill } from "lodash-es";

export const sample = (list: any[]) => {
  return list[parseInt((Math.random() * list.length).toString())];
};

const fixContinuousNumber = (num:number) => Array(num).fill('').map((_, index) => index + 1);

/**
 * 重复
 * @param {number} type - 1 纯数字，2纯字母，3混合
 * @param {number} min 重复次数，如果max存在的话就是重复最小次数
 * @param {number} max 重复最大次数
 * @returns 
 */
export const repeat = (type: 1 | 2 | 3, min: number, max?: number) => {
  let ret = "";
  const numList = fixContinuousNumber(10);
  const letters = "abcdefghijklmnopqrstuvwxyz";
  if (type === 1) {
    if (!max) {
      for (let i = 0; i < min; i++) {
        ret += sample(numList);
      }
      return Number(ret);
    } else {
      const len = min + parseInt((Math.random() * (max - min)).toString());
      for (let i = min; i < len; i++) {
        ret += sample(numList);
      }
      return Number(ret);
    }
  }
  if (type === 2) {
    if (!max) {
      for (let i = 0; i < min; i++) {
        ret += sample(letters.split(""));
      }
      return Number(ret);
    } else {
      const len = min + parseInt((Math.random() * (max - min)).toString());
      for (let i = min; i < len; i++) {
        ret += sample(letters.split(""));
      }
      return Number(ret);
    }
  }
};
