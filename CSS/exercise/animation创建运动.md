当元素的position属性会指定时，可以利用top、right、left、bottom创建运动。

```html
<style>
  div {
    height: 40px;
    width: 70%;
    background: black;
    margin: 50px auto;
    border-radius: 5px;
    position: relative;
  }

#rect {
  animation-name: rainbow;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}

@keyframes rainbow {
  0% {
    background-color: blue;
    top: 0px;
    left: 0;
  }
  50% {
    background-color: green;
    top: 50px;
    left: 100px;
  }
  100% {
    background-color: yellow;
    top: 0px;
    left: -100px;
  }
}
</style>

<div id="rect"></div>
```