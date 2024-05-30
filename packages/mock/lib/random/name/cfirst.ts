const { sample } = require("../../utils");

module.exports = (length) => {
  const map = require("./name.json").cfirst;
  if (!length) {
    return sample(map);
  }
  if (Number(length) === 2) {
    return sample(map.filter((item) => item.length === 2));
  }
  return sample(map.filter((item) => item.length === 1));
};
