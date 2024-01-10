const validate = require("./validate");
const { isNil } = require("lodash");
const isEmptyObject = (obj) => {
  for (const key in obj) {
    return false;
  }
  return true;
};

const fix0 = (val) => {
  if (val < 10) {
    return `0${val}`;
  }
  return val.toString();
};

// 一个数是否有超过2位小数
const isNumberHasMoreThan2Decimal = (value) => {
  return !validate.isMoney(value);
};
// 截断小数位数，最多保留2位
const cutDecimalSegNumber = (num, digit = 2) => {
  if (isNil(num)) {
    return "";
  }
  let decimalLength = 0;
  const exec = /\.[0-9]+$/.exec(num.toString());
  if (exec && exec[0]) {
    decimalLength = Math.min(exec[0].length - 1, digit);
  }
  return Number(num).toFixed(decimalLength);
};
const fixContinuousNumber = (arg) => {
  const max = typeof arg === "number" ? arg : arg.max;
  const { useFix0, start = 0, step = 1 } = arg;
  const arr = [];
  for (let i = start; i <= max; i += step) {
    const ret = useFix0 ? fix0(i) : cutDecimalSegNumber(i, 1);
    arr.push(ret);
  }
  return arr;
};
const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

module.exports = {
  isEmptyObject,
  fix0,
  isNumberHasMoreThan2Decimal,
  cutDecimalSegNumber,
  fixContinuousNumber,
  sleep,
};
