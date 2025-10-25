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
    
    // === Upgrades (5x2 alternating) ===
    upgrades: {
        // Row 1
        11: { // Multiplier
            title: "Double Points",
            description: "Achievement Point gain is doubled.",
            cost: new Decimal(5),
            effect() { return new Decimal(2) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        12: { // Passive
            title: "Extra Effort",
            description: "Gain +1 Achievement Point per second.",
            cost: new Decimal(10),
            effect() { return new Decimal(1) },
            effectDisplay() { return "+" + format(this.effect()) + " pts/sec" }
        },

        13: { // Multiplier
            title: "Triple Points",
            description: "Achievement Point gain is tripled.",
            cost: new Decimal(15),
            effect() { return new Decimal(3) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        14: { // Passive
            title: "Study Time",
            description: "Gain +5 Achievement Points per second.",
            cost: new Decimal(25),
            effect() { return new Decimal(5) },
            effectDisplay() { return "+" + format(this.effect()) + " pts/sec" }
        },

        15: { // Multiplier
            title: "Quadruple Points",
            description: "Achievement Point gain is quadrupled.",
            cost: new Decimal(50),
            effect() { return new Decimal(4) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        16: { // Passive
            title: "Overachiever",
            description: "Gain +10 Achievement Points per second.",
            cost: new Decimal(75),
            effect() { return new Decimal(10) },
            effectDisplay() { return "+" + format(this.effect()) + " pts/sec" }
        },

        // Row 2
        17: { // Multiplier
            title: "Quintuple Points",
            description: "Achievement Point gain is increased 5x.",
            cost: new Decimal(100),
            effect() { return new Decimal(5) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        18: { // Passive
            title: "Hard Worker",
            description: "Gain +20 Achievement Points per second.",
            cost: new Decimal(150),
            effect() { return new Decimal(20) },
            effectDisplay() { return "+" + format(this.effect()) + " pts/sec" }
        },

        19: { // Multiplier
            title: "Sextuple Points",
            description: "Achievement Point gain is increased 6x.",
            cost: new Decimal(200),
            effect() { return new Decimal(6) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        20: { // Passive
            title: "Night Owl",
            description: "Gain +50 Achievement Points per second.",
            cost: new Decimal(300),
            effect() { return new Decimal(50) },
            effectDisplay() { return "+" + format(this.effect()) + " pts/sec" }
        }
    },

    // === Calculate multiplicative upgrades ===
    gainMult() {
        let mult = new Decimal(1)
        let multIds = [11, 13, 15, 17, 19] // Only multiplier upgrades
        for (let id of multIds) {
            if (hasUpgrade("p", id)) mult = mult.times(upgradeEffect("p", id))
        }
        return mult
    },

    gainExp() { return new Decimal(1) },

    // === Calculate points per second for UI ===
    layerPointGen() {
        let gain = new Decimal(0)
        let passiveIds = [12, 14, 16, 18, 20] // Passive upgrades
        for (let id of passiveIds) {
            if (hasUpgrade("p", id)) gain = gain.plus(upgradeEffect("p", id))
        }
        gain = gain.times(this.gainMult()) // Scale by multipliers
        return gain
    },

    // === Update each tick ===
    update(diff) {
        let gain = this.layerPointGen()
        player.points = player.points.plus(gain.times(diff))
    },

    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for Achievement Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){ return true }
})
