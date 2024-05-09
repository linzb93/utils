interface Fn1Param {
  (param: any): void;
}
/**
 * 伪造的进度。用预计用时分割100%，生成的每个阶段值，去掉首尾的0%和100%，然后偏差±5%，就是生成的进度列表。
 * 当异步事件返回后，不管当前进度是多少，都改成100%。
 * 当进度完成后，异步事件还没有返回，进度就停留在99%，直到异步事件返回。
 * @example
 * fakeProgress(pEvent, 4)
 * 生成阶段数组[25,50,75]，偏差±5%，可能会生成[23,52,78]
 * @param {Promise} pEvent - 异步事件
 * @param {number} second - 预计用时，单位：秒
 * @returns {object} callbacks
 * @returns {Function} [callbacks.subscribe] - 进行中的回调
 * @returns {Function} [callbacks.then] - 完成的回调
 */
export const fakeProgress = (pEvent: Promise<any>, second: number): object => {
  let progress = 0;
  const perStep = parseInt((100 / second).toString());
  const progressList = [0];
  let counter = 0;
  // 进行中的回调
  let progressFn: Fn1Param;
  // 完成后的回调
  let thenFn: Fn1Param;
  for (let i = 0; i < second; i++) {
    counter += perStep;
    const delta = parseInt((Math.random() * 10 - 5).toString());
    progressList.push(counter + delta);
  }
  if (progressList[progressList.length - 1] === 100) {
    progressList.pop();
  }
  counter = 0;
  const timer = setInterval(() => {
    if (progress === 100) {
      clearInterval(timer);
      return;
    }
    progress = progressList[counter++];
    if (progress >= 99) {
      progress = 99;
    }
    progressFn(progress);
    if (counter >= progressList.length) {
      clearInterval(timer);
    }
  }, 1000);
  pEvent.then((result) => {
    progress = 100;
    progressFn(progress);
    thenFn(result);
  });
  return {
    subscribe(callback: Fn1Param) {
      if (typeof callback === "function") {
        progressFn = callback;
      }
    },
    then(callback: Fn1Param) {
      if (typeof callback === "function") {
        thenFn = callback;
      }
    },
  };
};
