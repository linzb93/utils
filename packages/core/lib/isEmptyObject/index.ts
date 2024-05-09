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
export const isEmptyObject = (obj: any): boolean => {
    for (const key in obj) {
      return false;
    }
    return true;
  };