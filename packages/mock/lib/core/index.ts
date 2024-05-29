import use, { database } from "./use";
import cname from "../random/name/cname";
import province from "../random/name/province";
import city from "../random/name/city";
import county from "../random/name/county";

export default function (template: any) {
  return Object.keys(template).reduce((obj, key) => {
    // if (key.includes('|') && Array.isArray(template[key])) {
    //   const index = key.indexOf('|');
    //   const length = Number(key.slice(index + 1));

    // }
    const matchWrap = template[key].slice(1);
    const match = matchWrap.match(/^(\w+)(\((\S+)\))?$/);
    if (match) {
      const args = match[3] ? match[3].split(",") : [];
      return {
        ...obj,
        [key]: database[match[1]](...getParams(args)),
      };
    }
    return {
      ...obj,
      [key]: database[match[1]](),
    };
  }, {});
}

function getParams(args: string[]) {
  return args.map((arg) => {
    if (arg === "true") {
      return true;
    }
    if (arg === "false") {
      return false;
    }
    if (parseInt(arg) === Number(arg)) {
      return Number(arg);
    }
    return arg;
  });
}
