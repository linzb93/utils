export default () => {
  return `#${getRandom()}${getRandom()}${getRandom()}`;
};

function getRandom() {
  const data = parseInt((Math.random() * 256).toString());
  const raw = data === 256 ? 255 : data;
  return raw.toString(16);
}
