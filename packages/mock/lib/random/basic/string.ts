import { repeatString } from "../../shared";
export default {
  name: "string",
  serve: (min = 3, max = 10) => {
    return repeatString(min, max);
  },
};
