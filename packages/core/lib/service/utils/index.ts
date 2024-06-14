import { AxiosError, InternalAxiosRequestConfig } from "axios";
/**
 * 获取Axios拦截器错误的类型
 * @param {Error} error
 * @returns {string}
 */
export const getErrorType = (error: AxiosError) => {
  if (error.message && error.message.endsWith("code 404")) {
    return "not found";
  }
  if (error.message && error.message.startsWith("timeout")) {
    return "timeout";
  }
  if (!error || !error.response) {
    return null;
  }
  const { config } = error.response;
  if (!config) {
    if (error.code === "ERR_NETWORK") {
      return "cors or not found";
    }
  }
};

export const logger = {
  /**
   * @param {string} text - 输入的文字，着重的文字用HTML的<strong>标签包裹
   */
  error(text: string) {
    const match = text.match(/<strong>|<\/strong>/g);
    if (match) {
      const output = text.replace("<strong>", "%c").replace("</strong>", "%c");
      console.log(`[dkd-service error] ${output}`, "color:red", "");
    } else {
      console.log(`[dkd-service error] ${text}`);
    }
  },
  info(text: string) {
    console.log(text);
  },
};

/**
 * 将缓存的数据包装成Axios Response
 * @param result 
 * @param config 
 * @returns 
 */
export const packToAxiosRespsonseLike = (
  result: any,
  config: InternalAxiosRequestConfig
) => {
  return {
    config,
    data: {
      code: 200,
      msg: "success",
      result,
    },
    status: 200,
    statusText: "OK",
    headers: {},
  };
};
