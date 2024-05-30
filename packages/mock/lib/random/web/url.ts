const { sample } = require("../../utils");
const string = require("../basic/string");
module.exports = (useHttp) => {
  const protocol = useHttp ? "http" : "https";
  const top = sample(["com", "cn", "net"]);
  return `${protocol}://www.${string(3, 6)}.${top}`;
};
