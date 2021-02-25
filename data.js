
function calculate_dryness(chance, rolls) {
	// returns the percentile of people NOT having found item in said many rolls
	return Math.pow(1-chance, rolls);
}

function update_dryness() {
	var chance = document.getElementById("chance").value;
	var rolls = document.getElementById("rolls").value;
	var drynessField = document.getElementById("drynessField");

	drynessField.innerHTML = calculate_dryness(chance, rolls);
	console.log(chance);
	console.log(rolls);
	return;
}
