const {
  utils: { sample },
} = require("@linzb93/mock");
const data = require("./brand.json");
module.exports = () => {
  const all = Object.keys(data).reduce((list, key) => {
    return list.concat(data[key]);
  }, []);
  return sample(all);
};
