const path = require("path");
const DtsBundlePlugin = require("@qiushaocloud/webpack-dts-bundle-plugin");
//
module.exports = {
  entry: "./packages/core/lib/index.ts",
  output: {
    path: path.join(process.cwd(), "packages/core/dist"),
    filename: "bundle.js",
  },
  mode: "none",
  resolve: {
    extensions: [".ts", ".tsx", ".js"], // 解析这些文件扩展名
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // 匹配.ts和.tsx文件
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false,
            },
          },
        ],
        exclude: /node_modules/, // 排除node_modules目录
      },
    ],
  },
  plugins: [
    new DtsBundlePlugin({
      name: "@linzb93/util",
      main: path.resolve(process.cwd(), "packages/core/lib/"),
      out: path.resolve(process.cwd(), "packages/core/dist/index.d.ts"),
    }),
  ],
};
