import { sample } from "lodash-es";
import { repeatNumber } from "../../shared";
export default {
  name: "mobile",
  serve: () => {
    const prefix = sample([13, 15, 18]);
    return Number(`${prefix}${repeatNumber(9)}`);
  },
};
