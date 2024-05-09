import { sleep } from "./index";

describe("sleep", () => {
  it("延迟2秒", (done) => {
    const startTime = new Date().getTime();
    sleep(2000).then(() => {
      const delta = new Date().getTime() - startTime;
      expect(delta / 1000).toBeCloseTo(2, 1);
      done();
    });
  });
});
