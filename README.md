# utils

自用的工具包，包含工具函数。

## 使用方法
```js
import { sleep, formatWeekCircle } from '@linzb93/utils';

(async () => {
    await sleep(3000);
    console.log('3秒后才执行');

    formatWeekCircle(['周一','周二','周三','周六']); // 周一~周三、周六
})()
```

请在 Node v18+ 环境下开发。
```shell
git clone https://github.com/linzb93/utils.git
yarn
```
