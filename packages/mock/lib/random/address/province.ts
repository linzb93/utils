const addrData = require("./address_ch.json");
const { sample } = require("../../utils");
module.exports = () => {
  const provinceCodes = Object.keys(addrData).filter((code) =>
    code.endsWith("0000")
  );
  return addrData[sample(provinceCodes)];
};
