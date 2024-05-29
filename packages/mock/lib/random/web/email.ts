const { sample } = require("../../utils");

module.exports = (serve) => {
  const prefix = "";
  if (serve) {
    return `${prefix}@${serve}.com`;
  }
  const matchServe = sample(["qq", "163", "sina", "gmail", "souhu"]);
  return `${prefix}@${matchServe}.com`;
};
