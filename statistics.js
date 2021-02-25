

function prob_to_zscore(p) {
    if (p < 0.5) return -prob_to_zscore(1-p);

    if (p > 0.92) {
        if (p == 1) return Infinity;
        let r = Math.sqrt(-Math.log(1-p));
        return (((2.3212128*r+4.8501413)*r-2.2979648)*r-2.7871893)/
               ((1.6370678*r+3.5438892)*r+1);
    }
    p -= 0.5;
    let r = p*p;
    return p*(((-25.4410605*r+41.3911977)*r-18.6150006)*r+2.5066282)/
             ((((3.1308291*r-21.0622410)*r+23.0833674)*r-8.4735109)*r+1);
}

function dnorm(x, mean=0, sd=1) {
	// f(x) = 1/sqrt(2pi)  *  e^(-x*x/2)
	// probability density function
	// z-score => density
	return Math.exp(
				- (((x-mean)/sd) ** 2) / 2
			) / (Math.sqrt(2*Math.PI) * sd);
}

function cnorm(x, mean=0, sd=1) {
	var z = (x-mean)/Math.sqrt(2*sd**2);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
}

function ncdf(x, mean, std) {
  var x = (x - mean) / std;
  var t = 1 / (1 + .2315419 * Math.abs(x));
  var d =.3989423 * Math.exp( -x * x / 2);
  var prob = d * t * (.3193815 + t * ( -.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if( x > 0 ) prob = 1 - prob;
  return prob;
}

