import { database } from "./use";
import { BasicType } from "../types";

function parseFunctionCall(data: string | number) {
  const callString = data.toString();
  // 使用正则表达式匹配函数名称和参数（可选）
  const regex = /^\s*@(\w+)\s*(?:\((.*)\))?\s*$/;
  const match = callString.match(regex);

  if (!match) {
    throw new Error("Invalid function call format");
  }

  // 第一个捕获组是函数名称，第二个捕获组是参数字符串（可选）
  const functionName = match[1];
  let args: BasicType[] = [];

  if (match[2]) {
    // 如果存在参数字符串，则处理参数
    args = match[2]
      .split(",")
      .map((arg) => getParams(arg.trim().replace(/['"]+/g, "")));
  }

  // 返回结果对象
  return { fn: functionName, args };
}
type Result<T> = { [K in keyof T]: string | number | boolean };

export default function <T extends Record<string, any>>(
  template: T
): Result<T> {
  return Object.keys(template).reduce((obj, key) => {
    const value = template[key];
    if (typeof value !== "string") {
      return obj;
    }

    const { fn, args } = parseFunctionCall(value);
    return {
      ...obj,
      [key]: database[fn](...args),
    };
  }, {} as Result<T>);
}

/**
 * 将字符串中的boolean值和数字转换成对应类型
 * @param {string[]} arg - 待转换的参数列表
 * @returns
 */
function getParams(arg: string): BasicType {
  if (arg === "true") {
    return true;
  }
  if (arg === "false") {
    return false;
  }
  if (!isNaN(Number(arg))) {
    return Number(arg);
  }
  return arg;
}

/*** */
function transformObject<T extends { [K in keyof T]: string }>(obj: T): T {
  // 这里可以添加一些转换逻辑，但最终返回的是相同的对象
  return obj;
}

// 示例调用
const inputObject = {
  name: "Kimi",
  age: "30",
  country: "Moon",
};

const outputObject = transformObject(inputObject);
