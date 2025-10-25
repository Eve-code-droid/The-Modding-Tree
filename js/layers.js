addLayer("p", {
    name: "prestige",
    symbol: "A",
    position: 0,
    startData() { 
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "Achievement Points",
    baseResource: "Awards",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.5,
    
    // === Upgrades ===
    upgrades: {
        11: {
            title: "Double Points",
            description: "Achievement Point gain is doubled, good boy.",
            cost: new Decimal(10),
            effect() { return new Decimal(2) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        12: {
            title: "Triple Points",
            description: "Achievement Point gain is tripled.",
            cost: new Decimal(50),
            effect() { return new Decimal(3) },
            effectDisplay() { return "x" + format(this.effect()) }
        }
    },

    // Apply upgrades to gain multiplier
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("p", 11)) mult = mult.times(upgradeEffect("p", 11))
        if (hasUpgrade("p", 12)) mult = mult.times(upgradeEffect("p", 12))
        return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for Achievement points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){ return true }
})
