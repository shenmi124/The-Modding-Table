# The-Modding-Tree

基本上来讲，使用 TMT 制作游戏只是修改几个参数或者函数的问题。如果你没有参考 [getting started guide](tutorials/getting-started.md)，那么你应该先在 [mod.js](/js/mod.js) 中 [设置 mod 的基本信息](main-mod-info.md)。为了保证正常存储，你需要合理的确定一个 id。

除那以外，游戏内容的核心是 layer。你可以通过调用 `addLayer(layername, layerdata)` 来创建一个新的 layer。在 [layers.js](/js/layers.js) 中有一个基本的 layer 的示例，你可以随意修改、删除这个示例。

在浏览器中打开 [index.html](/index.html) 可以进行调试。

大部分情况下，你的需求都不需要你对代码进行深入研究，不过这也并非禁止，例如你可以在 [components.js](/js/components.js) 中增加 vue 组件。

TMT 使用 [break\_eternity.js](https://github.com/Patashu/break_eternity.js) 来存储大数，所以很多数都是 `Decimal` 对象，必须被特殊对待。例如，你可以使用 `new Decimal(x)` 来创建一个 `Decimal` 值，而不是一个平凡的数 (x 可以是一个数，也可以是一个字符串)。对它们的操作需要调用函数，例如，你不能写 `x = x + y` 而应该写 `x = x.add(y)`。此外，大小比较也需要使用 `.gt`, `.gte`, `.lt`, `.lte`, `.eq` 以及 `.neq` 函数。在 [break\_eternity.js](https://github.com/Patashu/break_eternity.js) 文档中可以看到该如何处理 `Decimal`。

几乎所有值都既可以是定值也可以是动态的值。动态的值需要提供一个函数来给出每个具体时刻的值。

所有的文本都可以使用 HTML，但你不能在那些地方使用 vue。

在阅读这个文档的时候，这些标签会用来描述特性：

- 无标签: 这个特性是必须的，如果没有的话游戏会有可能崩溃。
- **重要**: 这个特性也许是必须的，取决于 layer 的其他部分。
- **可选**: 这个特性可有可无，如果你不需要，可以删掉。
- **自动**: 这个值会被自动设置，并且你设置的值也会被覆盖。
- **过时**: 这个特性已经过时了，有更好更简单的方法来完成同样的事情，所以不建议使用。

## 目录



### 全局

- [Getting Started](tutorials/getting-started.md): 指引你使用 Github Desktop 建立一个 TMT 项目。
- [Making a Mod](tutorials/making-a-mod.md): 指引你使用 TMT 制作一个非常基础的 mod。
- [Main mod info](main-mod-info.md): 指引你在 [mod.js](/js/mod.js) 中设置游戏信息。
- [Basic layer breakdown](basic-layer-breakdown.md): 将一个 layer 拆分成细小的组件。
- [Layer features](layer-features.md): 解释你可以给 layer 设置的所有参数。
- [Custom Tab Layouts](custom-tab-layouts.md): 一个可选的方式，来给你的标签页提供新的布局。
- [Custom Game Layouts](trees-and-tree-customization.md): 也许你厌倦了树形结构？
- [Updating TMT](tutorials/updating-tmt.md): 使用 Github Desktop 来更新你的 TMT 项目。
- [Other Things](other.md): 一些不值得其他页面包含的东西。

### 平凡组件

- [Upgrades](upgrades.md): 介绍如何给 layer 创建一个升级。
- [Milestones](milestones.md): 介绍如何给 layer 创建一个里程碑。
- [Buyables](buyables.md): 介绍如何给 layer 制作 buyable。
- [Clickables](clickables.md): 和 Buyables 类似，不过只要可以点击就属于这个范围。
- [Achievements](achievements.md): 给 layer 或者整个游戏创建成就。

### 其他组件与特性

- [Challenges](challenges.md): 如何为 layer 制作挑战。
- [Bars](bars.md): 以相当自由的方式制作进度条、仪表盘之类的东西。
- [Subtabs and Microtabs](subtabs-and-microtabs.md): 为标签页制作标签页，你可以用这个方式来制作子 layer。
- [Grids](grids.md): 将特性相近的按钮分组，让界面更好看。
- [Infoboxes](infoboxes.md): 信息盒子。
- [Trees](trees-and-tree-customization.md): 制作你自己的树，修改树的形态或是别的什么的。
- [Particle system](particles.md): 可以用来做特效，也可以用来做可以点击的气泡之类的东西。
