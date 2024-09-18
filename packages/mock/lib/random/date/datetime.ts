import dayjs from "dayjs";

export default {
  name: "datetime",
  serve: (...args: any[]) => {
    if (args.length === 0) {
      return dayjs(parseInt((Math.random() * 1e10).toString())).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
    if (args.length === 1) {
      return dayjs(parseInt((Math.random() * 1e10).toString())).format(args[0]);
    }
    const [type, date, format = "YYYY-MM-DD HH:mm:ss"] = args;
    if (type === "before") {
      const max = dayjs(date).unix();
      return dayjs(parseInt((Math.random() * max).toString())).format(format);
    } else if (type === "after") {
      const max = dayjs().add(1, "y").unix();
      return dayjs(parseInt((Math.random() * max).toString())).format(format);
    }
  },
};
