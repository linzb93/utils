type PromiseFunc = (data?: any) => Promise<any>;
type RetryTimesCallBackFn = (retryTimes: number, message?: string) => void;
/**
 * 
 * @param {PromiseFunc} input - 返回Promise的函数 
 * @param {object} options
 * @param {number} options.retries - 最多重复的次数，超过这个次数就报错
 * @param {RetryTimesCallBackFn} options.retryTimesCallback Promise每次返回rejected时触发的回调
 * @returns 
 */
export const pRetry = async (input: PromiseFunc,
    {
        retries = 10,
        retryTimesCallback
    }: {
        retries: number;
        retryTimesCallback?: RetryTimesCallBackFn
    }
): Promise<any> => {
    let count = 0;
    const retryFunc = async (
        pInputParam: PromiseFunc,
        retriesTime: number
    ): Promise<any> => {
        try {
            return await pInputParam();
        } catch (error) {
            count += 1;
            typeof retryTimesCallback === 'function' &&
                retryTimesCallback(count, (error as Error).message);
            if (count >= retriesTime) {
                throw error;
            } else {
                return retryFunc(pInputParam, retriesTime);
            }
        }
    };
    let data;
    try {
        data = await retryFunc(input, retries);
    } catch (error) {
        throw error;
    }
    return data;
};

/**
 * 串行执行获取第一个完成，状态为resolved的Promise结果
 * @param {any[]} list 需要遍历的列表
 * @param {Promise} callback 异步的回调函数
 * @returns {any} 第一个状态为resolved的Promise结果
 */
export const pLocate = async (
    list: any[],
    callback: PromiseFunc
): Promise<any> => {
    for (let i = 0; i < list.length; i++) {
        try {
            return await callback(list[i]);
        } catch (error) {
            //
        }
    }
    return Promise.reject('pLocate error');
};