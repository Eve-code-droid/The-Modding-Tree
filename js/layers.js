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
        // Existing upgrades
        11: {
            title: "Double Points",
            description: "Achievement Point gain is doubled.",
            cost: new Decimal(5),
            effect() { return new Decimal(2) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        12: {
            title: "Prestige Boost",
            description: "Boost scales with your Prestige Points.",
            cost: new Decimal(10),
            effect() { return player[this.layer].points.add(1).pow(0.5) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        13: {
            title: "Point Influence",
            description: "Your Points boost Prestige gain.",
            cost: new Decimal(20),
            effect() { return player.points.add(1).pow(0.15) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        14: {
            title: "Triple Points",
            description: "Achievement Point gain is tripled.",
            cost: new Decimal(25),
            effect() { return new Decimal(3) },
            effectDisplay() { return "x" + format(this.effect()) }
        },

        // --- 10 new upgrades ---
        15: {
            title: "Quadruple Points",
            description: "Gain 4x more Achievement Points.",
            cost: new Decimal(40),
            effect() { return new Decimal(4) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        16: {
            title: "Prestige Surge",
            description: "Prestige points boost gain further.",
            cost: new Decimal(50),
            effect() { return player.p.points.add(1).pow(0.75) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        17: {
            title: "Point Frenzy",
            description: "Total points increase gain.",
            cost: new Decimal(60),
            effect() { return player.points.add(1).pow(0.25) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        18: {
            title: "Quintuple Points",
            description: "Gain 5x more Achievement Points.",
            cost: new Decimal(75),
            effect() { return new Decimal(5) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        19: {
            title: "Prestige Overload",
            description: "Prestige points massively boost gain.",
            cost: new Decimal(100),
            effect() { return player.p.points.add(1).pow(1) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        20: {
            title: "Point Explosion",
            description: "Total points significantly increase gain.",
            cost: new Decimal(120),
            effect() { return player.points.add(1).pow(0.35) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        21: {
            title: "Sextuple Points",
            description: "Gain 6x more Achievement Points.",
            cost: new Decimal(150),
            effect() { return new Decimal(6) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        22: {
            title: "Prestige Mastery",
            description: "Prestige points super boost gain.",
            cost: new Decimal(200),
            effect() { return player.p.points.add(1).pow(1.25) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        23: {
            title: "Point Overdrive",
            description: "Total points super boost gain.",
            cost: new Decimal(250),
            effect() { return player.points.add(1).pow(0.5) },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }
        },
        24: {
            title: "Septuple Points",
            description: "Gain 7x more Achievement Points.",
            cost: new Decimal(300),
            effect() { return new Decimal(7) },
            effectDisplay() { return "x" + format(this.effect()) }
        }
    },

    // === Gain multiplier for points/sec and prestige gain ===
    gainMult() {
        let mult = new Decimal(1)
        for (let id = 11; id <= 24; id++) {
            if (hasUpgrade('p', id)) mult = mult.times(upgradeEffect('p', id))
        }
        return mult
    },

    gainExp() { return new Decimal(1) },

    layerPointGen() {
        // Base gain = 1, multiplied by all upgrades
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
