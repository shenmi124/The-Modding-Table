let modInfo = {
	name: "The ??? Tree",
	nameEN: "The ??? Tree",// When you open the otherLanguageMod, this is the second language
	id: "mymod2",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],
	otherLanguageMod: false,// 开启时玩家会在开始游戏时询问并选择语言
	languageMod: true,// 关闭otherLanguageMod时使用,默认为 true->英文 false->中文

	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `
	<br><br><br><h1>更新日志:</h1><br>(不存在<span style='color: red'><s>剧透警告</s></span>)<br><br>
	<span style="font-size: 17px;">
		<h3><s>你应该自己写这个</s></h3><br><br>
		<h3>v0.0 - 史无前例的改动</h3><br>
			- 开发了 The Modding Table, 这何尝不是一种TMT<br>
		<br><br>
`

// When you open the otherLanguageMod, this is the second language
let changelogEN = `
	<br><br><br><h1>Changelog:</h1><br>(不存在<span style='color: red'><s>剧透警告</s></span>)<br><br>
	<span style="font-size: 17px;">
		<h3>v0.0 - 史无前例的改动</h3><br>
			- 开发了 The Modding Table, 这何尝不是一种TMT<br>
		<br><br>
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if(options.ch==undefined && modInfo.otherLanguageMod==false){return '<big><br>You should choose your language first<br>你需要先选择语言</big>'}
		return '<div class="res">'+displayThingsRes()+'</div><br><br><div class="vl2"></div></span>'
	}
]

// 你可以在此处写入内容已左上角便捷显示
function displayThingsRes(){
	return ''
}

// Determines when the game "ends"
function isEndgame() {
	return false
}

// 
function getPointsDisplay(){
	let a = ''
	if(player.devSpeed && player.devSpeed != 1){
		a += options.ch ? '<br>时间加速: '+format(player.devSpeed)+'x' : '<br>Dev Speed: '+format(player.devSpeed)+'x'
	}
	if(player.offTime !== undefined){
		a += options.ch ? '<br>离线加速剩余时间: '+formatTime(player.offTime.remain) : '<br>Offline Time: '+formatTime(player.offTime.remain)
	}
	a += '<br>'
	if(options.ch !== undefined){
		a += `<span class="overlayThing">${(options.ch?"你有":"You have")} <h2  class="overlayThing" id="points"> ${format(player.points)}</h2> ${modInfo.pointsName}</span>`
		if(canGenPoints()){
			a += `<br><span class="overlayThing">(`+(tmp.other.oompsMag != 0 ? format(tmp.other.oomps) + " OOM" + (tmp.other.oompsMag < 0 ? "^OOM" : tmp.other.oompsMag > 1 ? "^" + tmp.other.oompsMag : "") + "s" : formatSmall(getPointGen()))+`/sec)</span>`
		}
	}
	a += tmp.displayThings
	a += '<br><br>'
	return a
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
