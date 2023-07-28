# Other Things

## CSS
A good way to give your game a unique feel is to customize the appearance of it. Modifying the CSS files helps you to do that on a global level. The CSS is broken up into several files to make it easier to find what is relevant to you.
CSS tip: Every component is automatically given a CSS class with the same name as its layer id. You can use this toapply something specifically for a single layer! You can also combine classes, such as .p.achievement or .c.locked, to change specific things in specific layers.

## Temp
temp/tmp (either works) is a data structure that is a copy of layers (which contains all of the layer data you defined plus default things), but it replaces most functions with the result of calling those functions. e.g. if layer p's baseAmount is based on points, layers.p.baseAmount is a function that returns player.points. The player currently has 54 points, so temp.p.baseAmount is 54 (as a Decimal). You can use temp to improve performance.