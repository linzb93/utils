# binarySearch

通过二分查找的方式找到最符合条件的数。
## 使用方法
```js
import { binarySearch } from '@linzb93/utils';

binarySearch({
    start: 1,
    end: 100,
    callback: data => data > 40
}); // 41

```
## API
### binarySearch({start, end, callback})
返回类型`number`, 最接近条件的数。
#### start
Type: `number`

起始值
#### end
Type: `number`
结束值

#### callback(data:number)
返回`boolean`。