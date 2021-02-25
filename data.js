

function str_to_num(s) {
	if (s.search("/") === -1) {
		return Number(s, 10);
	} else {
		return Number((s.split("/")[0] / s.split("/")[1]), 10);
	}
}

function format_number(bignum) {
	if (Big(0).eq(bignum)) {
		return "Impossible";
	} else {
		return bignum.times(1000).toPrecision(9) + " \u2030"; // permille symbol: U+2030
	}
}

function update_dryness() {
	var chance = str_to_num(document.getElementById("chance").value);
	var rolls = str_to_num(document.getElementById("rolls").value);
	var desire = str_to_num(document.getElementById("desire").value);

	var drynessField = document.getElementById("drynessField");
	var zscoreField = document.getElementById("zscoreField");
	
	dryness = probability_of_success(chance, rolls, desire);
	drynessField.innerHTML = format_number(dryness);
	zscoreField.innerHTML = prob_to_zscore(dryness);

	update_graph(dryness);

	return dryness;
}
