addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Achievement points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
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

    // === Upgrades ===
    // Upgrades are one-time bonuses the player can buy using this layer's prestige currency.
    upgrades: {

        // === Example Upgrade 11 ===
        11: {
            title: "Double Points", // Name displayed in the upgrade box
            description: "Double your point gain.", // Description of what it does
            cost: new Decimal(1), // Cost in prestige currency (Achievement points)
            // Effect: Multiplies point gain by 2
            effect() {
                return new Decimal(2)
            },
            // This controls how the effect looks in the upgrade’s display
            effectDisplay() { return "x" + format(this.effect()) },
        },

        // === Example Upgrade 12 ===
        12: {
            title: "Triple Points",
            description: "Triple your point gain.",
            cost: new Decimal(5),
            effect() {
                return new Decimal(3)
            },
            effectDisplay() { return "x" + format(this.effect()) },
        },

        // === Example Upgrade 13 (scaling effect) ===
        13: {
            title: "Prestige Power",
            description: "Point gain increases based on your Achievement Points.",
            cost: new Decimal(25),
            effect() {
                // Example scaling effect: sqrt of your points + 1
                return player.p.points.add(1).pow(0.5)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
        },
    },

    // === Point Generation ===
    // This function determines how many base points you gain per second (used for display and mechanics)
    getPointGen() {
        if (!player[this.layer].unlocked) return new Decimal(0)
        let gain = new Decimal(1)

        // === Apply upgrade effects ===
        if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11))
        if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
        if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))

        return gain
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)

    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true}
})
