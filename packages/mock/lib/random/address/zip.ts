const { sample } = require("../../utils");
const addrData = require("./address_ch.json");
module.exports = () => {
  return sample(Object.keys(addrData));
};
