/**
 * 延时函数
 * @async
 * @param {number} time 需要延长的时间
 * @return {Promise<void>}
 */
export const sleep = (time: number): Promise<null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
