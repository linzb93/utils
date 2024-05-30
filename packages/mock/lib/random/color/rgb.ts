module.exports = (useOpacity) => {
  if (useOpacity === true) {
    const opacity = Math.random().toFixed(2);
    return `rgba(${getRandom()},${getRandom()},${getRandom()},${opacity})`;
  }
  return `rgb(${getRandom()},${getRandom()},${getRandom()})`;
};

function getRandom() {
  const data = parseInt(Math.random()) * 256;
  return data === 256 ? 255 : data;
}
