import dayjs, { Dayjs } from "dayjs";

class Time {
  private time: Dayjs;
  /**
   * time format: xx:xx:xx
   * @constructor
   * @param {string} time 时间，可以是'HH:mm'格式的，也可以是'HH:mm:ss'格式的。
   */
  constructor(time: string) {
    this.time = dayjs(time);
  }

  isBefore(comparedTime: string) {
    const cpTimeSeg = comparedTime.split(":").map((item) => Number(item));
    let timeSeg = [];
    if (cpTimeSeg.length === 2) {
      timeSeg = this.time
        .format("HH:mm")
        .split(":")
        .map((item) => Number(item));
    } else if (cpTimeSeg.length === 3) {
      timeSeg = this.time
        .format("HH:mm:ss")
        .split(":")
        .map((item) => Number(item));
    }
    if (timeSeg[0] < cpTimeSeg[0]) {
      return true;
    }
    if (timeSeg[0] > cpTimeSeg[0]) {
      return false;
    }
    if (timeSeg[1] < cpTimeSeg[1]) {
      return true;
    }
    if (timeSeg[1] > cpTimeSeg[1]) {
      return false;
    }
    return timeSeg[2] < cpTimeSeg[2];
  }
}

class TimeRange {
  private startTime: string;
  private endTime: string;
  /**
   * timeRange format: xx:xx:xx~xx:xx:xx
   */
  constructor(time: string) {
    const [startTime, endTime] = time.split("~");
    this.startTime = `${dayjs().format("YYYY-MM-DD")} ${startTime}:00`;
    this.endTime = `${dayjs().format("YYYY-MM-DD")} ${endTime}:00`;
  }
  isBefore(time: string) {
    return dayjs(this.endTime).isBefore(time);
  }
  isInRange(time: string) {
    return (
      !dayjs(this.endTime).isBefore(time) &&
      !dayjs(this.startTime).isAfter(time)
    );
  }
  isAfter(time: string) {
    return dayjs(this.startTime).isAfter(time);
  }
}

export default function timejs(time: string) {
  if (typeof time === "string" && time.includes("~")) {
    return new TimeRange(time);
  }
  const retTime = time;
  return new Time(retTime);
}
