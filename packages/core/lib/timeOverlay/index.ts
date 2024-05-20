import { timejs } from "../timejs/index";
// 时间比大小，时间格式是mm:ss类型的。
export function timeIsSmaller(time0: string, time1: string): boolean {
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
 * 判断两个时间段是否重叠，如有重叠，返回true。
 * @param timeList: [{startTime, endTime}]，
 * @param time: 形如'22:00'的
 * @return {boolean} 是否存在重叠
 */
export function isTimeOverlay(timeList: TimeRange[]): boolean {
  if (!timejs(timeList[0].endTime).isAfter(timeList[1].startTime)) {
    return false;
  }
  if (!timejs(timeList[1].endTime).isAfter(timeList[0].startTime)) {
    return false;
  }
  return true;
}

/**
 * 判断一组时间段是否重叠，如有重叠，返回true。
 * @param timeList: [{startTime, endTime}]，
 * @param time: 形如'22:00'的
 * @return {boolean} 是否存在重叠
 */
export function validateTimeOverlay(timeList: TimeRange[]): boolean {
  for (let i = 0; i < timeList.length - 1; i++) {
    for (let j = i + 1; j < timeList.length; j++) {
      const target = [timeList[i], timeList[j]];
      const timeCouple = sortTime(target);
      if (isTimeOverlay(timeCouple)) {
        return true;
      }
    }
  }
  return false;
}
