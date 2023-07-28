# layer 详解

这是一个相对较小的包含很少特性的 layer。大部分的东西都需要额外的特性。

```js
addLayer("p", {
    startData() { return {                  // startData 是一个返回玩家初始数据的函数
        unlocked: true,                     // 你可以添加更多的变量，这会成为你的 layer 的变量
        points: new Decimal(0),             // "points" 是这一个 layer 资源的内部名
    }},

    color: "#4BDC13",                       // 这一 layer 的颜色，会影响很多东西
    resource: "prestige points",            // 这一 layer 主要声望点的名字
    row: 0,                                 // 这一 layer 所处的行 (0 是第一行)

    baseResource: "points",                 // 获取这一 layer 主要声望点所需要的资源名
    baseAmount() { return player.points },  // 一个返回当前 layer 基本资源量的函数

    requires: new Decimal(10),              // 获取第一个这一 layer 声望点所需资源数量
                                            // 同样是解锁这一 layer 所需的资源数量

    type: "normal",                         // 定义这一 layer 声望点获取公式
    exponent: 0.5,                          // "normal" 获取到的是 (currency^exponent)

    gainMult() {                            // 返回对于这一 layer 声望点获取增益（乘数）
        return new Decimal(1)               // 升级或其他地方获取到的乘数因子，在这里生效
    },
    gainExp() {                             // 返回对于这一 layer 声望点获取增益（指数）
        return new Decimal(1)
    },

    layerShown() { return true },          // 返回一个 Boolean，表示这个 layer 的节点是否出现在树上

    upgrades: {
        // 参考升级文档
    },
})
```
