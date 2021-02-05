margin: auto 的意思为元素外边距交给浏览器进行计算，如果两侧都是auto，那么会评分剩余的空间。如果一侧是定值，那么另一侧的值为剩余空间大小。

这个例子中son元素的position为static，为正常流。
```html
<div class="father">
  <div class="son"></div>
</div>

<style>
  .father {
    position: relative;
    width: 500px;
    height: 500px;
    background: blue;
  }

  .son {
    margin: auto;
    width: 200px;
    height: 200px;
    background: yellowgreen;
  }
</style>
```