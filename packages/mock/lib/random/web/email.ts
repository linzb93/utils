import { sample } from "../../shared";

export default (serve: string) => {
  const prefix = "";
  if (serve) {
    return `${prefix}@${serve}.com`;
  }
  const matchServe = sample(["qq", "163", "sina", "gmail", "souhu"]);
  return `${prefix}@${matchServe}.com`;
};
