import addrData from "./dict.json";
import { sample } from "lodash-es";
import { getProvinceCodes, getCodeName } from "./shared";

type Props = keyof typeof addrData;

/**
 * 随机获取省份(含省、自治区、直辖市)名称
 */
export default {
  name: "province",
  serve: () => {
    const provinceCodes = getProvinceCodes();
    const target = sample(provinceCodes) as Props;
    return getCodeName(target);
  },
};
