/**
 * 延时函数。Node.js v16+ 请使用`node:timers/promises`
 * ```js
 * import {setTimeout as delay} from 'node:timers/promises';
 * await delay(100);
 * ```
 * @async
 * @param {number} time 需要延长的时间
 * @return {Promise<number>}
 */
export const sleep = (time: number, isReject?: boolean): Promise<number> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isReject) {
        reject(time.toString());
      } else {
        resolve(time);
      }
    }, time);
  });
