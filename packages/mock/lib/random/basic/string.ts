import char from "./char";
export default (min = 3, max = 10) => {
  let ret = "";
  const len = min + parseInt(Math.random() * (max - min));
  for (let i = 0; i < len; i++) {
    ret += char();
  }
  return ret;
};
