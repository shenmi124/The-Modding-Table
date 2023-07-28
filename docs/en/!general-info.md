# The-Modding-Tree

Making a game in The Modding Tree mostly involves defining parameters or functions on objects. If you aren't following the [getting started guide](tutorials/getting-started.md), you should start by [setting up your basic mod info](main-mod-info.md) in [mod.js](/js/mod.js). It's important to set a mod id to ensure saving works properly.

Beyond that, the main way to add content is through creating layers. You can add new layers by calling `addLayer(layername, layerdata)`. There is an example of a basic layer in [layers.js](/js/layers.js). It is just an example and can be freely deleted. You can also use it as a reference or a base for your own layers. 

You can test your mod by opening the [index.html](/index.html) file in your browser.

Most of the time, you won't need to dive deep into the code to create things, but you still can if you really want to, for example to add new Vue components in [components.js](/js/components.js).

The Modding Tree uses [break\_eternity.js](https://github.com/Patashu/break_eternity.js) to store large values. This means that many numbers are `Decimal` objects, and must be treated differently. For example, you have to use `new Decimal(x)` to create a `Decimal` value instead of a plain number (x can be a number or a string for larger values). You perform operations on them by calling functions. e.g, instead of `x = x + y`, use `x = x.add(y)`. Keep in mind this also applies to comparison operators, which should be replaced with calling the `.gt`, `.gte`, `.lt`, `.lte`, `.eq`, and `.neq` functions. See the [break\_eternity.js](https://github.com/Patashu/break_eternity.js) docs for more details on working with `Decimal` values.

Almost all values can be either a constant value, or a dynamic value. Dynamic values are defined by putting a function that returns what the value should be at any given time.

All display text can use basic HTML elements (But you can't use most Vue features there).

While reading this documentation, the following key will be used when describing features:

- No label: This is required and the game may crash if it isn't included.
- **sometimes required**: This is may be required, depending on other things in the layer.
- **optional**: You can leave this out if you don't intend to use that feature for the layer.
- **assigned automagically**: This value will be set automatically and override any value you set.
- **deprecated**: This feature is not recommended to be used, because newer features are able to achieve the same thing in a better, easier way.

## Table of Contents



### General

- [Getting Started](tutorials/getting-started.md): A guide to getting your own copy of the code set up with Github Desktop.
- [Making a Mod](tutorials/making-a-mod.md): A guide to using TMT to make a basic mod.
- [Main mod info](main-mod-info.md): How to set up general things for your mod in [mod.js](/js/mod.js).
- [Basic layer breakdown](basic-layer-breakdown.md): Breaking down the components of a layer with minimal features.
- [Layer features](layer-features.md): Explanations of all of the different properties that you can give a layer.
- [Custom Tab Layouts](custom-tab-layouts.md): An optional way to give your tabs a different layout. You can even create entirely new components to use.
- [Custom Game Layouts](trees-and-tree-customization.md): You can get rid of the tree tab, add buttons and other things to the tree,
    or even customize the tab's layout like a layer tab.
- [Updating TMT](tutorials/updating-tmt.md): Using Github Desktop to update your mod's version of TMT.
- [Other Things](other.md): Other neat features that TMT has that don't merit their own page.

### Common components

- [Upgrades](upgrades.md): How to create upgrades for a layer.
- [Milestones](milestones.md): How to create milestones for a layer.
- [Buyables](buyables.md): Create rebuyable upgrades for your layer (with the option to make them respec-able). Can be used to make Enhancers or Space Buildings, for example.
- [Clickables](clickables.md): A more generalized variant of buyables, for any kind of thing that is sometimes clickable. Between these and Buyables, you can do just about anything.
- [Achievements](achievements.md): How to create achievements for a layer (or for the whole game).

### Other components and features

- [Challenges](challenges.md): How to create challenges for a layer.
- [Bars](bars.md): Display some information as a progress bar, gauge, or similar. They are highly customizable, and can be horizontal and vertical as well.
- [Subtabs and Microtabs](subtabs-and-microtabs.md): Create subtabs for your tabs, as well as "microtab" components that you can put inside the tabs.
                        You can even use them to embed a layer inside another layer!
- [Grids](grids.md): Create a group buttons that behave the same, but have their own data. Good for map tiles, an inventory grid, and more!
- [Infoboxes](infoboxes.md): Boxes containing text that can be shown or hidden.
- [Trees](trees-and-tree-customization.md): Make your own trees. You can make non-layer button nodes too!
- [Particle system](particles.md): Can be used to create particles for visual effects, but also interactable things like golden cookies or collectables.
