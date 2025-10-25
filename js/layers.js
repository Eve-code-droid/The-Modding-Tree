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
        14: { title: "Quintuple Points", description: "Gain 5x more points.", cost: new Decimal(1000), effect() { return new Decimal(5) }, effectDisplay() { return "x" + format(this.effect()) } },

        // Only dynamic upgrade left: scales with prestige points
        15: {
            title: "Prestige Boost",
            description: "Gain scales with your Prestige Points.",
            cost: new Decimal(5000),
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

    // Points per second calculation for UI
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

addLayer("science", {
    name: "Science",
    symbol: "C",
    position: 1,
    startData() { 
        return {
            unlocked: false,
            points: new Decimal(0), // Science Points
        }
    },
    color: "#1E90FF",
    requires: new Decimal(100), // Achievement Points needed to unlock
    resource: "Science Points",
    baseResource: "Achievement Points",
    baseAmount() { return player.p.points },
    type: "normal",
    exponent: 0.5,

    // === Science-themed upgrades ===
    upgrades: {
        // Achievement Point boosts
        11: { title: "Microscope", description: "Double Achievement Points gain.", cost: new Decimal(5), effect() { return new Decimal(2) }, effectDisplay() { return "x" + format(this.effect()) } },
        12: { title: "Laboratory", description: "Triple Achievement Points gain.", cost: new Decimal(20), effect() { return new Decimal(3) }, effectDisplay() { return "x" + format(this.effect()) } },

        // Science Point boosts
        13: { title: "Physics Research", description: "Double Science Points gain.", cost: new Decimal(50), effect() { return new Decimal(2) }, effectDisplay() { return "x" + format(this.effect()) } },
        14: { title: "Chemistry Lab", description: "Triple Science Points gain.", cost: new Decimal(200), effect() { return new Decimal(3) }, effectDisplay() { return "x" + format(this.effect()) } },

        // Achievement Point boost scaled by Science Points
        15: { title: "Innovation", description: "Achievement Points gain scales with Science Points.", cost: new Decimal(500), effect() { return player.science.points.add(1).pow(0.25) }, effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) } },

        // More alternating upgrades
        16: { title: "Advanced Microscope", description: "2.5x Achievement Points gain.", cost: new Decimal(1500), effect() { return new Decimal(2.5) }, effectDisplay() { return "x" + format(this.effect()) } },
        17: { title: "Robotics Lab", description: "4x Science Points gain.", cost: new Decimal(5000), effect() { return new Decimal(4) }, effectDisplay() { return "x" + format(this.effect()) } },
        18: { title: "Quantum Physics", description: "3x Achievement Points gain.", cost: new Decimal(20000), effect() { return new Decimal(3) }, effectDisplay() { return "x" + format(this.effect()) } },
        19: { title: "Space Program", description: "5x Science Points gain.", cost: new Decimal(100000), effect() { return new Decimal(5) }, effectDisplay() { return "x" + format(this.effect()) } },
        20: { title: "Artificial Intelligence", description: "Achievement Points gain scales with Science Points (0.5 exponent).", cost: new Decimal(500000), effect() { return player.science.points.add(1).pow(0.5) }, effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) } },
    },

    // Multiply all upgrades
    gainMult() {
        let mult = new Decimal(1)
        for (let id = 11; id <= 20; id++) {
            if (hasUpgrade('science', id)) mult = mult.times(upgradeEffect('science', id))
        }
        return mult
    },

    gainExp() { return new Decimal(1) },

    // Points per second for Science Points
    layerPointGen() {
        return new Decimal(1).times(this.gainMult())
    },

    update(diff) {
        player.science.points = player.science.points.plus(this.layerPointGen().times(diff))
    },

    row: 1,
    hotkeys: [
        {key: "c", description: "C: Reset for Science Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
    // Show if Achievement Points >= 100 OR if layer has been unlocked before
    return player.p.points.gte(100) || player.science.unlocked
    }

})
