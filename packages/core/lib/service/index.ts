import axios, {AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders} from "axios";
import { statusMap, isProd } from "./utils/constant";

import once from "lodash/once";
import track, { setBeginTime } from "./plugins/track";
import errorHandler from "./interceptors/errorHandler";
import adapterFn from "./adapter";
import { sleep } from "..";
import { logger } from "./utils";
import {IToast, ILoading, AnyObject} from './types';

interface IGlobalOptions {
  baseURL: string;
  timeout?: number;
  logApiError?: boolean;
  loginAddr?: string;
  enhanceHeaders: (configData: AxiosRequestConfig, url: string) => AnyObject,
  cachePair?: {
    get: string;
    set: string;
  }[];
  getToken?: () => string;
  listeners?: {
    tokenInvalid: (data: AxiosResponse['data']) => void;
    success: (data: AxiosResponse['data'], headers: AxiosRequestHeaders) => void;
    authDeny: (data: AxiosResponse['data'], headers: AxiosRequestHeaders) => void;
    error: (res: AxiosResponse) => void;
  }
}

interface ISingleOptions {
  noLoading: boolean;
  noToast: boolean;
  ignoreToken: boolean;
  cache: boolean;
  loadingText: string;
  catchImmediately: boolean;
}


export default ({ Toast, loading }: {Toast: IToast, loading: ILoading}) => {
  return function (optionsParam: IGlobalOptions) {
    const defaultOptions = {
      baseURL: "",
      timeout: 1500,
      logApiError: true,
      loginaddr: "",
      enhanceHeaders() {},
      listeners: {
        tokenInvalid() {},
        success() {},
      },
      getToken() {
        return localStorage.getItem("token");
      },
    };
    const options = { ...defaultOptions, ...optionsParam };
    const adapter = adapterFn(options);
    const serviceInstance = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout,
      adapter,
    });
    // --------- request 请求拦截器 ---------
    if (options.logApiError) {
      serviceInstance.interceptors.request.use(setBeginTime);
    }
    serviceInstance.interceptors.request.use((config) => {
      /**
       * 与axios请求无关的配置，不会带给服务端的。写在`config`的`_config`属性里面。
       * `config`包含下列属性：
       * - noLoading: 请求过程中不显示loading图标
       * - noToast: 请求失败后不显示错误提醒
       * - ignoreToken: 该接口的headers不需要携带token
       * - cache: 缓存接口
       * - loadingText: loading的文字
       * - cacheImmediately: 立即捕获，不进入监控系统及后续处理
       */
      const { _config } = config;
      config.data = config.data || {};
      let url = config.url;
      url = url.includes("http") ? url : config.baseURL + url;
      // 对headers的补充，例如加上加密数据
      let supplementHeaders = {};
      if (typeof options.enhanceHeaders === "function") {
        try {
          supplementHeaders = options.enhanceHeaders(config.data, url);
        } catch (error) {
          logger.error(`enhanceHeaders error: ${error.message}`);
        }
      }
      config.headers = {
        ...config.headers,
        ...supplementHeaders,
      };
      // token可以是接口独有的，或者全局通用的。
      let token = config.headers.token;

      if (_config && _config.ignoreToken) {
        token = "";
      } else if (!token) {
        try {
          token = options.getToken();
        } catch (error) {
          console.log(`service getToken error: ${error.message}`);
        }
      }
      config.headers.token = token;
      // 控制loading的显示
      if (!_config) {
        loading.open();
      } else if (!_config.noLoading) {
        loading.open(_config.loadingText || "");
      }
      return config;
    });
    // --------- / request 请求拦截器 ---------

    // --------- response 请求拦截器 ---------
    const tokenInvalidCallbackOnce = once(async (res) => {
      if (
        options.listeners &&
        typeof options.listeners.tokenInvalid === "function"
      ) {
        const ret = options.listeners.tokenInvalid(res.data);
        if (ret === false) {
          return res;
        }
        await sleep(200);
        Toast({
          message: "请重新登录",
          onClose: () => {
            if (isProd() && options.loginaddr) {
              location.href = options.loginaddr;
            }
          },
        });
      }
    });
    // 第一步，关掉loading
    serviceInstance.interceptors.response.use(
      (res) => {
        const { _config } = res.config;
        if (!_config || !_config.noLoading) {
          loading.close();
        }
        return res;
      },
      (err) => {
        // 因为接口超时的情况下,err是没有response属性的，所以不需要判断接口是否不显示loading。
        loading.close();
        return Promise.reject(err);
      }
    );
    // 第二步，引入监控系统
    if (options.logApiError) {
      serviceInstance.interceptors.response.use(
        track("resolve"),
        track("reject")
      );
    }
    // 第三步，处理其他逻辑
    serviceInstance.interceptors.response.use(
      (res) => {
        const { _config } = res.config;
        if (
          ![
            statusMap.SUCCESS,
            statusMap.NOTLOGIN,
            statusMap.AUTH_DENY,
          ].includes(res.data.code) &&
          _config &&
          _config.cacheImmediately
        ) {
          return Promise.reject(res);
        }
        // http code为200，但是没有任何数据返回的。
        if (!res.data) {
          Toast({
            type: "error",
            message: "网络错误，请重试",
            duration: 1500,
          });
          logger.error(`<strong>${res.config.url}</strong>返回内容为空`);
          return Promise.reject("网络错误，请重试");
        }
        // token失效的处理过了，就直接返回
        if (res.data.code === statusMap.NOTLOGIN) {
          tokenInvalidCallbackOnce(res);
          return Promise.reject(res.data.msg, res.data);
        }
        // 店客多项目正常的接口都会返回result字段，如果没有的话就是接口有问题。也有可能是接口http result code就不是200
        if (res.data && "result" in res.data === false) {
          if (res.data.code === statusMap.AUTH_DENY) {
            options.listeners &&
              typeof options.listeners.authDeny === "function" &&
              options.authDeny(res.data);
            return Promise.reject(res.data.msg, res.data);
          }
          logger.error(
            `接口<strong>${res.config.url}</strong>没有返回result字段`
          );
          Toast({
            type: "error",
            message: "网络错误，请重试",
            duration: 1500,
          });
          return Promise.reject("网络错误，请重试");
        }
        // 无权限访问
        if (res.data.code === statusMap.AUTH_DENY) {
          options.listeners &&
            typeof options.listeners.authDeny === "function" &&
            options.authDeny(res.data);
          return Promise.reject(res.data.msg, res.data);
        }
        // 接口返回成功
        if (res.data.code === statusMap.SUCCESS) {
          if (typeof options.resolve === "function") {
            options.listeners &&
              typeof options.listeners.success === "function" &&
              options.success(res.data.result, res.config.headers);
          }
          return res.data.result;
        }
        // 其他报错
        if (!_config || !_config.noToast) {
          Toast({
            type: "error",
            message: res.data.msg,
            duration: 1500,
          });
        }
        return Promise.reject(res.data);
      },
      errorHandler({
        Toast,
        options,
      })
    );
    // --------- / response 请求拦截器 ---------
    return serviceInstance;
  };
};
