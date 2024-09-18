import integer from "../basic/integer";
/**
 * 生成rgb格式的颜色，含透明度
 */
export default {
  name: "rgb",
  serve: (useOpacity: boolean) => {
    if (useOpacity === true) {
      const opacity = (integer.serve(0, 100) / 100).toFixed(2);
      return `rgba(${getRandom()},${getRandom()},${getRandom()},${opacity})`;
    }
    return `rgb(${getRandom()},${getRandom()},${getRandom()})`;
  },
};

function getRandom() {
  return integer.serve(0, 255);
}
