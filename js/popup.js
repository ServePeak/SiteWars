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
				renderStatus( url + ' level is: ' +  hostArr[0].army[index].lvl++ );
			} else {
				renderStatus( url + ' level is: ' +  hostArr[1].army[index].lvl++ );
			}
		});
	});
});
