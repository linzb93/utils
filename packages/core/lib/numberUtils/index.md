# numberUtils

一组关于数字操作的工具函数。

## fix0

为个位数补0。

```typescript
import { numberUtils } from '@linzb93/utils';

numberUtils.fix0(4); // '04'
numberUtils.fix0(12); // '12'
```

## cutDecimal

截断小数位数，默认2位。

```typescript
import { numberUtils } from '@linzb93/utils';

numberUtils.cutDecimal(23.332); // 23.33
numberUtils.cutDecimal(23.33283, 3); // 23.332
```

### API

#### cutDecimal(data, digit?)

截断小数位数。

##### data

Type: `number`

原始值。

##### digit

Type: `number`
Default: 2
截断的位数。

## fixContinuousNumber

生成连续的整数数组。

```js
import { numberUtils } from '@linzb93/utils';

numberUtils.fixContinuousNumber(5); // ['0', '1', '2', '3', '4', '5']

numberUtils.fixContinuousNumber({
    start: 2,
    step: 2,
    max: 6,
    useFix0: true
}); // ['02', '04', '06']

```

### API

#### fixContinuousNumber(max)

##### max

Type: `number`

最大值。列表从0开始生成，步长为1。

#### fixContinuousNumber(options)

##### options.max

Type: `number`

最大值。

##### options.start

Type: `number`

Default: 1

起始值。

##### options.step

Type: `number`

Default: 1

步长。

##### options.useFix0

Type: `boolean`

Default: false

是否补0。


## isNumberHasMoreThan2Decimal

判断一个数是否有超过2位小数

```js
isNumberHasMoreThan2Decimal(23.34); // false

isNumberHasMoreThan2Decimal(23.223); // true
```
