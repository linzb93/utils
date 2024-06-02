import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
  AxiosPromise,
} from "axios";

type NoopFn = () => {};

export interface IToast {
  type?: "error";
  message: string;
  duration: number;
  onClose: NoopFn;
}

export interface ILoading {
  open(text: string): void;
  close: NoopFn;
}

export interface AnyObject {
  [key: string]: any;
}

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
export interface CachePair {
  get: string;
  set: string;
}

export interface IGlobalOptions {
  baseURL: string;
  timeout?: number;
  logApiError?: boolean;
  loginAddr?: string;
  enhanceHeaders: (configData: AxiosRequestConfig, url: string) => AnyObject;
  cachePair?: CachePair[];
  getToken?: () => string;
  listeners?: {
    tokenInvalid: (data: AxiosResponse["data"]) => void;
    success: (
      data: AxiosResponse["data"],
      headers: AxiosRequestHeaders
    ) => void;
    authDeny: (
      data: AxiosResponse["data"],
      headers: AxiosRequestHeaders
    ) => void;
    error: (res: AxiosResponse) => void;
  };
}
export interface ISingleOptions {
  noLoading: boolean;
  noToast: boolean;
  ignoreToken: boolean;
  cache: boolean;
  loadingText: string;
  catchImmediately: boolean;
  retry?: number;
}
export type JoinCustomizedConfig = InternalAxiosRequestConfig & {
  _config: ISingleOptions;
};
export interface IAdapter {
  (config: JoinCustomizedConfig): AxiosPromise;
}
