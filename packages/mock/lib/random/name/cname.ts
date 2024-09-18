import cfirst from "./cfirst";
import clast from "./clast";
/**
 * 生成中文全名，可以指定姓氏
 */
export default {
  name: "cname",
  serve: (first: string, length: number) => {
    if (first) {
      return `${first}${clast.serve(length)}`;
    }
    return `${cfirst.serve()}${clast.serve(length)}`;
  },
};
