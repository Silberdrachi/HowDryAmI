
function simple_calculate_dryness(chance, rolls) {
	// returns the percentile of people NOT having found item in said many rolls
	return Math.pow(1-chance, rolls);
}

function fact(n) {
	var out=1;
	for (var i=2; i<=n; i++) {
		out *= i;
	}
	return out;
}

function Comb(n, k) {
	return fact(n) / (fact(k) * fact(n-k));
}

function calculate_dryness(chance, rolls, desire) {
	// similar to simple_calculate_dryness, but allows adding a goal instead
	// basic formula is C * S * F where C includes permutations, since order doesn't matter
	// S is the chance of successes, and F the chance of failures
	if (desire > rolls) return 0;
	if (rolls == 0) return 0;
	
	var C = Comb(rolls, desire); // permutes the following
	var S = Math.pow(chance, desire); // assuming all successes in order
	var F = Math.pow(1-chance, rolls-desire); // assuems all fails in order

	return C*S*F;
}

function update_dryness() {
	var chance = document.getElementById("chance").value;
	var rolls = document.getElementById("rolls").value;
	var desire = document.getElementById("desire").value;

	var drynessField = document.getElementById("drynessField");

	drynessField.innerHTML = calculate_dryness(chance, rolls, desire);

	return;
}
