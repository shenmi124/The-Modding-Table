# Custom tab layouts

Note: If you are using subtabs, `tabFormat` is used differently, but the same format is used for defining their layouts. [See here for more on subtabs](subtabs-and-microtabs.md).

Custom tab layouts can be used to do basically anything in a tab window, especially combined with the "style" layer feature. The `tabFormat` feature is an array of things, like this:

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

It is a list of components, which can be either just a name, or an array with arguments. If it's an array, the first item is the name of the component, the second is the data passed into it, and the third (optional) applies a CSS style to it with a "CSS object", where the keys are CSS attributes.

These are the existing components, but you can create more in [components.js](/js/components.js):

- display-text: Displays some text (can use basic HTML). The argument is the text to display. It can also be a function that returns updating text.

- display-image: Displays an image. The argument is the url of the image.

- h-line, v-line: Display a horizontal or vertical divider line, respectively.

- raw-html: Displays some basic HTML, can also be a function.

- blank: Adds empty space. The default dimensions are 8px x 17px. The argument changes the dimensions. If it's a single value (e.g. "20px"), that determines the height. If you have a pair of arguments, the first is width and the second is height.

- row: Display a list of components horizontally. The argument is an array of components in the tab layout format.

- column: Display a list of components vertically. The argument is an array of components in the tab layout format. This is useful to display columns within a row.

- main-display: The text that displays the main currency for the layer and its effects. The argument is the amount of precision to use, allowing it to display non-whole numbers.

- resource-display: The text that displays the currency that this layer is based on, as well as the best and/or total values for this layer's prestige currency (if they are put in `startData` for this layer).

- prestige-button: The button to reset for a currency in this layer.

- text-input: A text input box. The argument is the name of the variable in player[layer] that the input is for, player[layer][argument]
    (Works with strings, numbers, and Decimals!)

- slider: Lets the user input a value with a slider. The argument a 3-element array: [name, min, max].
    The name is the name of the variable in player[layer] that the input  is for, and min and max are the limits of the slider.
    (Does not work for Decimal values)

- drop-down: Lets the user input a value with a dropdown menu. The argument a 2-element array: [name, options].
    The name is the name of the variable in player[layer] that the input is for, and options is an array of strings for options you can use.

- upgrades, milestones, challenges, achievements, buyables, clickables: Displays the layers upgrades/challenges/etc, as appropriate. The argument is optional, and is a the list of rows this component should include, if it doesn't have all of them.

- microtabs: Display a set of subtabs for an area. The argument is the name of the set of microtabs in the "microtabs" feature.

- bar: Display a bar. The argument is the id of the bar to display.

- infobox: Display an infobox. The argument is the id of the infobox to display.

- tree: Displays a tree. The argument is an array of arrays containing the names of the nodes in the tree (first by row, then by column)
    [See here for more information on tree layouts and nodes!](trees-and-tree-customization.md)

- upgrade-tree, buyable-tree, clickable-tree: Displays a tree of upgrades/buyables/clickables from this layer. The argument is an array of arrays containing the ids of the upgrade/etc in the tree (first by row, then by column). A tree can only have one type of component in it.

- toggle: A toggle button that toggles a bool value. The argument is a pair that identifies the location in player of the bool to toggle, e.g. `[layer, id]`. 'layer' also affects the color of the toggle.

- grid: Displays the gridable grid for the layer. If you need more than one grid, use a layer proxy. The argument is optional, and is a the list of rows this component should include, if it doesn't have all of them.

- layer-proxy: Lets you use components from another layer. The argument is a pair, `[layer, data]`, consisting of the id of the layer to proxy from, and the tabFormat for the components to show.
    (Note: you cannot use a microtab within a layer proxy)


The rest of the components are sub-components. They can be used just like other components, but are typically part of another component.

- upgrade, milestone, challenge, buyable, clickable, achievement, gridable: An individual upgrade, challenge, etc. The argument is the id. This can be used if you want to have upgrades split up across multiple subtabs, for example.

- respec-button, master-button: The respec and master buttons for buyables and clickables, respectively.

- sell-one, sell-all: The "sell one" and "sell all" for buyables, respectively. The argument is the id of the buyable.
