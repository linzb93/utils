module.exports = (min = 1, max = 1e9, dmin = 1, dmax = 7) => {
  const int = min + parseInt(Math.random() * (max - min));
  let dec = parseInt(Math.random() * Math.pow(10, dmax));
  if (dec < Math.pow(10, dmin)) {
    dec = "0".repeat(dmin - dec.toString().replace(/0+$/g, "").length) + dec;
  }
  return `${int}.${dec}`;
};
