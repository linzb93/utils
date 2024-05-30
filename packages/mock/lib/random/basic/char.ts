const { sample } = require("../../utils");

const strs = "abcdefghijklmnopqrstuvwxyz";
module.exports = () => {
  return sample(strs.split(""));
};
