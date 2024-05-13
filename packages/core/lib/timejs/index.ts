

class TimeCtor {
  private timestamp: number;
  static readonly formatReg = /^\d{2}\:\d{2}(:\d{2})?$/;
  /**
   * time format: xx:xx:xx
   * @constructor
   * @param {string} time 时间，可以是'HH:mm'格式的，也可以是'HH:mm:ss'格式的。
   */
  constructor(time: string) {
    const { formatReg } = TimeCtor;
    if (!formatReg.test(time)) {
      throw new Error('时间格式不合法，请修改为HH:mm或HH:mm:ss格式的');
    }
    this.timestamp = this.getTimeStamp(time);
  }
  private getTimeStamp(time: string): number {
    const { formatReg } = TimeCtor;
    if (!formatReg.test(time)) {
      throw new Error('时间格式不合法，请修改为HH:mm或HH:mm:ss格式的');
    }
    const seg = time.split(':').map(item => Number(item));
    return (seg[0] * 3600 + seg[1] * 60 + (seg[2] || 0)) * 1000;
  }
  private compare(comparedTime: string, type: 1 | 2 | 3): boolean {
    const cpTimeStamp = this.getTimeStamp(comparedTime);
    if (type === 1) {
      return this.timestamp < cpTimeStamp;
    }
    if (type === 2) {
      return this.timestamp > cpTimeStamp;
    }
    return this.timestamp === cpTimeStamp;
  }

  isBefore(comparedTime: string): boolean {
    return this.compare(comparedTime, 1);
  }

  isAfter(comparedTime: string): boolean {
    return this.compare(comparedTime, 2);
  }
  isSame(comparedTime: string): boolean {
    return this.compare(comparedTime, 3);
  }
  isInRange(startTime: string, endTime: string): boolean {
    const { formatReg } = TimeCtor;
    if (!formatReg.test(startTime)) {
      throw new Error('开始时间格式不合法，请修改为HH:mm或HH:mm:ss格式的');
    }
    if (!formatReg.test(endTime)) {
      throw new Error('开始时间格式不合法，请修改为HH:mm或HH:mm:ss格式的');
    }
    const startTimeStamp = this.getTimeStamp(startTime);
    const endTimeStamp = this.getTimeStamp(endTime);
    return startTimeStamp <= this.timestamp && this.timestamp <= endTimeStamp;
  }
}

export function timejs(time: string) {
  return new TimeCtor(time);
}
