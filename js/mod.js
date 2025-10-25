let modInfo = {
	name: "The JHGS Tree",
	author: "Aswormsh",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(10), // Used for hard resets and new players
	offlineLimit: 1, // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "The first update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	return true
}

// ============================
// Calculate points per second!
// ============================
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)

	// === Prestige (p) layer upgrades ===
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

	// === Science (s) layer upgrades ===
	// (Add these later — they will boost points when you add the Science layer)
	if (hasUpgrade('s', 11)) gain = gain.times(upgradeEffect('s', 11))
	if (hasUpgrade('s', 12)) gain = gain.times(upgradeEffect('s', 12))
	if (hasUpgrade('s', 13)) gain = gain.times(upgradeEffect('s', 13))
	if (hasUpgrade('s', 14)) gain = gain.times(upgradeEffect('s', 14))
	if (hasUpgrade('s', 15)) gain = gain.times(upgradeEffect('s', 15))

	return gain
}

// You can add non-layer related variables that should go into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
	}
}

// Display extra things at the top of the page
var displayThings = [
	// Example: () => "Your multiplier is " + format(tmp.p.effect)
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}

// ============================
// Less important things below
// ============================

// Style for the background, can be a function
var backgroundStyle = {
}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return (3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}
