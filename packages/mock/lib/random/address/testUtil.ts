import addrData from "./dict.json";

type Props = keyof typeof addrData;

export function findProvince(name: string) {
  if (!process.env.VITEST) {
    throw new Error(`this function is only used in test mode. `);
  }
  const provinceCodes = Object.keys(addrData).filter((code) =>
    code.endsWith("0000")
  );
  return !!provinceCodes.find((item) => {
    const target = item as Props;
    return addrData[target] === name;
  });
}
