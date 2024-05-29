const dayjs = require("dayjs");

module.exports = (...args) => {
  if (args.length === 0) {
    return dayjs(parseInt(Math.random() * 1e10)).toDate();
  } else if (args.length === 1) {
    return dayjs(parseInt(Math.random() * 1e10)).format(args[0]);
  } else if (args.length === 3) {
    const [type, date, format] = args;
    if (type === "before") {
      const max = dayjs(date).unix();
      return dayjs(parseInt(Math.random() * max)).format(format);
    } else if (type === "after") {
      const max = dayjs().add(1, "y").unix();
      return dayjs(parseInt(Math.random() * max)).format(format);
    }
  }
};
