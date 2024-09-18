import { sample } from "lodash-es";
import dict from "./dict.json";

/**
 * 生成中文名字，可以指定名字长度为一个字或者两个字
 */
export default {
  name: "clast",
  serve: (length?: number) => {
    const map = dict.clast;
    if (!length) {
      return sample(map);
    }
    if (Number(length) === 2) {
      return sample(map.filter((item) => item.length === 2));
    }
    return sample(map.filter((item) => item.length === 1));
  },
};
