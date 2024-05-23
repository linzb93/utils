# cutDecimalSegNumber
## 使用方法
截断小数位数，默认2位

```js
import { cutDecimalSegNumber } from '@linzb93/utils';

cutDecimalSegNumber(23.332); // 23.33
cutDecimalSegNumber(23.33283, 3); // 23.332

```
## API
### cutDecimalSegNumber(data, digit?)
截断小数位数。
#### data
Type: `number`

原始值。
#### digit
Type: `number`
Default: 2
截断的位数。
