
function simple_calculate_dryness(chance, rolls) {
	// returns the percentile of people NOT having found item in said many rolls
	return Math.pow(1-chance, rolls);
}

function fact(n) {
	if (n == 0) return 0;
	if (n > 10) return stirling_fact(n);

	var out=new Big(1);
	for (var i=new Big(2); i<=n; i++) {
		out = out.times(i);
	}
	return out;
}

function stirling_fact(n) {
	var n_pow_n = Big(n).pow(n);
	var e_pow_neg_n = Math.exp(-n);
	var sqrt_2pi_n = Big(n).times(2*Math.PI).sqrt();
	var one_plus_twelth = Big(1).add(1/(12*n));
	return n_pow_n.times(e_pow_neg_n).times(sqrt_2pi_n).times(one_plus_twelth);
}

function Comb(n, k) {
	// n! / (n-k)!
	// effectively the same as (n downto k+1)!
	var out = new Big(n);
	for (var i=n-1; i>k; i--) {
		out = out.times(i);
	}
	return out;
}

function probability_of_success(chance, rolls, desire) {
	// in close terms, what's the chance of rolling a Nd6, and get a 6 a desired number of times
	// basic formula is C * S * F where C includes permutations, since order doesn't matter
	// S is the chance of successes, and F the chance of failures
	if (desire > rolls) return Big(0);
	if (rolls == 0) return Big(0);

	var C = Big(Comb(rolls, desire)); // permutes the following
	var S = Big(chance).pow(desire); // assuming all successes in order
	var F = Big(1-chance).pow(rolls-desire); // assuems all fails in order

	return C.times(S).times(F);
}

