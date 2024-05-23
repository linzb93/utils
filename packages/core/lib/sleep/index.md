# sleep
延迟一定的时间。
## 使用方法
```js
import { sleep } from '@linzb93/utils';

(async () => {
    await sleep(3000);
    console.log('3秒后执行');
})();
```
## API
### sleep(time)
返回一个`Promise`。
#### time
Type: `number`

延迟的时间，单位：秒。