# Grids

Grids are an easier way of making a group of similar clickables. They all have the same behavior, but are different based on their data.

**NOTE: Gridables are similar to clickables in some respects, but are fundamentally different from normal TMT Big Features in quite a few ways. Be sure to keep these in mind:**
  - Gridable ids use base 100 instead of base 10, so you can have more than 10 tiles in a row. This means that a grid might look like this:
    101  102
    201  202
  - Individual gridables are not defined individually. All properties go directly into the "grid" object. Functions are called with arguments for the id of the gridables and its associated data, so you can give them the appropriate appearance and properties based on that.
  - If you need two unrelated grids in a layer, you'll need to use a layer proxy component.

Useful functions for dealing with grids:

- getGridData(layer, id): get the data for the chosen gridable
- setGridData(layer, id, state): set the data for the chosen gridable
- gridEffect(layer, id): get the effect for the chosen gridable

The grid should be formatted like this:

```js
grid: {
    rows: 4, // If these are dynamic make sure to have a max value as well!
    cols: 5,
    getStartData(id) {
        return 0
    },
    getUnlocked(id) { // Default
        return true
    },
    getCanClick(data, id) {
        return true
    },
    onClick(data, id) { 
        player[this.layer].grid[id]++
    },
    getDisplay(data, id) {
        return data 
    },

    etc
}
```

Features:

- rows, cols: The amount of rows and columns of gridable to display.

- maxRows, maxCols: **sometimes needed**. If rows or cols are dynamic, you need to define the maximum amount that there can be (you can increase it when you update the game though). These CANNOT be dynamic.

- getStartData(id): Creates the default data for the gridable at this position. This can be an object, or a regular value.

- getUnlocked(id): **optional**. Returns true if the gridable at this position should be visible.

- getTitle(data, id): **optional**. Returns text that should displayed at the top in a larger font, based on the position and data of the gridable.

- getDisplay(data, id): **optional**. Returns everything that should be displayed on the gridable after the title, based on the position and data of the gridable.

- getStyle(data, id): **optional**. Returns CSS to apply to this gridable, in the form of an object where the keys are CSS attributes, and the values are the values for those attributes (both as strings). 

- getCanClick(data, id): **optional**. A function returning a bool to determine if you can click a gridable, based on its data and position. If absent, you can always click it.

- onClick(data, id): A function that implements clicking on the gridable, based on its position and data. 

- onHold(data, id): **optional** A function that is called 20x/sec when the button is held for at least 0.25 seconds.
                  
- getEffect(data, id): **optional**. A function that calculates and returns a gridable's effect, based on its position and data. (Whatever that means for a gridable)

- getTooltip(data, id): **optional**. Adds a tooltip to the gridables, appears when they hovered over. Can use basic HTML. Default is no tooltip. If this returns an empty value, that also disables the tooltip.

- layer: **assigned automagically**. It's the same value as the name of this layer, so you can do `player[this.layer].points` or similar.