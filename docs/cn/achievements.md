# 成就

成就是用来奖励达到了某个目标的玩家的一种方式，你也可以给成就附带某些奖励。

如果你想要制作全局成就，那就把它们放在一个 "side" layer 里，这个 layer 的 row 应该被设置为 "side"。

一些关于成就以及成就奖励的有用的函数：

- hasAchievement(layer, id): 检测玩家是否有指定成就
- achievementEffect(layer, id): 返回指定成就的 effect

成就应该写成这个样子：

```js
achievements: {
    11: {
        name: "Blah",
        more features
    },
    etc
}
```

通常，一个成就应该有一个 id，这个 id 同样指明了成就的位置，就像升级里的 id 那样。

每个成就可以有这些特性：

- name: **可选**。在成就上方显示的文本，同时也是唯一的文本，可以使用函数来达成动态文本的效果。可以使用 HTML。

- done(): 一个返回该成就是否被完成的函数。

- tooltip: 当悬浮在成就上时显示，应当包含其描述与奖励，可以使用函数，可以使用 HTML，也可以设置为 "" 来将此 tooltip 禁用。

- effect(): **可选**。计量此成就提供的增益效果的函数，可以返回数值，也可以返回一个包含多个数值的对象。

- unlocked(): **可选**。返回一个 Boolean 来指明此成就是否可见，默认可见。

- onComplete() - **可选**。当成就完成时，这个函数会被调用。

- image: **可选**。从指定的地址加载这个成就的图片。

- style: **可选**。以对象的格式，设置此成就的 css。

- textStyle: **可选**。以对象的格式，设置此成就的**文本**的 css。

- layer: **自动**。与所在 layer 的名字相同，所以你可以写类似于 `player[this.layer].points` 的代码。

- id: **自动**。这个成就的 id，在这个例子中是 11。

- goalTooltip: **可选，过时**。与 tooltip 相同，不过是在成就未完成时使用。

- doneTooltip: **可选，过时**。与 tooltip 相同，不过是在成就已完成时使用。

在 layer 中设置 `achievementsPopups: false` 可以禁止完成成就的弹出提示。
