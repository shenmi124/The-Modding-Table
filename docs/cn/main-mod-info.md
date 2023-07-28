# mod.js

大部分不属于 layer 的数据都需要在 [mod.js](/js/mod.js) 中修改。
[mod.js](/js/mod.js) 中的东西通常不会被更新修改，除非添加新的东西。

我们把它拆开，看看它都有什么：

- modInfo 包含了我们这个 mod 的大部分参数。这包括:
    - name: mod 的名字。
    - id: mod 的 id，这与存档有关，所以需要选择一个独特的 id，并且不要在中途改动。
    - author: 作者的名字，会在 info 标签页显示。
    - pointsName: 决定了主要货币（默认是 `points`）的显示名，不会影响代码。
    - modFiles: 这个 mod 所需要加载的文件地址的列表。
    
    - discordName, discordLink: 如果你有一个 discord 群组或者其他什么东西，可以放在这里。

        "discordName" 是文本，"discordLink" 是一个邀请连接。如果你要用 discord 话，记得把邀请连接设为永不过期。

    - offlineLimit: 玩家最长能积累的离线时间，多余的离线时间会被扔掉。

        这个选项十分有用，很多 TMT mod 是节奏较快的，如果离线时间过长就会破坏平衡。这也同样是为什么建议开发者测试游戏时关闭离线时间的原因。

    - initialStartPoints: 一个玩家开始新游戏时应当拥有的点数数量。

- VERSION 用于描述 mod 的版本，包含：
    - num: 当前版本号，在树的右上角显示。
    - name: 版本名，在版本号周围显示。

- changelog 是一段 HTML 文本，用于展示更新记录。

- doNotCallTheseFunctionsEveryTick 在你增加一个标准之外的功能时非常重要。TMT 会在每个 Tick 调用 "layers" 中的所有函数来储存结果，除非你标记了它不应该这样做。标准内的功能都是完好的，没有必要特殊设置，但是标准外的功能需要在这里设置一下。

```js
// (这只是个例子，标准内的功能已经被处理好了)
var doNotCallTheseFunctionsEveryTick = ["doReset", "buy", "onPurchase", "blowUpEverything"]
```

- getStartPoints(): 在玩家重置后拥有多少点数，应当是一个 Decimal。

- canGenPoints(): 返回 Boolean，用来标记点数是否应当自动产生。

- getPointGen(): 计算每秒获得的点数，影响这个数值的升级应该在这里修改结果。

- addedPlayerData(): 返回所有非 layer 数据，用于保存你想要的这样的数据。

```js
function addedPlayerData() { return {
	weather: "Yes",
	happiness: new Decimal(72),
}}
```

- displayThings: 一个函数数组，每个函数返回一个支持 HTML 的字符串，每个非空字符串会在树页面的顶部单独成为一行

- isEndgame(): 用于检测玩家是否通关。

不那么重要的东西

- backgroundStyle: 一个 CSS 对象，指明游戏的背景格式。

- maxTickLength(): 一个 Tick 最多需要多长时间。

- fixOldSave(): 用来将旧存档转移到新存档。