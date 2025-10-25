let modInfo = {
	name: "The JHGS Tree",
	author: "Aswormsh",
	pointsName: "points",
	modFiles: ["layers.js"],

	initialStartPoints: new Decimal(10), // starting points
	offlineLimit: 1,  // hours
}

let VERSION = {
	num: "0.0",
	name: "First Update",
}

let winText = `Congratulations! You have reached the end!`

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints() {
	return true
}

// ============================
// Points per second calculation
// ============================
function getPointGen() {
	if (!canGenPoints()) return new Decimal(0)

	let gain = new Decimal(1)

	// Prestige upgrades boost
	if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11))
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
	if (hasUpgrade('p', 16)) gain = gain.times(upgradeEffect('p', 16))
	if (hasUpgrade('p', 17)) gain = gain.times(upgradeEffect('p', 17))
	if (hasUpgrade('p', 18)) gain = gain.times(upgradeEffect('p', 18))
	if (hasUpgrade('p', 19)) gain = gain.times(upgradeEffect('p', 19))
	if (hasUpgrade('p', 20)) gain = gain.times(upgradeEffect('p', 20))

	return gain
}

function addedPlayerData() {
	return {}
}

function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}

function maxTickLength() {
	return 3600
}
