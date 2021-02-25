//
// taken from stackoverflow.com/questions/34035015/
//

function NormalDensityZx(x, Mean, StdDev) {
	var a = x - Mean;
	return Math.exp(-(a * a) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
}
//----------------------------------------------------------------------------------------------
// Calculates Q(x), the right tail area under the Standard Normal Curve. 
function StandardNormalQx(x) {
	if (x === 0) // no approximation necessary for 0
		return 0.50;

	var t1, t2, t3, t4, t5, qx;
	var negative = false;
	if (x < 0) {
		x = -x;
		negative = true;
	}
	t1 = 1 / (1 + (0.2316419 * x));
	t2 = t1 * t1;
	t3 = t2 * t1;
	t4 = t3 * t1
	t5 = t4 * t1;
	qx = NormalDensityZx(x, 0, 1) * ((0.319381530 * t1) + (-0.356563782 * t2) + (1.781477937 * t3) + (-1.821255978 * t4) + (1.330274429 * t5));

	if (negative == true)
		qx = 1 - qx;
	return qx;
}
//----------------------------------------------------------------------------------------------
// Calculates P(x), the left tail area under the Standard Normal Curve, which is 1 - Q(x). 
function StandardNormalPx(x) {
	return 1 - StandardNormalQx(x);
}
//----------------------------------------------------------------------------------------------
// Calculates A(x), the area under the Standard Normal Curve between +x and -x
function StandardNormalAx(x) {
	return 1 - (2 * StandardNormalQx(Math.abs(x)));
}
//----------------------------------------------------------------------------------------------

function update_graph(dryness) {
	/**
	 * Calculate data
	 */
	var chartData = [];
	for (var i = -5; i < 5.1; i += 0.1) {

		dvalue = NormalDensityZx(i, 0, 1);

		var dp = {
			category: i,
			value: dvalue
		};

		if ((Math.abs(dvalue - dryness) < 0.01) && (i < 0))  {
			console.log("match!");
			dp.vertical = dp.value;
		}
		chartData.push(dp);
	}

	/**
	 * Create a chart
	 */
	var chart = AmCharts.makeChart("drynessGraph", {
		"type": "serial",
		"theme": "light",
		"dataProvider": chartData,
		"precision": 2,
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
