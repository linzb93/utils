import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
  AxiosPromise,
  RawAxiosResponseHeaders,
  AxiosError,
} from "axios";

type NoopFn = () => void;

interface ToastOptions {
  type?: "error";
  message: string;
  duration?: number;
  onClose?: NoopFn;
}

export interface IToast {
  (options: ToastOptions): void;
}

export interface ILoading {
  open(text?: string): void;
  close: NoopFn;
}

export interface AnyObject {
  [key: string]: any;
}

/**
 * 缓存方案：
 * 单一接口缓存：在_config中设置cache: true。
 * 多关联接口缓存：全局参数添加字段`cachePair`，这样的话只有第一次调用get接口，以及调用set接口后的第一次调用get接口才会发送请求，其他时候都是使用缓存。
 * 结构如下：
 * [
      {
        get: "/api/get",
        set: "/api/set"
      }
    ]
 */
export interface CachePair {
  get: string;
  set: string;
}

/**
 * 全局配置
 */
export interface IGlobalOptions {
  baseURL: string;
  timeout?: number;
  logApiError?: boolean;
  loginaddr?: string;
  /**
   * 接口调用失败后重复的次数，不设置即为0。
   */
  retry?: number;
  /**
   * 补充Headers
   * @param config - Axios的config
   * @param url - 请求的地址
   * @returns {object} Headers
   */
  enhanceHeaders: (config: AxiosRequestConfig, url: string) => AnyObject;
  cachePair?: CachePair[];
  /**
   * 读取token的方法，默认是从localStorage的token字段读取
   * @returns token
   */
  getToken?: () => string;
  /**
   * 配置http code
   * @param map 
   * @returns 
   */
  configureHttpCode: () => HttpCodeMap;
  listeners?: {
    /**
     * token失效的回调
     * @param data 接口返回的数据
     * @returns {}
     */
    tokenInvalid: (data: AxiosResponse["data"]) => void | boolean;
    /**
     * 接口返回成功的回调
     * @param data 接口返回的数据
     * @param headers 
     * @returns 
     */
    success: (
      data: AxiosResponse["data"],
      headers: RawAxiosResponseHeaders
    ) => void;
    /**
     * 无权限访问的回调
     * @param data 接口返回的数据
     * @param headers 
     * @returns 
     */
    authDeny: (
      data: AxiosResponse["data"],
      headers: RawAxiosResponseHeaders
    ) => void;
    /**
     * 接口其他报错的回调
     * @param res Axios的response
     * @returns 
     */
    error: (res: AxiosResponse) => void;
  };
}

/**
 * 单接口配置
 */
export interface ISingleOptions {
  noLoading: boolean;
  loadingText: string;
  noToast: boolean;
  /**
   * 接口不带token
   */
  ignoreToken: boolean;
  /**
   * 缓存时间，单位ms
   */
  cache: number;
  /**
   * 接口报错时，直接进入业务代码处理错误，不进入其他逻辑
   */
  catchImmediately: boolean;
  /**
   * 接口报错时的重复次数，不设置即为0，优先级大于全局配置的retry。
   */
  retry?: number;
}
export type JoinCustomizedConfig = InternalAxiosRequestConfig & {
  _config: ISingleOptions;
  beginTime: number;
};
export interface IAdapter {
  (config: JoinCustomizedConfig): AxiosPromise;
}

export interface SuccessParams extends AxiosResponse {
  config: {
    beginTime: number;
    url: string;
    _config: ISingleOptions;
    headers: AxiosRequestHeaders;
  };
}
interface ErrorParams extends AxiosError { }

export type WrapInterceptersParams = SuccessParams & ErrorParams;

export interface HttpCodeMap {
  SUCCESS: number; // 请求成功
  BAD_REQUEST: number; // 请求参数有误
  NOT_FOUND: number; // 请求地址不存在
  AUTH_DENY: number; // 账号不匹配或权限不足
  METHOD_NOT_ALLOWED: number; // 请求方式错误
  REQUEST_TIMEOUT: number; // 请求超时
  INTERNAL_SERVER_ERROR: number; // 服务器异常
  GATEWAY_TIMEOUT: number; // 网关超时
  DEFAULTERROR: number; // 系统繁忙，请稍后再试
  NULLDATA: number; // 未找到记录
  NOTLOGIN: number; // 未登录
  EXCEPTION: number; // 异常
  DATAISVALID: number; // 数据验证不通过
  DATAEXPIRED: number; // 数据过期
  BUSINESSERROR: number; // 业务性异常
}