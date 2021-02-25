//
// taken from stackoverflow.com/questions/34035015/
//

//----------------------------------------------------------------------------------------------
const precision = 1/1000;

function update_graph(dryness) {
	var chartData = [];
	var drawn = false;
	for (var z=-3; z<=3; z+=precision) {
		var dp = {
			category: z,
			value: dnorm(z, 0, 1),
		};

		if ( Math.abs(dp.value - dryness) < precision && (!drawn)) {
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
			"dashLength": 0
		}],
		"startDuration": 1,
		"graphs": [{
			"balloonText": "[[category]]: <b>[[value]]</b>",
			"lineThickness": 3,
			"valueField": "value"
		}, {
			"balloonText": "",
			"fillAlphas": 1,
			"type": "column",
			"valueField": "vertical",
			"fixedColumnWidth": 2,
			"labelText": "[[value]]",
			"labelOffset": 20
		}],
		"chartCursor": {
			"categoryBalloonEnabled": false,
			"cursorAlpha": 0,
			"zoomable": false
		},
		"categoryField": "category",
		"categoryAxis": {
			"gridAlpha": 0.05,
			"startOnAxis": true,
			"tickLength": 5,
			"labelFunction": function(label, item) {
				return '' + Math.round(item.dataContext.category * 10) / 10;
			}
		}

	});

}
