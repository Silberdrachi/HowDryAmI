
function simple_calculate_dryness(chance, rolls) {
	// returns the percentile of people NOT having found item in said many rolls
	return Math.pow(1-chance, rolls);
}

function fact(n) {
	var out=new Big(1);
	for (var i=new Big(2); i<=n; i++) {
		out = out.times(i);
	}
	return out;
}

function Comb(n, k) {
	return fact(n).div(
			fact(n-k)
		);
}

function calculate_dryness(chance, rolls, desire) {
	// similar to simple_calculate_dryness, but allows adding a goal instead
	// basic formula is C * S * F where C includes permutations, since order doesn't matter
	// S is the chance of successes, and F the chance of failures
	if (desire > rolls) return Big(0);
	if (rolls == 0) return Big(0);

	var C = Big(Comb(rolls, desire)); // permutes the following
	var S = Big(chance).pow(desire); // assuming all successes in order
	var F = Big(1-chance).pow(rolls-desire); // assuems all fails in order

	var dryness = C.times(S).times(F);
	return dryness;
}

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
	
	drynessField.innerHTML = format_number(calculate_dryness(chance, rolls, desire));

	return calculate_dryness(chance, rolls, desire);
}
