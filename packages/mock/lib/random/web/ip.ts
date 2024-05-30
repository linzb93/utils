module.exports = () => {
  return `${getData()}.${getData()}.${getData()}.${getData()}`;
};

function getData() {
  return parseInt(Math.random() * 256);
}
