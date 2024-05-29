module.exports = () => {
  return `#${getRandom()}${getRandom()}${getRandom()}`;
};

function getRandom() {
  const data = parseInt(Math.random()) * 256;
  const raw = data === 256 ? 255 : data;
  return raw.toString(16);
}
