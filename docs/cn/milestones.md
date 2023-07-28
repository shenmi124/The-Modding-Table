# 里程碑

当玩家达成一定目标时，可以用里程碑进行奖励，里程碑也可以附带额外的效果，里程碑应该如此编写：

```js
milestones: {
    0: {
        requirementDescription: "123 waffles",
        effectDescription: "blah",
        done() { return player.w.points.gte(123) }
    }
    etc
}
```

你可以使用 `hasMilestone(layer, id)` 来获取玩家是否完成了指定的里程碑

里程碑特性：

- requirementDescription: 用于描述此里程碑解锁条件的文本，建议使用 "total"。可以使用函数来实现动态文本，也可以使用 HTML。

- effectDescription: 一个描述该里程碑的效果的文本，*你需要在其他地方实现这个奖励效果*。可以使用函数与 HTML。

- done(): 返回一个 Boolean，表示里程碑是否完成。

- onComplete() - **可选**。在里程碑完成后调用此函数。

- toggles: **可选**。开关，可以通过这个设置变量，需要提供一个数组，每个元素是一个二元数组，第一元是变量所在的 layer，第二元是变量的内部名称，例如 [["b", "auto"], ["g", "auto"]]

   **提示:** 如果里程碑被锁定，不会重设之前设置过的变量，因此你需要再次对其进行检测。

- style: **可选**。以对象的格式，对里程碑应用 css。

- unlocked(): **可选**。返回一个 Boolean，表示里程碑是否显示，默认是显示。

- tooltip: **可选**。为里程碑添加一个鼠标悬浮可见的 tooltip，可以使用 HTML。默认为无。

- layer: **自动**。与当前 layer 的名字保持一致。

- id: **自动**。与该里程碑的 id 保持一致，例如例子中是 "0"。

在 layer 中 `milestonePopups: false` 可以阻止里程碑的弹出式提示。
