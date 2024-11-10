addLayer("1layer", {
    name: "sideLayer1",
    position: -1,
    row: 1,
    symbol() {return '↓ layer 1 ↓'}, // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolI18N() {return '↓ layer 1 ↓'}, // Second name of symbol for internationalization (i18n) if otherLanguageMod is enabled (in mod.js)
    small: true,// Set to true to generate a slightly smaller layer node
    nodeStyle: {"font-size": "15px", "height": "30px"},// Style for the layer button
    startData() { return {
        unlocked: true,
        points: new Decimal(0),// This currently does nothing, but it's required. (Might change later if you add mechanics to this layer.)
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
    symbolI18N: "Prestige", // Second name of symbol for internationalization (i18n) if otherLanguageMod is enabled
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    resourceI18N: "prestige points", // Second name of the resource for internationalization (i18n) if otherLanguageMod is enabled
    baseResource: "points", // Name of resource prestige is based on
    baseResourceI18N: "points", // Second name of the baseResource for internationalization (i18n) if otherLanguageMod is enabled
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
    microtabs:{
        tab:{
            "main":{
                name(){return 'main'}, // Name of tab button
                nameI18N(){return 'main'}, // Second name for internationalization (i18n) if otherLanguageMod is enabled
                content:[
                ],
            }
        },
    },
    tabFormat: [
       ["display-text", function() { return getPointsDisplay() }],
       "main-display",
       "prestige-button",
       "blank",
       ["microtabs","tab"]
    ],
    layerShown(){return true},
})

// You can delete the second name from each option if otherLanguageMod is not enabled.
// You can use geti18n() to determine the player's current language, which will return a boolean value.