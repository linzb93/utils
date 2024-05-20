import { describe, it, expect } from 'vitest';
import { validate, regExpMap } from './index';
describe('validate-isMobile', () => {
  it('通过', () => {
    expect(validate.isMobile('13600006533')).toBeTruthy();
  });
  it('位数错误，无法通过', () => {
    expect(validate.isMobile('1360006533')).toBeFalsy();
  });
  it('格式错误', () => {
    expect(validate.isMobile('23600006533')).toBeFalsy();
  });
});

describe('includechinese', () => {
  it('含有中文', () => {
    expect(validate.includechinese('恭喜发财abc')).toBeTruthy();
  })
  it('不含有中文', () => {
    expect(validate.includechinese('Hello World！')).toBeFalsy();
  });
})
describe('validate-isMoney', () => {
  const numberReg = regExpMap.isMoney;
  it("整数", () => {
    expect("23").toMatch(numberReg);
  });
  it("两位小数", () => {
    expect("4.23").toMatch(numberReg);
  });
  it("多位小数", () => {
    expect("4.234").not.toMatch(numberReg);
  });
  it("小数尾数为0", () => {
    expect("4.20").toMatch(numberReg);
  });
  it("整数位起始2个0，结尾非0，有小数位", () => {
    expect("003.21").not.toMatch(numberReg);
  });
  it("整数位包含字母", () => {
    expect("a.00").not.toMatch(numberReg);
  });
  it("小数位包含字母", () => {
    expect("3.a0").not.toMatch(numberReg);
  });
  it("0.00", () => {
    expect("0.00").toMatch(numberReg);
  });
  it("只有小数点", () => {
    expect(".").not.toMatch(numberReg);
  });
  it("汉字", () => {
    expect("啊3.2").not.toMatch(numberReg);
  });
  it('weakIsMoney末尾可以是小数点', () => {
    expect(validate.weakIsMoney('23.')).toBeTruthy();
  });
})