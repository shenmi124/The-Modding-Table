# Buyables

Buyables are usually things that can be bought multiple times with scaling costs. They come with optional buttons that can be used for respeccing or selling buyables, among other things.

The amount of a buyable owned is a `Decimal`. 

Useful functions for dealing with buyables and implementing their effects:

- getBuyableAmount(layer, id): get the amount of the buyable the player has
- addBuyables(layer, id, amount): add to the amount of the buyable
- setBuyableAmount(layer, id, amount): set the amount of the buyable the player has
- buyableEffect(layer, id): Returns the current effects of the buyable, if any.

Buyables should be formatted like this:

```js
buyables: {
    11: {
        cost(x) { return new Decimal(1).mul(x) },
        display() { return "Blah" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        etc
    },
    etc
}
```

Features:

- title: **optional**. displayed at the top in a larger font. It can also be a function that returns updating text.

- cost(): cost for buying the next buyable. Can have an optional argument "x" to calculate the cost of the x+1th purchase. (x is a `Decimal`).
    Can return an object if there are multiple currencies.
                    
- effect(): **optional**. A function that calculates and returns the current values of bonuses of this buyable.  Can have an optional argument "x" to calculate the effect of having x of the buyable.. 
    Can return a value or an object containing multiple values.

- display(): A function returning everything that should be displayed on the buyable after the title, likely including the description, amount bought, cost, and current effect. Can use basic HTML.

- unlocked(): **optional**. A function returning a bool to determine if the buyable is visible or not. Default is unlocked.

- canAfford(): A function returning a bool to determine if you can buy one of the buyables.

- buy(): A function that implements buying one of the buyable, including spending the currency.

- buyMax(): **optional**. A function that implements buying as many of the buyable as possible.

- style: **optional**. Applies CSS to this buyable, in the form of an object where the keys are CSS attributes, and the values are the values for those attributes (both as strings).
        
- purchaseLimit: **optional**. The limit on how many of the buyable can be bought. The default is no limit.

- marked: **optional** Adds a mark to the corner of the buyable. If it's "true" it will be a star, but it can also be an image URL.

- tooltip: **optional**. Adds a tooltip to this buyable, appears when it is hovered over. Can use basic HTML. Default is no tooltip. If this returns an empty value, that also disables the tooltip.

- layer: **assigned automagically**. It's the same value as the name of this layer, so you can do `player[this.layer].points` or similar.

- id: **assigned automagically**. It's the "key" which the buyable was stored under, for convenient access. The buyable in the example's id is 11.

Sell One/Sell All:

Including a `sellOne` or `sellAll` function will cause an additional button to appear beneath the buyable. They are functionally identical, but "sell one" appears above "sell all". You can also use them for other things.

- sellOne/sellAll(): **optional**. Called when the button is pressed. The standard use would be to decrease/reset the amount of the buyable, and possibly return some currency to the player.

- canSellOne/canSellAll(): **optional**. booleans determining whether or not to show the buttons. If  "canSellOne/All" is absent but "sellOne/All" is present, the appropriate button will always show.


To add a respec button, or something similar, add the respecBuyables function to the main buyables object (not individual buyables).
You can use these features along with it: 

- respec(): **optional**. This is called when the button is pressed (after a toggleable confirmation message).

- respecText: **optional**. Text to display on the respec Button.

- showRespec(): **optional**. A function determining whether or not to show the button, if respecBuyables is defined. Defaults to true if absent.

- respecMessage: **optional**. A custom confirmation message on respec, in place of the default one.



- branches: **optional**, This is primarially useful for buyable trees. An array of buyable ids. A line will appear from this buyable to all of the buyables in the list. Alternatively, an entry in the array can be a 2-element array consisting of the buyable id and a color value. The color value can either be a string with a hex color code, or a number from 1-3 (theme-affected colors). A third element in the array optionally specifies line width.