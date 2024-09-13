// import { fill } from "lodash-es";
import { fixContinuousNumber } from "@linzb93/utils";

export const sample = (list: any[]) => {
  return list[parseInt((Math.random() * list.length).toString())];
};

export const repeat = (type: 1 | 2 | 3, min: number, max: number) => {
  // 1 纯数字，2纯字母，3混合
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
  } else if (type === 2) {
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
  } else {
    if (!max) {
      for (let i = 0; i < min; i++) {
        ret += sample(letters.split("").concat(numList));
      }
      return Number(ret);
    } else {
      const len = min + parseInt((Math.random() * (max - min)).toString());
      for (let i = min; i < len; i++) {
        ret += sample(letters.split("").concat(numList));
      }
      return Number(ret);
    }
  }
};
