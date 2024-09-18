import { sample } from "lodash-es";
import { repeatNumberAndString } from "../../shared";

export default {
  name: "email",
  serve: (serve: string) => {
    const prefix = repeatNumberAndString(5, 9);
    if (serve) {
      return `${prefix}@${serve}.com`;
    }
    const matchServe = sample(["qq", "163", "sina", "gmail", "souhu"]);
    return `${prefix}@${matchServe}.com`;
  },
};
