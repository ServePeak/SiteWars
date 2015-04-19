// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/
 
 var url;
 
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };
	
  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    url = tab.url;
		url = new URL(url).hostname;
		var surl = url.split(".");
		console.log(surl);
		if( surl.length > 2 ) {
			surl.splice(0, surl.length-2);
		}
		url = surl.join(".");

    callback(url);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderLRed(topDog) {
  document.getElementById('leaderRed').textContent = topDog;
}

function renderLBlue(topDog) {
  document.getElementById('leaderBlue').textContent = topDog;
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.local.get('host',function(obj) {
		getCurrentTabUrl(function(url) {
			var hostArr = obj['host'];	
			var armyArr0 = hostArr[0].army;
			var armyArr1 = hostArr[1].army;
			var state0 = false;
			var index = -1;

			for (i = 0; i < armyArr0.length; i++){
				if (armyArr0[i].name == url){
					index = i;
					state0 = true;
					break;
				}
			}
			if( !state0 ) {
				for (i = 0; i < armyArr1.length; i++){
					if (armyArr1[i].name == url){
						index = i;
						break;
					}
				}
			}
			if( state0 ) {
				renderStatus( url + ' | ' + hostArr[0].army[index].lvl + ' | ' + hostArr[0].army[index].score );
			} else {
				renderStatus( url + ' | ' + hostArr[1].army[index].lvl + ' | ' + hostArr[1].army[index].score  );
			}
			
		var name0 = [];
		var level0 = [];
		var score0 = [];
		var name1 = [];
		var level1 = [];
		var score1 = [];
		
		for (i = 0; i < armyArr0.length; i++){
			name0.push(armyArr0[i].name);
			level0.push(armyArr0[i].lvl);
			score0.push(armyArr0[i].score);
		}
		for (i = 0; i < armyArr1.length; i++){
			name1.push(armyArr1[i].name);
			level1.push(armyArr1[i].lvl);
			score1.push(armyArr1[i].score);
		}
		
		for( i = 0; i < level0.length; i++ ) {
			for( j = 0; j < level0.length-1; j++ ) {
				if( score0[j] < score0[j+1] ) {
					var temp = level0[j];
					level0[j] = level0[j+1];
					level0[j+1] = temp;
					var temp = name0[j];
					name0[j] = name0[j+1];
					name0[j+1] = temp;
					var temp = score0[j];
					score0[j] = score0[j+1];
					score0[j+1] = temp;
				} else if( level0[j] < level0[j+1] && score0[j] == score0[j+1] ) {
					var temp = level0[j];
					level0[j] = level0[j+1];
					level0[j+1] = temp;
					var temp = name0[j];
					name0[j] = name0[j+1];
					name0[j+1] = temp;
					var temp = score0[j];
					score0[j] = score0[j+1];
					score0[j+1] = temp;
				}
			}
		}
		for( i = 0; i < level1.length; i++ ) {
			for( j = 0; j < level1.length-1; j++ ) {
				if( score1[j] < score1[j+1] ) {
					var temp = level1[j];
					level1[j] = level1[j+1];
					level1[j+1] = temp;
					var temp = name1[j];
					name1[j] = name1[j+1];
					name1[j+1] = temp;
					var temp = score1[j];
					score1[j] = score1[j+1];
					score1[j+1] = temp;
				} else if( level1[j] < level1[j+1] && score1[j] == score1[j+1] ) {
					var temp = level1[j];
					level1[j] = level1[j+1];
					level1[j+1] = temp;
					var temp = name1[j];
					name1[j] = name1[j+1];
					name1[j+1] = temp;
					var temp = score1[j];
					score1[j] = score1[j+1];
					score1[j+1] = temp;
				}
			}
		}
		var red = name0[0] + ' | ' + level0[0] + ' | ' + score0[0];
		var blue = name1[0] + ' | ' + level1[0] + ' | ' + score1[0];
		renderLRed( red );
		renderLBlue( blue );
		});
	});
});
