# formatWeekCircle
周期格式化。
## 使用方法
```js
import { formatWeekCircle } from '@linzb93/utils';

formatWeekCircle(["周一", "周二", "周三", "周五"]) // "周一~周三、周五"

formatWeekCircle(["周一", "周二", "周三", "周四", "周五", "周六", "周日"], {
    allText: "全部"
}); // "全部"
```
## API
### formatWeekCircle(weekList, options?)
#### weekList
Type: `string[]`

星期列表，例如`["周一", "周二", "周三", "周五"]`。

#### options
**allText**

Type: `string`

当一周七天都包含的时候，显示的文字。

**separator**

Type: `string`

分隔符，默认用`~`。