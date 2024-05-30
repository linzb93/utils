module.exports = (...args) => {
  let max = 1e10;
  if (args.length === 0) {
    return parseInt(Math.random() * max);
  }
  if (args.length === 1) {
    max = Number(args[0]);
    return parseInt(Math.random() * max);
  }
  if (args.length === 2) {
    const min = Number(args[0]);
    const max = Number(args[1]);
    return parseInt(Math.random() * (max - min)) + min;
  }
};
