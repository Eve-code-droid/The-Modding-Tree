let modInfo = {
	name: "The JHGS Tree",
	author: "Aswormsh",
	pointsName: "points",
	modFiles: ["layers.js"],
	initialStartPoints: new Decimal(10),
	offlineLimit: 1,
}

let VERSION = {
	num: "0.0",
	name: "The first update",
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

	// === Prestige upgrades ===
	for (let id = 11; id <= 20; id++) {
		if (hasUpgrade('p', id)) gain = gain.times(upgradeEffect('p', id))
	}

	// === Science upgrades that boost Achievement Points ===
	const scienceBoosts = [11,12,15,16,18,20] // upgrade IDs that boost points
	for (let id of scienceBoosts) {
		if (hasUpgrade('s', id)) gain = gain.times(upgradeEffect('s', id))
	}

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
