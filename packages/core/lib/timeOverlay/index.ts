import { timejs } from "../timejs/index";
// 时间比大小，时间格式是mm:ss类型的。
function timeIsSmaller(time0: string, time1: string): boolean {
  return timejs(time0).isBefore(time1);
}

interface TimeRange {
  startTime: string;
  endTime: string;
}
// 时间从小到大排序
function sortTime(timeList: TimeRange[]): TimeRange[] {
  const s1 = timeList[0].startTime;
  const s2 = timeList[1].startTime;
  if (timeIsSmaller(s1, s2)) {
    return timeList;
  }
  return timeList.reverse();
}

/**
 * 判断时间范围是否是跨天的，
 * @param {string} time - 时间范围，格式是HH:mm~HH:mm
 * @returns {boolean} 是否跨天
 * @example
 * isCrossDay('10:00~04:10'); // true
 * isCrossDay('13:00~21:05'); // false
 */
function isCrossDay(time:string) {
  const [startTime, endTime] = time.split('~');
  return timeIsSmaller(endTime, startTime);
}
/**
* 将跨天的时间范围分割成两天的时间段
* @param {string} period - 时间范围，格式是HH:mm~HH:mm
* @returns {string[][]} - 分割后的时间范围
* @example
* splitPeriod('21:00~05:00'); // [['21:00','24:00'],['00:00','05:00']]
* splitPeriod('02:00~05:00'); // [['02:00','05:00']]
*/
export function splitPeriod(period:string) {
  let seg = [];
  if (isCrossDay(period)) {
      const [start, end] = period.split('~');
      seg = [
          [start, '24:00'],
          ['00:00', end],
      ];
  } else {
      seg = [period.split('~')];
  }
  return seg;
}

/**
 * 判断两个时间段是否重叠，如有重叠，返回true。
 * @param timeList: [{startTime, endTime}]，
 * @param time: 形如'22:00'的
 * @return {boolean} 是否存在重叠
 */
/**
 * 判断两个时间范围是否有重叠，支持跨天判断
 * @param {*} range0 - 时间范围 ，格式是HH:mm~HH:mm
 * @param {*} range1 - 时间范围 ，格式是HH:mm~HH:mm
 * @returns {boolean}
 * @example
 * isTimeOverlay('03:00~07:00', '08:00~13:40'); // false
 * isTimeOverlay('03:00~07:00', '08:00~03:40'); // true
 */
export function isTimeOverlay(range0:string, range1:string):boolean {
  // 如果两个都是跨天的，就有重叠
  if (isCrossDay(range0) && isCrossDay(range1)) {
      return true;
  }
  if (isCrossDay(range0)) {
      return splitPeriod(range0).some((time) => {
          return isTimeOverlay(`${time[0]}~${time[1]}`, range1);
      });
  }
  if (isCrossDay(range1)) {
      return splitPeriod(range1).some((time) => {
          return isTimeOverlay(`${time[0]}~${time[1]}`, range0);
      });
  }
  const [startTime0, endTime0] = range0.split('~');
  const [startTime1, endTime1] = range1.split('~');
  if (!timeIsSmaller(startTime1, endTime0)) {
      return false;
  }
  if (!timeIsSmaller(startTime0, endTime1)) {
      return false;
  }
  return true;
}
