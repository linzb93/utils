import { sample } from "../../shared";

const strs = "abcdefghijklmnopqrstuvwxyz";
/**
 * 返回26个字母中的任意一个
 * @example
 * '@char'
 */
export default () => sample(strs.split(""));
