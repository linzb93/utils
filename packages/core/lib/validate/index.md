# validate
正则表达式验证。
```js
import { validate, regExpMap } from '@linzb93/utils';

validate.isMobile('13533335555'); // true
validate.isMoney('23.213'); // false
validate.weakIsMoney('23.'); // true
```
支持4种正则表达式验证：
* isMobile: 是手机号
* includechinese: 包含中文
* isMoney: 是货币（最多包含2位小数）
* weakIsMoney: 是货币（最多包含2位小数，最后一位可以是`.`号）