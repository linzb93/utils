import axios from "axios";
// import dataset from "../utils/dataset";
import { enhanceResponse } from "../utils";
import { statusMap } from "../utils/constant";
/**
 * 缓存方案：
 * 单一接口缓存：在_config中设置cache: true
 * 多关联接口缓存：全局参数添加字段`cachePair`,这样的话只有第一次调用get接口，以及调用set接口后的第一次调用get接口才会发送请求，其他时候都是使用缓存。
 * 结构如下：
 * [
      {
        get: "/api/get",
        set: "/api/set"
      }
    ]
 */
const cachesMap = new Map();
export default (options) => {
  /**
   * Axios的adapter是处于request拦截器和response拦截器中间的功能。当Axios收到请求后，先遍历所有的request拦截器，然后再进入adapter，此时才是由客户端向服务端发送请求，收到返回数据后遍历response拦截器，最后返回给业务代码调用Axios的地方。
   */
  return (config) => {
    const { _config, url } = config;
    const { cachePair } = options;
    if (needGetDataFromCache(options, config) && cachesMap.has(url)) {
      return Promise.resolve(enhanceResponse(cachesMap.get(url), config));
    }
    return new Promise(async (resolve, reject) => {
      const retryTotal = !_config || !_config.retry ? 0 : _config.retry;
      let i = 0;
      let response = null; // 正常的接口返回
      let err = null; // 接口报错
      for (; i <= retryTotal; i++) {
        try {
          response = await axios.defaults.adapter(config);
          const responseCode = response.data.code;
          if (
            [
              statusMap.SUCCESS,
              statusMap.NOTLOGIN,
              statusMap.AUTH_DENY,
            ].includes(responseCode)
          ) {
            // 这3种情况下，不需要重复请求接口
            break;
          }
        } catch (error) {
          err = error;
        }
      }
      if (!response) {
        // 循环走完，但还是报错的
        reject(err);
      } else {
        let resData;
        try {
          resData = JSON.parse(response.data);
        } catch (error) {}
        // 当没有缓存时存入数据
        if (_config && _config.cache) {
          if (resData && resData.result) {
            cachesMap.set(url, resData.result);
          }
        }
        if (cachePair) {
          // 调用了set接口后需要情况缓存，重新请求数据
          const matchSet = cachePair.find((item) => item.set === url);
          if (matchSet) {
            cachesMap.delete(matchSet.get);
          }
          const matchGet = cachePair.find((item) => item.get === url);
          if (matchGet && resData && "result" in resData) {
            cachesMap.set(url, resData.result);
          }
        }
        resolve(response);
      }
    });
  };
};

// 是否需要从缓存中读取，无需请求接口
function needGetDataFromCache(options, config) {
  const { _config, url } = config;
  if (_config && _config.cache) {
    return cachesMap.has(url);
  }
  const { cachePair } = options;
  if (!cachePair || !Array.isArray(cachePair) || !cachePair.length) {
    return false;
  }
  return cachePair.find((item) => item.get === url);
}
