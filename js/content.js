// var for time reset that multiplies the default 24 hours
var resetime = 1.0;

var url = document.location.href;
url = new URL(url).hostname;
var subUrl = url.split(".");
if (subUrl.length > 2){
	subUrl.splice(0,subUrl.length-2);
}
url = subUrl.join(".");
console.log(url);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//class definition
var Site = function(name, lvl){
	this.name = name;
	lvl = typeof lvl !== 'undefined' ? lvl : 1;
	this.lvl = lvl;
	this.time = new Date().getTime();
}

//Site.prototype
var Host = function(name){
	this.name = name;
	this.army = new Array();
}

Host.prototype.show = function(){
	console.log(this.name);
	for (i=0; i < this.army.length; i++){
		console.log(army[i].name);
	}
}

site = new Site(url);

chrome.storage.local.get('host',function(obj) {

	var hostArr = obj['host'];
	
	if (hostArr == undefined) {
		chrome.storage.local.set({'host':[new Host("Red"), new Host("Blue")]});
		console.log("initializing hostArrays");
	}

	var armyArr0 = hostArr[0].army;
	var armyArr1 = hostArr[1].army;
	var state0 = false;
	var state1 = false;
	var index = 0;

	for (i = 0; i < armyArr0.length; i++){
		if (armyArr0[i].name == url){
			state0 = true;
			index = i;
			break;
		}
	}

	if (!state0){
		for (i = 0; i < armyArr1.length; i++){
			if (armyArr1[i].name == url){
				state1 = true;
				index = i;
				break;
			}
		}
	}

	if (!state0 && !state1){
		console.log("initializing site");
		if( armyArr0.length > armyArr1.length*2 ) {
			console.log("pushing back to Blue, Red too big");
			hostArr[1].army.push(site);
		} else if( armyArr1.length > armyArr0.length*2 ) {
			console.log("pushing back to Red, Blue too big");
			hostArr[0].army.push(site);
		} else if (getRandomInt(1,3)%2 == 0){
			console.log("pushing back to Red");
			console.log(hostArr[0].army);
			console.log(hostArr[0].army.length);
			hostArr[0].army.push(site);
		}
		else{
			console.log("pushing back to Blue");
			console.log(hostArr[1].army);
			console.log(hostArr[1].army.length);
			hostArr[1].army.push(site);
		}
	}

	else if (state0){
		if (new Date().getTime() - hostArr[0].army[index].time > (86400000.0*resetime)){
			hostArr[0].army[index].lvl++;
			hostArr[0].army[index].time = new Date().getTime();
			console.log(url + " leveling up");
		}
	}

	else if (state1){
		if (new Date().getTime() - hostArr[1].army[index].time > (86400000.0*resetime)){
			hostArr[1].army[index].lvl++;
			hostArr[1].army[index].time = new Date().getTime();
			console.log(url + " leveling up");
		}
	}
	
	chrome.storage.local.set({'host':[hostArr[0],hostArr[1]]});
});

chrome.storage.local.get('host', function(obj) { 
	var	hostArr = obj['host'];
	console.log (hostArr[0]);
	console.log (hostArr[1]);
});

