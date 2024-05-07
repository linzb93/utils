export const regExpMap = {
  isMobile: /^1[0-9]{10}$/, // 判断11位手机号
  includechinese: /[\u4e00-\u9fa5]/g, // 判断是否含有中文
  isMoney: /^(?!0{2,}(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/, // 判断是否最多含有2位小数
  weakIsMoney: /^(?!0{2,}(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{0,2})?$/, // 判断是否最多含有2位小数，最后一位可以是小数点
};

interface IValidate {
  [key: string]: (str: string) => boolean;
}

export const validate: IValidate = {
  isMobile: (str) => regExpMap.isMobile.test(str),
  includechinese: (str) => regExpMap.includechinese.test(str),
  isMoney: (str) => regExpMap.isMoney.test(str),
  weakIsMoney: (str) => regExpMap.weakIsMoney.test(str),
};
