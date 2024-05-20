/**
 * 延时函数
 * @async
 * @param {number} time 需要延长的时间
 * @return {Promise<number>}
 */
export const sleep = (time: number, isReject?: boolean): Promise<number> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isReject) {
        reject(time);
      } else {
        resolve(time);
      }
    }, time);
  });
