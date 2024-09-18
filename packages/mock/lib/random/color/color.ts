import integer from "../basic/integer";
/**
 * 生成RGB格式十六进制的
 */
export default {
  name: "color",
  serve: () => {
    return `#${getRandom()}${getRandom()}${getRandom()}`;
  },
};

function getRandom() {
  return integer.serve(0, 255).toString(16);
}
