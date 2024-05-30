const { sample } = require("../../utils");
module.exports = () => {
  const prefix = sample([13, 15, 18]);
  let ret = prefix.toString();
  for (let i = 0; i < 9; i++) {
    ret += parseInt(Math.random() * 10);
  }
  return Number(ret);
};
