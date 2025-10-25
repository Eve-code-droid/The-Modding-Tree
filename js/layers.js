// === Prestige Layer ===
addLayer("p", {
	name: "prestige",
	symbol: "A",
	position: 0,
	startData() { 
		return { unlocked: true, points: new Decimal(0) }
	},
	color: "#4BDC13",
	requires: new Decimal(10),
	resource: "Achievement Points",
	baseResource: "points",
	baseAmount() { return player.points },
	type: "normal",
	exponent: 0.5,

	upgrades: {
		11: { title: "Double Points", description: "Gain 2x more points.", cost: new Decimal(1), effect() { return new Decimal(2) }, effectDisplay() { return "x" + format(this.effect()) } },
		12: { title: "Triple Points", description: "Gain 3x more points.", cost: new Decimal(5), effect() { return new Decimal(3) }, effectDisplay() { return "x" + format(this.effect()) } },
		13: { title: "Quadruple Points", description: "Gain 4x more points.", cost: new Decimal(15), effect() { return new Decimal(4) }, effectDisplay() { return "x" + format(this.effect()) } },
	},

	row: 0,
	hotkeys: [
		{key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
	],
	layerShown(){ return true }
})

// === Science Layer (placeholder, no auto-gain) ===
addLayer("s", {
	name: "Science",
	symbol: "C",
	position: 1,
	startData() { 
		return { unlocked: false, points: new Decimal(0) }
	},
	color: "#1E90FF",
	requires: new Decimal(100),
	resource: "Science Points",
	baseResource: "points",
	baseAmount() { return player.points },
	type: "normal",
	exponent: 0.5,

	upgrades: {},

	getPointGen() { return new Decimal(0) }, // no auto-gain
	row: 1,
	hotkeys: [
		{key: "c", description: "C: Reset for Science Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
	],
	layerShown() { return player.points.gte(100) || player.s.unlocked }
})
