import { sample } from "lodash-es";
import dict from "./dict.json";

/**
 * 生成中文姓氏，可以指定姓氏长度为一个字或者两个字
 */
export default {
  name: "cfirst",
  serve: (length?: number) => {
    const map = dict.cfirst;
    if (!length) {
      return sample(map);
    }
    if (Number(length) === 2) {
      return sample(map.filter((item) => item.length === 2));
    }
    return sample(map.filter((item) => item.length === 1));
  },
};
