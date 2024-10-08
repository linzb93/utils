import { repeat } from "../../shared";

/**
 * 返回26个字母中的任意一个
 * @example
 * '@char'
 */
export default {
  name: "char",
  serve: () => repeat(2, 1),
};
