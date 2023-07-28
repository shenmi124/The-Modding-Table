# 自定义标签页布局

注意: 如果你在使用子标签页， `tabFormat` 有不同的用法，但格式是一样的。 [具体参见子标签页一节](subtabs-and-microtabs.md)

自定义标签页布局可以在 layer 中做到很多事情，尤其是与 sytle 一起使用的时候。

`tabFormat` 特性是一个数组，长这样：

```js
tabFormat: [
    "main-display",
    ["prestige-button"],
    "blank",
    ["display-text",
        function() { return 'I have ' + format(player.points) + ' pointy points!' },
        { "color": "red", "font-size": "32px", "font-family": "Comic Sans MS" }],
    "blank",
    ["toggle", ["c", "beep"]],
    "milestones",
    "blank",
    "blank",
    "upgrades"
]
```

这是一组组件，组件可以是一个名字，也可以是一个带有参数的数组。如果它是一个数组，第一个元素是组件的名字，第二个是要传递进去的数据，而第三个是可选的，表示其上 css（使用对象格式）。

这些是已有的组件，你也可以在 [components.js](/js/components.js) 中创建组件:

- display-text: 展示文本，可以使用 HTML，也可以写个函数。

- raw-html: 展示 HTML，可以使用函数。

- blank: 添加一块空白区域。默认情况下是 8px x 17px。如果只提供了一个参数，这个参数定义其高，如果提供了两个参数，第一个定义宽，第二个定义高。

- row: 横着显示组件，需要提供组件作为参数。

- column: 竖着显示组件，需要提供组件作为参数。、

- main-display: 显示此 layer 以及其提供的 effect 的组件。参数是其精度，也就是说可以显示小数。

- resource-display: 展示此 layer 所用的资源的文本, 也包括此 layer 最高/总计声望点。 (如果它们在此 layer 的 `startData` 中设置了).

- prestige-button: 声望按钮。

- text-input: 输入框，结果会被存储在 player[layer][argument] 中，argument 是此组件的参数。

- slider: 使用滑块的输入框，参数是一个三元数组 [name, min, max]。
    此值会被存储到 player[layer] 的名为 name 的变量中，而 min 和 max 是滑块的下限和上限。
    (不支持 Decimal)

- drop-down: 带下拉选单的输入框。参数是一个二元数组 [name, options]。
    此值会被存储到 player[layer] 的名为 name 的变量中，options 则是玩家可以选择的几个选项（使用字符串数组）。

- upgrades, milestones, challenges, achievements, buyables, clickables: 展示这个 layer 的 upgrades/challenges 之类的东西。参数是可选的，并且是一个此组件应当包含的行的列表（如果包含的行不是所有行的话）。

- microtabs: 展示一些 microtabs，参数是这些 microtab 在其特性中定义的名字。

- bar: 展示一个 bar，参数是这个 bar 特性中的 id。

- infobox: 展示一个 infobox，参数是这个 infobox 特性中的 id。

- tree: 展示一棵树。参数是一个包含有树上节点名字的数组（先行，后列）。
    [这里有更多关于树布局的信息](trees-and-tree-customization.md)

- upgrade-tree, buyable-tree, clickable-tree: 展示一个此 layer 中的 upgrades/buyables/clickables 树。参数是包含 upgrade 或其他东西的 id 的数组（先行后列）。一棵这样的树只能有一种类型的东西。

- toggle: 一个控制 Boolean 值的按钮。参数是一个二元数组，第一元指定 layer，第二元指定变量名。指定的 layer 会影响此组件的颜色。

- grid: 展示这个 layer 中由 gridable 组成的 grid。如果你需要不止一个 grid，用 layer proxy。参数是可选的，并且是一个此组件应当包含的行的列表（如果包含的行不是所有行的话）。 

- layer-proxy: 允许你使用来自其他 layer 的组件。参数是一个二元数组，`[layer, data]`，包含另外的那个 layer 的 id，以及用于展示组件的 tabFormat。
    (注意: 你不能在 layer proxy 中使用 microtab)


剩下的都是子组件，它们和其他组件差不多，不过一般依赖于其他组件存在

- upgrade, milestone, challenge, buyable, clickable, achievement, gridable: 一个升级、里程碑或者什么的，参数是其 id。如果你想要让升级在不同子标签页中不同，这是有用的。

- respec-button, master-button: 分别用于 buyable 和 clickable 的 respec、master 按钮。

- sell-one, sell-all: 用于 buyable 的 "sell one" 和 "sell all" 按钮。参数是 buyable 的 id。
