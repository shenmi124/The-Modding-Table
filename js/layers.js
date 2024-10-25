addLayer("1layer", {
    name: "sideLayer1",
    position: -1,
    row: 1,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 1 ↓' : '↓ layer 1 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 1 ↓' : '↓ layer 1 ↓'},
    small: true,// Set true to generate a slightly different layer
    nodeStyle: {"font-size": "15px", "height": "30px"},// Change layer button' style
    startData() { return {
        unlocked: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['p'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "Prestige", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolEN: "Prestige", // The second name of this appears on the layer's node ( If you open otherLanguageMod )
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    resourceEN: "prestige points", // The second name of prestige currency ( If you open otherLanguageMod )
    baseResource: "points", // Name of resource prestige is based on
    baseResourceEN: "points", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "00 开始",
            description: "每秒获得1升级点",
            cost:function(){return new Decimal("0")},
            unlocked(){return true}
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})