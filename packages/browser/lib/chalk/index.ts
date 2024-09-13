const chalk = {
  /**
   * 像chalk在命令行环境中输出一样，在浏览器中输出
   * @param {string} content 输出内容
   * @example
   * chalk.log(`来自${chalk.red("liming")}的信，发送时间是${chalk.purple("2023-03-04")}。`);
   */
  log(content: string) {
    const colorMap = [
      "red",
      "yellow",
      "green",
      "blue",
      "orange",
      "cyan",
      "magenta",
      "pink",
      "purple",
    ];
    const reg = "(/c(" + colorMap.join("|") + ")).+?(c/)";
    const globalReg = new RegExp(reg, "g");
    const colors: string[] = [];
    const replaced = content.replace(
      globalReg,
      (matchStr, openMatch, color, closeMatch) => {
        colors.push(color);
        colors.push("");
        return matchStr.replace(openMatch, "%c").replace(closeMatch, "%c");
      }
    );
    console.log(
      replaced,
      ...colors.map((color) => (!!color ? `color:${color}` : ""))
    );
  },
  commonColor(color: string, content: string) {
    return `/c${color}${content}c/`;
  },
  red(content: string) {
    return this.commonColor("red", content);
  },
  yellow(content: string) {
    return this.commonColor("yellow", content);
  },
  orange(content: string) {
    return this.commonColor("orange", content);
  },
  blue(content: string) {
    return this.commonColor("blue", content);
  },
  green(content: string) {
    return this.commonColor("green", content);
  },
  cyan(content: string) {
    return this.commonColor("cyan", content);
  },
  gray(content: string) {
    return this.commonColor("gray", content);
  },
  magenta(content: string) {
    return this.commonColor("magenta", content);
  },
  pink(content: string) {
    return this.commonColor("pink", content);
  },
  purple(content: string) {
    return this.commonColor("purple", content);
  },
};

export default chalk;
