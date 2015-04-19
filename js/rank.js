chrome.storage.local.get('history', function(obj) {
	var history = obj['history'];
	chrome.storage.local.get('host',function(obj) {
		var name0 = [];
		var level0 = [];
		var score0 = [];
		var name1 = [];
		var level1 = [];
		var score1 = [];
		var hostArr = obj['host'];
		var armyArr0 = hostArr[0].army;
		var armyArr1 = hostArr[1].army;
		var hist = [];
		
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
		
		var red = '<tr><td align="right" style="width:200px;">Red Sites</td><td>Level</td><td>Battles</td></tr>';
		for( i = 0 ; i < level0.length; i++) {
			red += '<tr><td align="right">' + name0[i] + '</td>';
			red += '<td>' + level0[i] + '</td>';
			red += '<td>' + score0[i] + '</td></tr>';
		}
		
		var blue = '<tr><td align="right" style="width:200px;">Blue Sites</td><td>Level</td><td>Battles</td></tr>';
		for( i = 0 ; i < level1.length; i++) {
			blue += '<tr><td align="right">' + name1[i] + '</td>';
			blue += '<td>' + level1[i] + '</td>';
			blue += '<td>' + score1[i] + '</td></tr>';
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