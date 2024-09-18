import { sample } from "lodash-es";

/**
 * 返回true或者false
 * @example
 * '@boolean';
 */
export default {
  name: "boolean",
  serve: () => {
    return sample([true, false]);
  },
};
