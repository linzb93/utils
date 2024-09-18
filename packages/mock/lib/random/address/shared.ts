import addrData from "./dict.json";

export const getProvinceCodes = () => {
  return Object.keys(addrData).filter((code) => code.endsWith("0000"));
};

type Props = keyof typeof addrData;

export const getCodeName = (code: Props) => addrData[code];
