# Bars

Bars 允许你用更直观的方式显示数据，例如生命值条、进度条等。

Bars 和其他的**大**特性定义起来差不太多：

```js
bars: {
    bigBar: {
        direction: RIGHT,
        width: 200,
        height: 50,
        progress() { return 0 },
        etc
    },
    etc
}
```

特性:

- direction: UP, DOWN, LEFT, 或 RIGHT (不是字符串哦)。定义 Bar 的填充方向，例如 RIGHT 就是从左向右填充。

- width, height: Bar 占用的宽度和高度（px），但是不能带单位。

- progress(): 进度条的填充程度，从 0 到 1。
    (即使超过 1 也没什么关系，支持 Decimal)

- display(): **可选**。返回在进度条上的文字。可以使用 HTML。

- unlocked(): **可选**。返回一个 Boolean 表示 Bar 是否显示，默认是显示。

- baseStyle, fillStyle, borderStyle, textStyle: **可选**。使用对象格式，控制 css。

- layer: **自动**。这与其所在的 layer 名相同，所以你可以使用类似于 `player[this.layer].points` 的代码。

- id: **自动**。该 Bar 所属于的键，在给出的示例中是 "bigBar"。


- instant: **非常可选**。若为真，则进度条会在更新时立刻跳动，而不是进行一段动画。有利于减少性能消耗。