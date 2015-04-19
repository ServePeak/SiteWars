// var to modify how long it takes for next battle.
// Each decimal place is 10^n minutes.
var battletime = 1;

function createNotification(msg){
	var option = {type: "basic", title: "warfare", message: msg, iconUrl:"notify.png"}
	chrome.notifications.create("warfare",option,function(){});
	setTimeout(function(){chrome.notifications.clear("warfare",function(){});},8000);


}

function getRandomInt(min, max) {
	var t = Math.floor(Math.random() * (max - min)) + min;
	console.log(t);
  return t;
}

//when : (Date().now() + getRandomInt(15000,60000));
chrome.alarms.create("timer",{
	delayInMinutes: getRandomInt(60,1440)*battletime
});

chrome.alarms.onAlarm.addListener(function(alarm) {
	chrome.storage.local.get('host',function(obj) {
		var hostArr = obj['host'];
		if (hostArr == undefined){
			console.log('there are no site-warriors');
		}	else if (hostArr[0].army.length < 1 || hostArr[1].army.length < 1 ){
			console.log('there are not enough site-warriors');
		} else {
			chrome.storage.local.get('history',function(obj) {
				var history = obj['history'];
				if (history == undefined){
					history = new Array();
				}
				else if (history.length == 10){
					history.splice(0,1);
				}

				var ranInd0 = getRandomInt(0,hostArr[0].army.length);
				var ranInd1 = getRandomInt(0,hostArr[1].army.length);
				var lvl0 = hostArr[0].army[ranInd0].lvl; 
				var lvl1 = hostArr[1].army[ranInd1].lvl;
				var diffLvl = lvl0 - lvl1; 

				console.log(hostArr[0].army[ranInd0].name + " battling " + hostArr[1].army[ranInd1].name + " .....");

				if (diffLvl > 0){
					var text = hostArr[0].army[ranInd0].name + " has defeated " + hostArr[1].army[ranInd1].name;
					console.log(text);
					history.push(text);
					createNotification(text);
					hostArr[0].army[ranInd0].lvl = diffLvl;
					hostArr[1].army.splice(ranInd1,1);				
				}
				else if (diffLvl < 0 ){
					var text = hostArr[1].army[ranInd1].name + " has defeated " + hostArr[0].army[ranInd0].name;
					console.log(text);
					history.push(text);
					createNotification(text);
					hostArr[1].army[ranInd1].lvl = Math.abs(diffLvl);
					hostArr[0].army.splice(ranInd0,1);	
				}
				else if (diffLvl == 0) {
					var text = hostArr[0].army[ranInd0].name + " and " + hostArr[1].army[ranInd1].name + " defeated each other";
					console.log(text);
					history.push(text);
					createNotification(text);
					hostArr[1].army.splice(ranInd1,1);
					hostArr[0].army.splice(ranInd0,1);
				}
				
				chrome.storage.local.set({'host':[hostArr[0],hostArr[1]]});
				
				chrome.storage.local.set({'history':history});
				chrome.storage.local.get('history',function(obj) {
					console.log(obj);
				});
			});
		}
		chrome.alarms.create("timer",{
			delayInMinutes: getRandomInt(60,1440)*battletime
		});
	});
});
