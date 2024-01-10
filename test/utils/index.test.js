const {
  isEmptyObject,
  fix0,
  isNumberHasMoreThan2Decimal,
  cutDecimalSegNumber,
  fixContinuousNumber,
  sleep,
} = require("../../src/utils");
// const validate = require('../../src/utils/validate');
describe("是否为空对象", () => {
  it("是空对象", () => {
    expect(isEmptyObject({})).toBeTruthy();
  });
  it("不是空对象", () => {
    expect(isEmptyObject({ a: 1 })).toBeFalsy();
  });
});

describe("补0", () => {
  it("需要补0", () => {
    expect(fix0(3)).toBe("03");
  });
  it("不需要补0", () => {
    expect(fix0(12)).toBe("12");
  });
});

describe("一个数是否有超过2位小数", () => {
  it("有超过", () => {
    expect(isNumberHasMoreThan2Decimal(3)).toBeFalsy();
  });
  it("没有超过", () => {
    expect(isNumberHasMoreThan2Decimal(12.232)).toBeTruthy();
  });
});

describe("截断小数位数，最多保留2位", () => {
  it("截断成功", () => {
    expect(cutDecimalSegNumber(3.123)).toBe("3.12");
  });
});

describe("补充连续的数", () => {
  it("成功", () => {
    expect(
      fixContinuousNumber({
        start: 1,
        max: 5,
        step: 1,
        useFix0: true,
      })
    ).toStrictEqual(["01", "02", "03", "04", "05"]);
  });
});

describe("延迟", () => {
  it("延迟3秒", (done) => {
    const startTime = new Date().getTime();
    sleep(3000).then(() => {
      const delta = new Date().getTime() - startTime;
      expect(delta / 1000).toBeCloseTo(3, 2);
      done();
    });
  });
});
