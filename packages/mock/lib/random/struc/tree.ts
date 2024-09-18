/**
 * 生成树形结构，格式如下：
 * {
 *  "data|tree": {
 *   "id": "", // 自定义
 *   "name": "", // 自定义
 *   "children": [] // 无需声明，默认生成的
 *  }
 * }
 *
 * "data|tree.3" 表示最多嵌套三层，默认5层。
 */
export default {
  name: "tree",
  serve: () => {},
};
