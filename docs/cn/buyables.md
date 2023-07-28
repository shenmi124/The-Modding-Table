# buyable

buyable 通常是可以多次购买的价格增长物品，带有可选的按钮，并且可以买入和卖出。

已购买的 buyable 数量是 `Decimal`。 

有关 buyable 与其增益的有用的函数:

- getBuyableAmount(layer, id): 获取玩家已购买的指定 buyable 数量
- addBuyables(layer, id, amount): 增加 amount 个指定 buyable
- setBuyableAmount(layer, id, amount): 设置指定 buyable 数量为 amount
- buyableEffect(layer, id): 返回由指定 buyable 提供的 effect

buyable 应当如此编写：

```js
buyables: {
    11: {
        cost(x) { return new Decimal(1).mul(x) },
        display() { return "Blah" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        etc
    },
    etc
}
```

特性：

- title: **可选**。在 buyable 的顶端显示，可以使用函数来实现动态文本。

- cost(): 下一次购买的价格，有一个可选的参数 x，表示第 x + 1 次购买的加个(x 是一个 `Decimal`)。
    如果需要多种货币，可以返回一个对象
                    
- effect(): **可选**。返回基于当前 buyable 数量提供的增益，有一个可选的参数 x，表示 buyable 的数量是 x。 
    如果有多个增益的话，也可以返回一个对象。

- display(): 在 title 之后应当显示的所有内容，包括描述、已有数量、价格之类的，可以使用 HTML。

- unlocked(): **可选**。返回一个 Boolean，表示这个 buyable 是否可见。默认可见。

- canAfford(): 返回一个 Boolean，表示玩家是否可以购买一个此 buyable 。

- buy(): 实现玩家购买一个 buyable 的函数，包括扣钱。

- buyMax(): **可选**。实现玩家购买最大 buyable 的方法。

- style: **可选**。以对象的格式，控制此 buyable 的 css。
        
- purchaseLimit: **可选**。此 buyable 的上限，默认为无上限。

- marked: **可选** 如果是 "true"，会在 buyable 的角落里出现一个星号，也可以是图片的 url。

- tooltip: **可选**. 给 buyable 增加一个鼠标悬浮时出现的 tooltip，可以使用 HTML。

- layer: **自动**。与所在的 layer 的名字相同，所以你可以使用 `player[this.layer].points` 这样的代码。

- id: **自动**。此 buyable 的 id，在这个例子中是 "11"。

卖一个/卖全部：

添加一个 `sellOne` 或 `sellAll` 函数会在 buyable 下面，功能是一样的，但是 卖一个 会在 卖全部 上面，也可以有其他的用处。

- sellOne/sellAll(): **可选**。当上述按钮被按下时调用这个函数，标准用法是减少 buyable 的数量然后退还货币。

- canSellOne/canSellAll(): **可选**。返回一个 Boolean，表示是否可以卖一个或者卖全部。


如果想要增加一个转生按钮或者其他类似的东西，在**主 buyable** 对象中添加 respecBuyables 函数（而不是在单个 buyable 中）。
你可以用这些函数： 

- respec(): **可选**。当转生按钮被按下以及确认后调用此函数。

- respecText: **可选**。在转生按钮上的文本。

- showRespec(): **可选**。返回一个 Boolean，表示是否显示转生按钮，在 respecBuyables 定义了的情况下默认为显示。

- respecMessage: **可选**。自定义的确认消息，替代原来的。



- branches: **可选**。这主要用于 buyable 树，具体使用方式与升级树相似。