事件循环：

线程的启动和退出

让线程不退出，一直循环等待任务并执行。






1. 浏览器中的进程。

渲染进程：处理HMTL、CSS、JS的执行。
渲染进程中有哪些线程： 主线程，js引擎线程、事件触发线程、渲染线程、定时器线程、请求线程

要注意线程 是可以随时开的。

主线程是一直在等待执行的。



2. 问题
Event Loop 对于浏览器而言的还是其他？ 是的 事件循环是浏览器的循环系统。

消息队列 

延迟执行队列

浏览器的渲染进程的主线程一直从消息队列中按照顺序取出任务并执行。消息队列中的任务有dom解析、样式计算、布局、js执行等。

这期间有个疑问点。就是线程的开发和关闭。



1. 初步解释浏览器的事件循环。
首先要说为什么会有事件循环。浏览器渲染进程的主线程在运行过程中需要能够接受除自己线程之外的其他新任务，因此它需要实时监听是否有新任务。这种实时监听是否有任务产生是使用循环去实现的，每一次的循环都会从消息队列中取出一个新任务，然后去执行，如果没有任务，就等待执行。主线程的所有任务都来这个自消息队列。关于消息队列，其他进程发给渲染进程的任务以及渲染进程其他线程产生的任务都会推送到这个消息队列。

题外话：怎么验证自己是否学到了？写总结，以及自己的理解，而且不要害怕自己的理解是错误的，因为这个理解过程是动态的，直到get到了正确的理解。