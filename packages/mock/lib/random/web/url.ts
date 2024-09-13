import { sample } from "../../shared";
import stringFn from "../basic/string";

export default (useHttp: boolean) => {
  const protocol = useHttp ? "http" : "https";
  const top = sample(["com", "cn", "net"]);
  return `${protocol}://www.${stringFn(3, 6)}.${top}`;
};
