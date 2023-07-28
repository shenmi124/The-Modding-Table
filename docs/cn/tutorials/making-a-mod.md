# 制作 mod

我们默认你已经完全理解了 [getting started guide](getting-started.md)。 接下来我们会带你了解一些制作 mod 的基本信息。

## 设置 mod 信息

打开 mod.js。这里你可以为你的 mod 写入全局数据（相对于每个 layer 的数据）。现在你可以在 modInfo 中设置 mod 名和作者，以及点数的名字（但它在代码中依然是 `player.points`） **你需要确保你设置了 mod id**。

小建议: 测试 mod 时应在游戏中关闭离线进度选项，并且不要使游戏在你不需要的时候运行。这可能会避免产生意料外的过长时间间隔。

## 制作一个 layer

好消息是， layers.js 中已经写入了一个基本 layer，其中有一些多余的东西，但我们只需要关注它的实现方式。

最关键的东西在第一行，也就是 `addLayer("p", {`。这是你创建一个新 layer 的方式。 "p" 则是 layer 的 id，用于在 TMT 中标记这个 layer。你可以修改这个 id，但你同时也需要修改其他对于 "p" 的引用代码。

在技术层面上，一个 layer 是一个包含了复杂功能的对象。为了得到一些有趣的功能，你可以这么做：
    - name: 这个 layer 的名字
    - color: 这个 layer 的颜色
    - symbol: 这个 layer 的节点上显示的字
    - resource: 这个 layer 的主要资源

刷新，你应该可以看见你新定义的 layer。目前来讲，你可以忽略 layer 的其他功能，他们大部分都是用来影响声望点的计算的。

现在，我们来制作一个升级。

## 升级

升级是 TMT 的一个重要功能，它们大部分以同样的原理运作。这包括了里程碑、可购买项等一些东西。为了给你的 layer 添加一个升级，在其他所有功能后写一个**英文**逗号，然后写：

```js
    upgrades: {

    },
```

"upgrades" 是一个对象，包含了所有的升级。每个升级需要一个 id，id 指明了它的位置。

例如，id 为 "12" 的升级会出现在第一行第二列。

那么，我们来做第一个升级，在 `upgrades` 的左大括号的下一行插入：

```js
        11: {

        },
```

刷新，这个升级会出现在你的 layer 标签页中。然而它现在是空的，我们需要完善它的功能。在其中插入：

```js
    name: "随便什么名字",
    description: "加倍点数获取",
    cost: new Decimal(1),
```

刷新，这个升级会以完整的格式出现。但是它不会有任何效果。为了实现增益，我们需要去计算的地方修改公式。在这个例子下，点数获取是 getPointGen，它被定义在 mod.js 里，打开这个文件。

Decimal 的详细介绍在 [!general-info.md](/documentation/!general-info.md) 中，你需要知道你不能使用 `+-/*` 处理它，而应该是用类似于 `x = x.add(y)` 的形式。

现在，我们需要检测玩家是否有这个升级，并给与增益效果。把这一行插入到函数定义和return之间：
```js
if (hasUpgrade('p', 11)) gain = gain.times(2)
```

刷新，现在你应该会以每秒 2 点的速度获得点数。

## 升级的升级

你已经会做简单的升级了，接下来我们要做一个基于声望点加成点数获取的升级。

复制粘贴是程序员的基本功，所以我们将升级 `11` 复制到后面。把 `11` 改成 `12`，然后按照你的意愿修改 name 和 description，然后 cost 设置为 2。现在，我们来添加一个 effect。effect 是计算从一个升级中得到的收益的函数，effectDisplay 则允许你展示这个收益. 

```js
    effect() {
        return player[this.layer].points.add(1).pow(0.5)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // 给这个 effect 一个格式
```

this.layer 和 this.id 会被自动设置为这个升级所属于的 layer, 以及这个升级的 id（在这个例子中，是 12），这可以方便进行代码复用。你也能注意到的是， `player[this.layer].points` 会获取到这一个 layer 的声望点。

在 mod.js 中你刚才添加的那一行之后，写入： 

```js
    if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
```

刷新后可以看到它的效果。我们来做最后一个升级，使点数加成声望点获取。复制刚才那个升级，将 id 标记为 13，顺便把 name 和 description 改了，再将 cost 设为 5（这个数值易于进行开发调试）。effectDisplay 是可以复用的，所以我们只需要写一个 effect：

```js
    effect() {
        return player.points.add(1).pow(0.15)
    },
```

为了实现我们要的效果，我们需要修改 gainMult，这个函数控制了当前 layer 声望获取的倍数。

```js
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
```

刷新后查看效果。