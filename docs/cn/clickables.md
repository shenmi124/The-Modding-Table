# Clickables

Clickable 是指的一类可以点击的项目，类似于 buyable，但范围更广。

作者说不要拿 clickable 做那种点一下就会有 buff 的东西，因为这非常恶心（？

在 clickable 和 buyable 之间有一些区别。一方面，buyable 的数据只以 Decimal 存储其数量，但 clickable 会存储一个可以为数字或字符串的 "state"。buyable 有一些额外的特性，而 clickable 的尺寸相对较小。

开发 clickable 时有用的函数：

- getClickableState(layer, id): 获取指定 clickable 当前的 state
- setClickableState(layer, id, state): 设置指定 clickable 的 state
- clickableEffect(layer, id): 获取指定 clickable 的 effect

一个 clickable 长这样：

```js
clickables: {
    11: {
        display() {return "Blah"},
        etc
    }
    etc
}
```

特性:

- title: **可选**。在 clickable 上以较大的字体展示。可以使用函数达到动态文本的效果。
                    
- effect(): **可选**。计算并返回由该 clickable 提供的增益效果的函数。可以返回一个数，也可以返回一个对象。

- display(): 返回在 title 之后应当显示的内容，可以使用 HTML。

- unlocked(): **可选**。返回此 clickable 是否可见，默认可见。

- canClick(): 返回此 clickable 是否可以点击。

- onClick(): 当 clickable 被点击时调用。

- onHold(): **可选**。当 clickable 被按住 0.25s 后，此函数以 20次/s 的速度被调用。

- style: **可选**。以对象的格式，对 clickable 应用 css。

- marked: **可选**。如果为 true，在 clickable 的角落里打一个星，也可以用 url 图片。

- tooltip: **可选**。给 clickable 一个鼠标悬浮时显示的 tooltip，可以使用 HTML，默认是空，如果是空则不显示 tooltip。

- layer: **自动**。与所在 layer 的名字保持一致。

- id: **自动**。与此 clickable 的 id 保持一致，此例子中为 "11"。

下面的几个特性可以让你在 clickable 下面做一个按钮，可以用来实现转生之类的东西。

- masterButtonPress(): **可选**。只要此函数被实现了，则会出现所述的按钮，点击按钮会调用此函数。

- masterButtonText: **可选**。显示在按钮上的字。

- showMasterButton(): **可选**。是否显示按钮，在 masterButtonPress() 函数被实现的情况下，默认为 true。



- branches: **可选**。可以制作 clickable 树，具体参考升级一节的 branches 文档。