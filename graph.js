//
// taken from stackoverflow.com/questions/34035015/
//

//----------------------------------------------------------------------------------------------
const precision = 1/1000;

function update_graph(chance, dryness) {
	var chartData = [];
	var drawn = false;
	const invchance = Math.round(1/chance);
	for (var z=-3; z<=3; z+=precision) {
		var dp = {
			category: (z <= 0) ? z * chance : z*invchance,
			value: cnorm(z, 0, 1)*100,
		};

		if ( Math.abs(dp.value/100 - dryness) < precision && (!drawn)) {
			dp.vertical = dp.value
			drawn = true;
		}

		chartData.push(dp);
	}

	var chart = AmCharts.makeChart("drynessGraph", {
		"type": "serial",
		"theme": "light",
		"dataProvider": chartData,
		"precision": 6,
		"valueAxes": [{
			"gridAlpha": 0.2,
			"dashLength": 0,
			"min": 0,
			"max": 1,
			"strictMinMax": true
		}],
		"startDuration": 1,
		"graphs": [{
			"lineThickness": 3,
			"valueField": "value"
		}, {
			"balloonText": "",
			"fillAlphas": 1,
			"type": "column",
			"valueField": "vertical",
			"fixedColumnWidth": 2,
			"labelText": "[[value]]\u0025",
			"labelOffset": 20
		}],
		"chartCursor": {
			"categoryBalloonEnabled": true,
			"cursorAlpha": 0.1,
			"zoomable": false
		},
		"categoryField": "category",
		"categoryAxis": {
			"gridAlpha": 0.05,
			"startOnAxis": true,
			"tickLength": 5,
			"labelFunction": function(label, item) {
				return Math.round(item.dataContext.category * 10) / 10 + ''; // + '\u03C3';
			}
		}

	});

}
