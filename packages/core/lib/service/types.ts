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
  loginaddr?: string;
  enhanceHeaders: (configData: AxiosRequestConfig, url: string) => AnyObject;
  cachePair?: CachePair[];
  getToken?: () => string;
  listeners?: {
    tokenInvalid: (data: AxiosResponse["data"]) => void | boolean;
    success: (
      data: AxiosResponse["data"],
      headers: RawAxiosResponseHeaders
    ) => void;
    authDeny: (
      data: AxiosResponse["data"],
      headers: RawAxiosResponseHeaders
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

export interface SuccessParams extends AxiosResponse {
  config: {
    beginTime: number;
    url: string;
    _config: ISingleOptions;
    headers: AxiosRequestHeaders;
  };
}
interface ErrorParams extends AxiosError {}

export type WrapInterceptersParams = SuccessParams & ErrorParams;
