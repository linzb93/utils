export declare function binarySearch({ start, end, callback }: {
    start: number;
    end: number;
    callback: (data: number) => boolean;
}): number;

/**
 * 截断小数位数
 * @param {number} num 传入参数
 * @param {number} digit 保留小数位数，默认值为2
 * @return {string} 截断后的数字，不做四舍五入。
 * @example
 * cutDecimalSegNumber(2.4599999)
 * return 2.45
 */
export declare const cutDecimalSegNumber: (num: number, digit?: number) => string;

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
export declare const fakeProgress: (pEvent: Promise<any>, second: number) => IResult;

/**
 * 为个位数前面补0
 * @param {any} data 参数
 * @return {string} 补0后的数，当入参大等于10时不需要补0
 * @example
 * fix0(3)
 * return '03';
 *
 * fix0(12)
 * return '12';
 */
export declare const fix0: (data: any) => string;

/**
 * 生成连续的数字数组
 * @param {string} max 最大值
 * @return {string[]} 生成的数组
 * @example
 * fixContinuousNumber(3)
 * return [1, 2, 3]
 */
export declare function fixContinuousNumber(max: number): string[];

/**
 * 生成连续的数字数组
 * @param options 参数
 * @param {boolean} options.useFix0 是否使用补0
 * @param {number} options.start 初始值，默认值为1
 * @param {number} options.step 步长，默认为1
 * @param {number} options.max 最大值
 * @return {string[]} 生成的数组
 * @example
 * fixContinuousNumber({
 *  max: 5,
 *  start: 2,
 *  useFix0: true
 * });
 * return ['02', '03', '04', '05'];
 */
export declare function fixContinuousNumber(options: IContinuousNumber): string[];

declare interface Fn1Param {
    (param: any): void;
}

/**
 * 简写星期列表
 * @param {string[]} circle 星期列表，例如["周一", "周二", "周四"]
 * @param {IOption} optionsParam 配置项
 * - {string} allText: 当星期列表包含一周7天的时候，显示的文字，默认显示“周一~周日”
 * - {string} separator: 非连续日期分隔符，默认为“、”
 * @returns {string} '周一~周三、周四'
 */
export declare function formatWeekCircle(circle: string[], optionsParam?: IOption): string;

declare interface IContinuousNumber {
    useFix0?: boolean;
    start?: number;
    step?: number;
    max: number;
}

declare interface IOption {
    allText?: string;
    separator?: string;
}

declare interface IResult {
    subscribe(fn: Fn1Param): void;
    then(fn: Fn1Param): void;
    resolved(): boolean;
    catch(fn: Fn1Param): void;
}

/**
 * 判断是不是一个空的Object
 * @param {any} obj 判断的参数
 * @return {boolean} 是否是空的Object
 * @example
 * isEmptyObject({})
 * return true;
 *
 * isEmptyObject({user: '3'})
 * return false;
 *
 * isEmptyObject(3)
 * return false;
 */
export declare const isEmptyObject: (obj: any) => boolean;

/**
 * 判断一个数是否有超过2位小数
 * @param {number} value 参数
 * @return {boolean} 是否超过2位小数
 * @example
 * isNumberHasMoreThan2Decimal(2.33)
 * return false;
 *
 * isNumberHasMoreThan2Decimal(2.333)
 * return true;
 */
export declare const isNumberHasMoreThan2Decimal: (value: number) => boolean;

/**
 * 判断两个时间段是否重叠，如有重叠，返回true。
 * @param timeList: [{startTime, endTime}]，
 * @param time: 形如'22:00'的
 * @return {boolean} 是否存在重叠
 */
export declare function isTimeOverlay(timeList: TimeRange[]): boolean;

declare interface IValidate {
    [key: string]: (str: string) => boolean;
}

export declare const regExpMap: {
    isMobile: RegExp;
    includechinese: RegExp;
    isMoney: RegExp;
    weakIsMoney: RegExp;
};

/**
 * 延时函数
 * @async
 * @param {number} time 需要延长的时间
 * @return {Promise<number>}
 */
export declare const sleep: (time: number, isReject?: boolean) => Promise<number>;

declare class TimeCtor {
    private timestamp;
    static readonly formatReg: RegExp;
    /**
     * time format: xx:xx:xx
     * @constructor
     * @param {string} time 时间，可以是'HH:mm'格式的，也可以是'HH:mm:ss'格式的。
     */
    constructor(time: string);
    private getTimeStamp;
    private compare;
    isBefore(comparedTime: string): boolean;
    isAfter(comparedTime: string): boolean;
    isSame(comparedTime: string): boolean;
    isInRange(startTime: string, endTime: string): boolean;
}

export declare function timejs(time: string): TimeCtor;

declare interface TimeRange {
    startTime: string;
    endTime: string;
}

export declare const validate: IValidate;

/**
 * 判断一组时间段是否重叠，如有重叠，返回true。
 * @param timeList: [{startTime, endTime}]，
 * @param time: 形如'22:00'的
 * @return {boolean} 是否存在重叠
 */
export declare function validateTimeOverlay(timeList: TimeRange[]): boolean;

export { }
