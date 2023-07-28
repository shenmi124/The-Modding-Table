# 挑战

挑战有完全自定义的获胜条件。这些函数可以帮助你开发挑战：

- inChallenge(layer, id): 判断玩家是否在指定的挑战中（或是指定 layer 其他拥有此挑战的效果的挑战中(即 countsAs)）
- hasChallenge(layer, id): 判断玩家是否完成了指定的挑战
- challengeCompletions(layer, id): 获得玩家完成了几次指定的挑战
- maxedChallenge(layer, id): 判断玩家是否在完成了最多次数的指定挑战
- challengeEffect(layer, id): 返回指定挑战提供的 effect

挑战应该这样编写：

```js
challenges: {
    11: {
        name: "Ouch",
        challengeDescription: "description of ouchie",
        canComplete: function() {return player.points.gte(100)},
        etc
    },
    etc
}
```

一般来讲，挑战应该有一个 id，这个 id 的两个数字分别指明了挑战所处于的行和列。

每个挑战有这些特性：

- name: 挑战的名字，可以使用函数和 HTML。

- challengeDescription: 一段描述为什么挑战是挑战的文本，*你需要在别的地方实现这个效果*。可以使用函数和 HTML。

- goalDescription: 一段描述挑战目标的文本，可以使用函数和HTML。 (如果使用旧的目标系统的话，这里是可选的)

- canComplete(): 如果玩家满足了获胜条件，返回 true，如果返回了一个数字，则视作批量完成了挑战。 (如果使用旧的目标系统的话，这里是可选的)

- rewardDescription: 一段描述挑战奖励的文本，*你需要在别的地方实现这个效果*。可以使用函数和 HTML。

- rewardEffect(): **可选**。用于计算该成就能提供的 effect，可以是单个数字也可以是一个对象。

- rewardDisplay(): **可选**。返回带有自定义格式的 effect，默认行为是只使数字格式正确。

- fullDisplay(): **覆写**。允许你重载挑战中的所有文本，可以使用 HTML。

- unlocked(): **可选**。返回一个 Boolean，表示挑战是否可见。

- onComplete() - **可选**。当挑战第一次被完成时，调用此函数。

- onEnter() - **可选**。当进入挑战时，调用此函数。

- onExit() - **可选**。以任何方式退出挑战时，调用此函数。

- countsAs: **可选**。如果某个挑战是其他几个挑战的效果的混合，在这里用一个数组写入其他挑战的 id。当玩家开启这个挑战时，其他几个挑战也会生效。

- completionLimit: **可选**。挑战完成次数上限。

- style: **可选**。以对象的形式对挑战应用 css。

- marked: **可选**。如果为 true，在挑战的角落里显示一个星号。也可以设置为自定义的图片 url。默认情况下，当挑战完成次数达到上限时，显示这个星号。

- layer: **自动**。等同于所在 layer 的名。

- id: **自动**。等同于此挑战的 id，这个例子中是 "11"。



旧版目标系统是这样的：

- goal: **过时**。一个 Decimal，表示完成挑战需要多少货币。默认情况下使用基本货币。可以使用函数。

- currencyDisplayName: **过时**。用于显示的需求货币名。

- currencyInternalName: **过时**。需求货币的内部名。

- currencyLayer: **过时**。需求货币所在的 layer。如果其处于全局，留空。如果其不直接处于 layer 中，使用下一个特性。

- currencyLocation(): **过时**。若你所需的货币不直接存储在 layer 中，例如 buyable 的数量，你可以通过这个方式访问。这个函数应当返回 player 中包含指定货币的一个对象 (例如 `player[this.layer].buyables`)。

