对于浏览器和js而言，setTimeout是 浏览器的一个api，并不是js的。

一. setTimeout执行的步骤
第一步： 根据setTimeout中的回调函数，创建一个回调任务
具体细节如下：

```js
class DelayTask {
  constructor(cbf, startTime, delayTime) {
    // ...
  }
}

const timerTask = new DelayTask()
timerTask.cbf = 'showName'
timerTask.starTime = getCurrentTime()
timerTask.delay_time = 200
```

第二歩： 把这个任务推入到延迟队列中。

第三歩： 触发延迟队列。

触发条件： 需要执行完正常消息队列中的所有任务，才会去执行延迟队列里的任务。然后计算延迟队列里的任务是否到期了，到期就执行，直到所有延迟队列里的到期任务都执行完毕，才会进入下一次循环。
根据触发条件会产生几种情况
1. 定时器的任务按照预想时间执行
```js
function bar() {
    console.log('bar')
}
function foo() {
  setTimeout(bar, 100);
  // 如果这段代码执行耗时为10ms
  for (let i = 0; i < 100; i++) {
    console.log(i)
  }
}
foo()
```
主任务队列的任务执行所花费的时间为10ms，然后开始执行延迟队列里的任务，此时过去了10ms，所以还需要等待90ms才会执行定时器任务。最终定时器里的任务所花费的时间100ms，和预设时间一样

2. 定时器不会按照预想时间执行
```js
function bar() {
    console.log('bar')
}
function foo() {
  setTimeout(bar, 1000);
  // 如果这段代码执行耗时为2s
  for (let i = 0; i < 50000; i++) {
    console.log(i)
  }
}
foo()
```
此时主任务队列的执行花费了2s，定时器中的回调任务其实是两秒后才执行。

3. 4ms 问题
定时器嵌套执行超过5次，那么之后的定时器任务会的延迟时间小于4ms时，延迟时间会被设置为4ms。

4. 延迟的最大时长：2147483647
因为chrome是以32个bit来存延时值的，32bit能存的最大数字为2147483647， 如果延时值超过这个数，会被当成0处理。
```js
function showName(){
  console.log("极客时间")
}
var timerID = setTimeout(showName,2147483648);//会被理解调用执行
```

5. 在所有到期的定时任务之后，没有到期是否会执行，答案是不会
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100px;
      height: 100px;
      background: red;
    }
    .animation-fade {
      display: block;
        animation-name: fade;
        animation-duration: .8s;
        animation-timing-function: linear
    }
    @keyframes fade {
      0% {
        opacity: 0;
        transform: scale(0)
    }

    100% {
        opacity: 1;
        transform: scale(1)
    }
    }
  </style>
</head>
<body>
  <button onclick="test1()">点击执行foo</button>
  <button onclick="test2()">插入一个点击任务</button>
  <div id="box" class="box"></div>
</body>

<script>
  function test1() {
    foo()
  }

  function test2() {
    console.log('test2')
  }

  function bar() {
    console.log('bar')
  }

  function foo() {
    setTimeout(bar, 100);
    setTimeout(bar, 50000);
    for (let i = 0; i < 1000; i++) {
      console.log(i)
    }
  }
</script>
</html>
```

第四歩： 取消定时器的任务
用setTimeout设置定时器后，js引擎会返回一个定时器的标识id，可以通过这个id进行删除定时器的任务。


盲点：箭头函数解决setTimeout的this指向问题。


总结： 浏览器的渲染进程中有一个延迟队列，在执行setTimeout时，会把setTimeout中的回调任务放到延迟队列中。当浏览器根据其事件循环机制执行完正常消息队列的任务后，再去从去延迟队列里计算哪些任务到期了，直到所有的到期任务执行之后，才进入下一次的事件循环。