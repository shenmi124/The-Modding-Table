# Clickables

Clickables are any kind of thing that you can click for an effect. They're a more generalized version of Buyables.

DO NOT USE THESE TO MAKE THINGS THAT YOU CLICK REPEATEDLY FOR A BONUS BECAUSE THOSE ARE AWFUL.

There are several differences between the two. One is that a buyable's saved data is its amount as a `Decimal`, while Clickables store a "state" which can be a number or string, but not `Decimal`, array, or object). Buyables have a number of extra features which you can see on their page. Clickables also have a smaller default size.

Useful functions for dealing with clickables and implementing their effects:

- getClickableState(layer, id): get the state of the clickable the player has
- setClickableState(layer, id, state): set the state of the clickable the player has
- clickableEffect(layer, id): Returns the current effects of the clickable, if any.

Clickables should be formatted like this:

```js
clickables: {
    11: {
        display() {return "Blah"},
        etc
    }
    etc
}
```

Features:

- title: **optional**. displayed at the top in a larger font. It can also be a function that returns updating text.
                    
- effect(): **optional**. A function that calculates and returns the current values of bonuses of this clickable. Can return a value or an object containing multiple values.

- display(): A function returning everything that should be displayed on the clickable after the title, likely changing based on its state. Can use basic HTML.

- unlocked(): **optional**. A function returning a bool to determine if the clickable is visible or not. Default is unlocked.

- canClick(): A function returning a bool to determine if you can click the clickable.

- onClick(): A function that implements clicking the clickable. 

- onHold(): **optional** A function that is called 20x/sec when the button is held for at least 0.25 seconds.

- style: **optional**. Applies CSS to this clickable, in the form of an object where the keys are CSS attributes, and the values are the values for those attributes (both as strings).

- marked: **optional** Adds a mark to the corner of the clickable. If it's "true" it will be a star, but it can also be an image URL.

- tooltip: **optional**. Adds a tooltip to this clickable, appears when it is hovered over. Can use basic HTML. Default is no tooltip. If this returns an empty value, that also disables the tooltip.

- layer: **assigned automagically**. It's the same value as the name of this layer, so you can do `player[this.layer].points` or similar.

- id: **assigned automagically**. It's the "key" which the clickable was stored under, for convenient access. The clickable in the example's id is 11.

You can also use these features on the clickables object to add a button above all the clickables, for implementing a respec button or similar.

- masterButtonPress(): **optional**. If present, an additional button will appear above the clickables. Pressing it will call this function.

- masterButtonText: **optional**. Text to display on the Master Button.

- showMasterButton(): **optional**. A function determining whether or not to show the button, if masterButtonPress is defined. Defaults to true if absent.



- branches: **optional**, This is primarially useful for clickable trees. An array of clickable ids. A line will appear from this clickable to all of the clickables in the list. Alternatively, an entry in the array can be a 2-element array consisting of the clickable id and a color value. The color value can either be a string with a hex color code, or a number from 1-3 (theme-affected colors). A third element in the array optionally specifies line width.