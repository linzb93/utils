# timejs
时间相关的库（不含日期）
## 使用方法
```js
import { timejs } from '@linzb93/utils';

timejs('18:00').isAfter('15:30:00'); // true

timejs('15:00:00').isInRange('14:00:00', '15:30:00'); // true
```
## API
### timejs(time)
返回一个实例。
#### time
Type: `string`

时间格式支持"HH:mm"以及"HH:mm:ss"。

下面都是实例方法。
### isAfter(time)
所选时间是否在传入时间的后面。
#### time
Type: `string`

时间。
### isBefore(time)
所选时间是否在传入时间的前面。
#### time
Type: `string`

时间。
### isSame(time)
所选时间是否和传入时间相等。
#### time
Type: `string`

时间。
### isInRange(startTime, endTime)
所选时间是否在传入时间的中间（含相等）。
#### startTime
Type: `string`

时间。
#### endTime
Type: `string`

时间。
