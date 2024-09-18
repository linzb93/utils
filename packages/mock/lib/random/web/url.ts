import { sample } from "lodash-es";
import stringFn from "../basic/string";

export default {
  name: "url",
  serve: (useHttp: boolean) => {
    const protocol = useHttp ? "http" : "https";
    const top = sample(["com", "cn", "net"]);
    return `${protocol}://www.${stringFn.serve(3, 6)}.${top}`;
  },
};
