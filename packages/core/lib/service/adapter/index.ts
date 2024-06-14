import axios from "axios";
import { packToAxiosRespsonseLike } from "../utils";
import httpCodeUtils from "../utils/httpCode";
import { IGlobalOptions, JoinCustomizedConfig, IAdapter } from "../types";

// 存放接口返回的cache
const cachesMap = new Map();

const adapterFn: (options: IGlobalOptions) => IAdapter = (options) => {
  /**
   * Axios的adapter是处于request拦截器和response拦截器中间的功能。
   * 当Axios收到请求后，先遍历所有的request拦截器，然后再进入adapter，此时才是由客户端向服务端发送http请求。
   * 收到返回数据后遍历response拦截器，最后返回给业务代码。
   */
  return (config) => {
    const { _config, url } = config;
    const { cachePair } = options;
    const cacheKey = generateCacheKey(url as string, config.method as string, config.data);
    if (needGetDataFromCache(options, config, cacheKey)) {
      return Promise.resolve(packToAxiosRespsonseLike(cachesMap.get(cacheKey), config));
    }
    return new Promise(async (resolve, reject) => {
      const retryTotal = (() => {
        if (_config && _config.retry) {
          return _config.retry;
        }
        if (options.retry) {
          return options.retry;
        }
        return 0;
      })();
      let i = 0;
      let response = null; // 正常的接口返回
      let err = null; // 接口报错
      for (; i <= retryTotal; i++) {
        try {
          const adapter = axios.defaults.adapter as IAdapter;
          response = await adapter(config);
          const responseCode = response.data.code;
          if (
            [
              httpCodeUtils.get('SUCCESS'),
              httpCodeUtils.get('NOTLOGIN'),
              httpCodeUtils.get('AUTH_DENY')
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
            cachesMap.set(cacheKey, resData.result);
          }
        }
        if (cachePair) {
          // 调用了set接口后需要情况缓存，重新请求数据
          const matchSet = cachePair.find((item) => item.set === url);
          if (matchSet) {
            cachesMap.delete(matchSet.get);
          }
          const matchGet = cachePair.find((item) => item.get === url);
          if (matchGet && resData) {
            cachesMap.set(url, resData.result);
          }
        }
        resolve(response);
      }
    });
  };
};

// 生成缓存key
function generateCacheKey(url:string, method: string, body: object):string {
  return JSON.stringify({
    url,
    method,
    body
  });
}

// 是否需要从缓存中读取，无需请求接口
function needGetDataFromCache(
  options: IGlobalOptions,
  config: JoinCustomizedConfig,
  cacheKey: string
) {
  const { _config, url } = config;
  if (_config && _config.cache) {
    return cachesMap.has(cacheKey);
  }
  const { cachePair } = options;
  if (!cachePair || !Array.isArray(cachePair) || !cachePair.length) {
    return false;
  }
  return cachePair.find((item) => item.get === url);
}
export default adapterFn;
