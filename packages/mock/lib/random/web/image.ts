export default {
  name: "image",
  serve: (size: string) => {
    return `http://dummyimage.com/${size}`;
  },
};
