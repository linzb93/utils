import addrData from "./dict.json";
import { sample } from "lodash-es";
/**
 * 随机生成一个六位数邮政编码
 */
export default {
  name: "zip",
  serve: () => {
    return sample(Object.keys(addrData));
  },
};
