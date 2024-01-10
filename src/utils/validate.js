const reg = {
  isMobile: /^1[0-9]{10}$/,
  includechinese: /[\u4e00-\u9fa5]/g,
  isMoney: /^(?!0{2,}(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
  weakIsMoney: /^(?!0{2,}(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{0,2})?$/,
};
module.exports = {
  isMobile: (str) => reg.isMobile.test(str),
  includechinese: (str) => reg.includechinese.test(str),
  isMoney: (str) => reg.isMoney.test(str),
  weakIsMoney: (str) => reg.weakIsMoney.test(str),
  reg,
};
