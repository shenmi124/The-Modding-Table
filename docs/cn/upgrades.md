# 升级

为了方便开发者，这里有几个函数：

- hasUpgrade(layer, id): 返回玩家是否拥有指定的升级
- upgradeEffect(layer, id): 返回指定升级当前的 effect
- buyUpgrade(layer, id): 如果买得起，购买指定升级

提示: 基础的点数获取在 [mod.js](/js/mod.js) 的 "getPointGen" 中定义。

升级按照以下格式编写:

```js
upgrades: {
    11: {
        description: "Blah",
        cost: new Decimal(100),
        etc
    },
    etc
}
```

通常来讲，升级应该有一个 id，这个 id 的第一个数字指明了它所在的行，第二个数字指明了它所在的列。

每个升级可以有这些特性:

- title: **可选**。在顶部以一个较大的字体显示，可以用函数来实现动态文本的效果，可以使用 HTML。

- description: 对升级效果的描述， *如果你使用了 effect，在这里你也同样需要把 effect 加进来*。 同样可以使用函数与 HTML。

- effect(): **可选**。一个计算并返回来自升级的增益效果的函数，结果可以是一个数，也可以是包含多个数的对象。

- effectDisplay(): **可选**。将 effect 转化为文本的函数，默认为空字符串，可以使用 HTML。

- fullDisplay(): **覆写**。覆写名字与描述，你可以完全自定义它的文本。可以使用 HTML。

- cost: **一定程度上可选**。升级需要的货币数量，默认情况下货币使用当前 layer 的主要货币。

- unlocked(): **可选**。返回一个决定当前升级是否展示出来的 Boolean，默认展示。

- onPurchase(): **可选**。当这个升级被支付时调用。

- style: **可选**。用一个对象来描述这个升级的 css。

- tooltip: **可选**。给升级添加一个 tooltip，当鼠标悬浮在升级上时显示。可以使用 HTML。

- layer: **自动**。与这一 layer 的名字相同，因此你可以用类似于 `player[this.layer].points` 一样的代码。

- id: **自动**。与这一升级的 id 相同。

默认情况下，升级会使用当前 layer 的主要货币，你也可以通过下面的方式修改。

- currencyDisplayName: **可选**。这个升级需要的货币的显示名

- currencyInternalName: **可选**。升级所需货币的内部名。

- currencyLayer: **可选**。所需货币所在的 layer 的内部名。如果它不属于某个 layer，省略。如果不是直接存储在 layer 中，使用下一个特性。

- currencyLocation: **可选**。如果你需要的货币是一个 layer 内的数据，比如一个可重复购买项，你可以用这个方式访问。这个函数需要返回在 "player" 中包含这个值的对象。例如 `player[this.layer].buyables`。

如果你需要更复杂的功能，比如同时消耗两种货币，你需要重载支付系统。此外，如果你不使用 cost，你需要覆写 fullDisplay()。

- canAfford(): **覆写**。用于计算是否可以购买此升级。如果你使用了 cost，那么最终结果是此函数与 cost 检查加在一起。

- pay(): **覆写**，当购买此升级时，调用此函数来消耗货币。


- branches: **可选**。这个功能主要用于升级类树。需要一个升级 id 数组。会有直线从这个升级连向数组中的升级。或者，数组中的元素也可以是一个二元数组，第二个元素可以是一个指明了 HEX 颜色代码的字符串，或者是一个 1-3 之间的数字（取决于主题颜色）。你也可以用三元数组，此时第三元会作为直线的宽度。