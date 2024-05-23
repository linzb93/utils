# fixContinuousNumber
生成连续的整数数组。
## 使用方法
```js
import { fixContinuousNumber } from '@linzb93/utils';

fixContinuousNumber(5); // ['0', '1', '2', '3', '4', '5']

fixContinuousNumber({
    start: 2,
    step: 2,
    max: 6,
    useFix0: true
}); // ['02', '04', '06']

```
## API
### fixContinuousNumber(max)
#### max
Type: `number`

最大值。列表从0开始生成，步长为1。

### fixContinuousNumber({start, max, step, useFix0})
#### max
Type: `number`

最大值。
#### start
Type: `number`

Default: 1

起始值。
#### step
Type: `number`

Default: 1

步长。
#### useFix0
Type: `boolean`

Default: false

是否补0。