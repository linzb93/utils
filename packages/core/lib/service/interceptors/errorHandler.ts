import { logger, getErrorType } from "../utils";
import objectGet from "lodash/get";
// 处理Axios的错误逻辑，包括接口不存在、接口跨域、超时、http code !== 200的
export default ({ Toast, options }) =>
  (err) => {
    if (objectGet(err, "config._config")) {
      const { _config } = err.config;
      if (_config.cacheImmediately) {
        return Promise.reject(err);
      }
    }
    const errorType = getErrorType(err);
    if (objectGet(err, "response.config")) {
      // 接口不存在
      if (errorType === "not found") {
        logger.error(`接口<strong>${err.config.url}</strong>不存在`);
      }
      const {
        config: { _config },
        status,
      } = err.response;
      options.listeners &&
        typeof options.listeners.error === "function" &&
        options.listeners.error(status);
      // 其他报错
      if (!_config || !_config.noToast) {
        Toast({
          type: "error",
          message: "网络错误，请重试",
          duration: 2000,
        });
      }
    } else {
      if (err) {
        if (errorType === "cors or not found") {
          // 接口不存在或跨域
          logger.error(`<strong>${err.config.url}</strong>接口不存在或跨域`);
        } else if (errorType === "timeout") {
          // 超时
          logger.error(`<strong>${err.config.url}</strong>接口超时`);
        }
      }
      Toast({
        type: "error",
        message: "网络错误，请重试",
        duration: 2000,
      });
    }
    return Promise.reject(err);
  };
