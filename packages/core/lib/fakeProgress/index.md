# fakeProgress

当服务端没有返回进度条时，可以用`fakeProgress`生成假的进度条。

```js
import { fakeProgress } from '@linzb93/utils';

const obs$ = fakeProgress(pEvent, 5); // pEvent是Promise异步事件。第二个参数是预计执行时间，单位：秒。

obs$.subscribe(progress => {
    console.log(progress);
});

obs$.then(() => {
    console.log('已完成');
});

obs$.catch(() => {
    console.log('报错');
})

```