const nameData = require("./name.json");
const { sample } = require("../../utils");
module.exports = (first, length) => {
  if (first) {
    if (length) {
      if (length - first.length <= 0) {
        return "";
      }
      return `${first}${sample(
        nameData.clast.filter((name) => length - first.length === name.length)
      )}`;
    }
    return `${first}${sample(nameData.clast)}`;
  }
  return `${sample(nameData.cfirst)}${sample(nameData.clast)}`;
};
