// 错误信息记录到日志管理系统，只在生产环境使用
import { isProd } from "../utils/constant";
import httpCodeUtils from "../utils/httpCode";
import { logger, getErrorType } from "../utils";
import { WrapInterceptersParams, JoinCustomizedConfig } from "../types";

interface DzPointUtil {
  push(params: SendParams): void;
}
declare global {
  interface Window {
    _dzPoint?: DzPointUtil;
  }
}
interface SendParams {
  t: "requestCodeError" | "request";
  rc: number;
  rt: number;
  ru: string;
  ec: number;
  em?: string;
  c: string;
}

// 记录接口的调用开始时间
export function setBeginTime(
  config: JoinCustomizedConfig
): JoinCustomizedConfig {
  config.beginTime = new Date().getTime();
  return config;
}
function track(params: SendParams) {
  if (window._dzPoint) {
    window._dzPoint.push(params);
  } else {
    console.log(params);
  }
}

export default (type: "resolve" | "reject") =>
  (params: WrapInterceptersParams) => {
    // resolve -> response
    // reject -> error
    const { _config } = params.config;
    // 只有dkd-service开发或者生产环境才能进入
    if (!isProd() || (_config && _config.catchImmediately)) {
      if (type === "resolve") {
        return params;
      } else if (type === "reject") {
        return Promise.reject(params);
      }
    }
    // js错误
    if (!params.config) {
      console.log(`js错误：${params.message}`);
      return Promise.reject(params);
    }
    const errorType = type === "reject" ? getErrorType(params) : null;
    const { config } = params; // 不管接口是不是报错的，params都有config字段。
    let responseData = (() => {
      if (type === "resolve") {
        return params.data;
      }
      return params.response
        ? params.response.data
        : {
          data: {
            message: "",
          },
        };
    })();

    // 先处理跨域或服务不存在的问题
    if (errorType === "cors or not found") {
      logger.info("触发接口跨域或接口不存在的埋点");
      track({
        t: "requestCodeError",
        rc: httpCodeUtils.get('DEFAULTERROR'),
        rt: 1, // 接口耗时
        ru: config.url,
        ec: httpCodeUtils.get('DEFAULTERROR'),
        em: params.message,
        c: JSON.stringify({
          method: "POST", // 请求方式
          data: {}, // 请求参数
          params: {},
        }),
      });
    } else {
      let httpCode = 200; // http status code
      let responseDataCode = 200; // http response data code
      if (type === "resolve") {
        responseDataCode = params.data.code || httpCodeUtils.get('DEFAULTERROR');
      } else if (type === "reject") {
        if (errorType === "timeout") {
          httpCode = httpCodeUtils.get('GATEWAY_TIMEOUT');
        } else {
          httpCode = params.response
            ? params.response.status
            : httpCodeUtils.get('INTERNAL_SERVER_ERROR');
        }
      }
      const rt =
        type === "resolve" ? new Date().getTime() - config.beginTime : 0; // 接口耗时
      if (httpCode === httpCodeUtils.get('SUCCESS') && !params.data) {
        // 没有返回结果
        console.log("触发接口没有返回数据的埋点");
        track({
          t: "requestCodeError",
          rc: httpCode, // 请求状态码
          rt, // 接口耗时
          ru: config.url, // 请求的地址
          ec: responseDataCode, // 后端返回的code
          em: "接口没有返回数据", // 后端返回的错误信息
          c: JSON.stringify({
            method: config.method, // 请求方式
            data: config.data, // 请求body
            params: config.params, // 请求参数
          }),
        });
      } else if (
        (responseDataCode !== httpCodeUtils.get('SUCCESS') &&
          responseDataCode !== httpCodeUtils.get('NOTLOGIN')) ||
        ![httpCodeUtils.get('SUCCESS'), httpCodeUtils.get('GATEWAY_TIMEOUT')].includes(httpCode)
      ) {
        // 其他接口code错误，只有正常返回的或者返回token失效的不记入监控系统
        console.log("触发接口其他错误的埋点");
        track({
          t: "requestCodeError",
          rc: httpCode, // 请求状态码
          rt, // 接口耗时
          ru: config.url, // 请求的地址
          ec: responseDataCode, // 后端返回的code
          em: responseData.msg || responseData.message, // 后端返回的错误信息
          c: JSON.stringify({
            method: config.method, // 请求方式
            data: config.data, // 请求参数
            params: config.params, // 请求参数
          }),
        });
      } else if (
        (rt > 2000 && responseDataCode === httpCodeUtils.get('SUCCESS')) ||
        errorType === "timeout"
      ) {
        // TODO: 接口重试的超过2s不应该被记录
        // 接口超时，用时超过2s
        console.log("触发接口超时2秒的埋点");
        track({
          t: "request",
          rc: httpCode, // 请求状态码
          rt, // 接口耗时
          ru: config.url, // 请求的地址
          ec: responseDataCode, // 后端返回的code
          c: JSON.stringify({
            method: config.method, // 请求方式
            data: config.data, // 请求参数
            params: config.params, // 请求参数
          }),
        });
      }
    }
    if (type === "resolve") {
      return Promise.resolve(params);
    }
    return Promise.reject(params);
  };
