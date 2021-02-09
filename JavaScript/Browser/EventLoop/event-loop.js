// 用js模拟渲染进程主线程是如何运作的，来自极客时间

/*
 ** 1. 执行已经安排好的任务
 */

function MainThread() {
  const num1 = 1 + 2
  const num2 = 7 * 8
  const num3 = 100 / 5
  console.log(num1, num2, num3)
}

MainThread()

// 总结： 线程执行预先安排好的任务，不能添加新任务。
// 比喻：老板给你了几个任务，你拿去完成，然后此时断绝了所有的联系方式。

/*
 ** 2. 在线程运行过程中添加新的任务
 */

function GetInput(num) {
  const inputNumber = num
  return inputNumber
}

function MainThread() {
  for (;;) {
    const firstNum = GetInput(1)
    const secondNum = GetInput(2)
    const resultNum= firstNum + secondNum
    console.log('最终计算的值为' + resultNum)
  }
}

// 涉及到的盲点： 线程关闭的方式（疑问）：（1）写一个死循环，让线程有事干，不让线程关闭  （2）还是说线程是可以一直打开，手动去关闭的。 线程的激活和挂起

// 总结：引入事件循环的目的是为让线程可以接受新的任务并执行。如果没有任务就等待执行，有任务就开始执行。
// 比喻：老板给你了几个任务，你拿去完成，然后此时打开了微信，保持微信实时在线。对应到浏览器，老板就是渲染进程，你就是主线程，此时你只接受老板直接安排的任务。

/*
 ** 3. 主线程接受其他线程的任务
 */

class TaskQueue {
  constructor() {
    // ...
  }
  takeTask() {}
  pushTask() {}
}

const ProcessTask = function () {}

function MainThread() {
  for (;;) {
    const task = taskQueue.taskTask()
    ProcessTask(task)
  }
}

// 涉及到的盲点：一个页面的执行过程是什么样子的以及都是在哪个线程中执行的。
// 总结： 引入消息队列或者任务队列，主线程在执行的过程中一直从消息队列中取出任务并执行。
// 比喻：在工作的过程中，你除了老板之外还会收到其他同事的任务，那么其他同事的任务，都是依次发到你的微信，你每次都是根据顺序去完成。

/*
 ** 4. 主线程接受其他进程的任务
 */

// 总结： 其他进程可以发给渲染进程任务，渲染进程通过其IO线程将其他进程发来的消息组装成任务，推到消息队列，然后等待主线程的执行。

