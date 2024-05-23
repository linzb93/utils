# timeOverlay
判断时间是否有重叠（目前还不支持跨天的）。
```js
import { isTimeOverlay, validateTimeOverlay } from '@linzb93/utils';

isTimeOverlay([
    { startTime: '18:00', endTime: '20:00'},
    { startTime: '18:30', endTime: '20:40'},
]); // true

isTimeOverlay([
    { startTime: '12:00', endTime: '17:00'},
    { startTime: '18:00', endTime: '20:00'},
    { startTime: '18:30', endTime: '20:40'},
]); // true
```