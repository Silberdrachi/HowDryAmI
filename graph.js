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

function NormSInv(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1))
    {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    }
    else if (p < p_low)
    {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high)
    {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else
    {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
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

	var roundedDryness = Math.round(dryness*1000)/1000;
	var zDryness = NormSInv(roundedDryness);
	for (var i = -5; i < zDryness; i += 0.001) {
		var dp = {
			category: i,
			value: NormalDensityZx(i, 0, 1)
		};

		chartData.push(dp);
	}

	chartData.push({
		category: zDryness,
		value: roundedDryness,
		vertical: roundedDryness
	});

	for (var i=zDryness; i <= 5; i += 0.001) {
		var dp = {
			category: i,
			value: NormalDensityZx(i, 0, 1)
		};

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
