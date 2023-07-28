# 消息盒

消息盒有助于显示所谓的 "lore" 或者讲碎片式的故事，在解释复杂的事物上也有所帮助。

在默认的布局下，第一个消息盒会显示在标签页的最上端。

消息盒像其他**大**特性一样定义：

```js
infoboxes: {
    lore: {
        title: "foo",
        body() { return "bar" },
        etc
    },
    etc
}
```

特性:

- title: 在盒子上方显示的标题，可以使用函数来达到动态文本的效果。可以使用 HTML。

- body: 在盒子中显示的内容，其余与 title 相同。

- style, titleStyle, bodyStyle: **可选**。用对象的格式控制 css。

- unlocked(): **可选**。返回一个 Boolean，表示这个消息盒是否可见。

- layer: **自动**。与这一 layer 的名字相同，因此你可以用类似于 `player[this.layer].points` 一样的代码。

- id: **自动**。与这个消息盒的 id 相同，例如这里是 "lore"。