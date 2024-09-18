import integer from "../basic/integer";
export default {
  name: "ip",
  serve: () => {
    return `${getData()}.${getData()}.${getData()}.${getData()}`;
  },
};

function getData() {
  return integer.serve(0, 255);
}
