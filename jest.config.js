/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  // 如果有报node_modules 里面 export的错误，在这里添加模块的名称。
  transformIgnorePatterns: ["/node_modules/(?!(lodash-es)/)"],
};
