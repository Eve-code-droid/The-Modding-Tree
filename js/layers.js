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

    upgrades: {
        // Static multiplicative upgrades
        11: { title: "Double Points", description: "Gain 2x more points.", cost: new Decimal(5), effect() { return new Decimal(2) }, effectDisplay() { return "x" + format(this.effect()) } },
        12: { title: "Triple Points", description: "Gain 3x more points.", cost: new Decimal(15), effect() { return new Decimal(3) }, effectDisplay() { return "x" + format(this.effect()) } },
        13: { title: "Quadruple Points", description: "Gain 4x more points.", cost: new Decimal(50), effect() { return new Decimal(4) }, effectDisplay() { return "x" + format(this.effect()) } },
        14: { title: "Quintuple Points", description: "Gain 5x more points.", cost: new Decimal(10000), effect() { return new Decimal(5) }, effectDisplay() { return "x" + format(this.effect()) } },

        // Only dynamic upgrade left: scales with prestige points
        15: {
            title: "Prestige Boost",
            description: "Gain scales with your Prestige Points.",
            cost: new Decimal(500000),
            effect() { return player.p.points.add(1).pow(0.5) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },

        // More static upgrades
        16: { title: "Sextuple Points", description: "Gain 6x more points.", cost: new Decimal(7500000000000), effect() { return new Decimal(6) }, effectDisplay() { return "x" + format(this.effect()) } },
        17: { title: "Septuple Points", description: "Gain 7x more points.", cost: new Decimal(10000000000000000), effect() { return new Decimal(7) }, effectDisplay() { return "x" + format(this.effect()) } },
        18: { title: "Octuple Points", description: "Gain 8x more points.", cost: new Decimal(100000000000000000000000), effect() { return new Decimal(8) }, effectDisplay() { return "x" + format(this.effect()) } },
        19: { title: "Nonuple Points", description: "Gain 9x more points.", cost: new Decimal(120000000000000000000000000000), effect() { return new Decimal(9) }, effectDisplay() { return "x" + format(this.effect()) } },
        20: { title: "Decuple Points", description: "Gain 10x more points.", cost: new Decimal(150000000000000000000000000000000000), effect() { return new Decimal(10) }, effectDisplay() { return "x" + format(this.effect()) } },
    },

    // Multiply all upgrades (including single prestige-scaling upgrade)
    gainMult() {
        let mult = new Decimal(1)
        for (let id = 11; id <= 20; id++) {
            if (hasUpgrade('p', id)) mult = mult.times(upgradeEffect('p', id))
        }
        return mult
    },

    gainExp() { return new Decimal(1) },

    layerPointGen() {
        return new Decimal(1).times(this.gainMult())
    },

    update(diff) {
        player.points = player.points.plus(this.layerPointGen().times(diff))
    },

    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for Achievement Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){ return true }
})
