export const isProd = () => {
  // PACKAGE_ENV 是 dkd-service 开发时才会设置的变量
  if (process.env.PACKAGE_ENV === "dev") {
    return true;
  }
  return process.env.NODE_ENV === "production" && process.env.DZ_ENV !== "test";
};
