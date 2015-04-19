chrome.storage.local.get('history', function(obj) {
	var history = obj['history'];
	chrome.storage.local.get('host',function(obj) {
		var name0 = [];
		var level0 = [];
		var name1 = [];
		var level1 = [];
		var hostArr = obj['host'];
		var armyArr0 = hostArr[0].army;
		var armyArr1 = hostArr[1].army;
		var hist = [];
		
		for (i = 0; i < armyArr0.length; i++){
			name0.push(armyArr0[i].name);
			level0.push(armyArr0[i].lvl);
		}
		for (i = 0; i < armyArr1.length; i++){
			name1.push(armyArr1[i].name);
			level1.push(armyArr1[i].lvl);
		}
		
		for( i = 0; i < level0.length; i++ ) {
			for( j = 0; j < level0.length-1; j++ ) {
				if( level0[j] < level0[j+1] ) {
					var temp = level0[j];
					level0[j] = level0[j+1];
					level0[j+1] = temp;
					var temp = name0[j];
					name0[j] = name0[j+1];
					name0[j+1] = temp;
				}
			}
		}
		for( i = 0; i < level1.length; i++ ) {
			for( j = 0; j < level1.length-1; j++ ) {
				if( level1[j] < level1[j+1] ) {
					var temp = level1[j];
					level1[j] = level1[j+1];
					level1[j+1] = temp;
					var temp = name1[j];
					name1[j] = name1[j+1];
					name1[j+1] = temp;
				}
			}
		}
		
		var red = '<tr><td align="right">Red Sites</td><td>Level</td></tr>';
		for( i = 0 ; i < level0.length; i++) {
			red += '<tr><td align="right">' + name0[i] + '</td>';
			red += '<td>' + level0[i] + '</td></tr>';
		}
		
		var blue = '<tr><td align="right">Blue Sites</td><td>Level</td></tr>';
		for( i = 0 ; i < level1.length; i++) {
			blue += '<tr><td align="right">' + name1[i] + '</td>';
			blue += '<td>' + level1[i] + '</td></tr>';
		}
		
		if( history != undefined ) {
			hist = '<tr><td>Battle History</td></tr>';
			for( i = 0 ; i < history.length; i++) {
				hist += '<tr><td>' + history[i] + '</td></tr>';
			}
		}
		console.log(history);
		
		document.getElementById("red").innerHTML = red;
		document.getElementById("blue").innerHTML = blue;
		document.getElementById("history").innerHTML = hist;
	});
});