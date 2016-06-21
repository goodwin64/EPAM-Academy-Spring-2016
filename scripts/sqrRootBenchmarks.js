;
function precisionLoss(sqrtFunction, argument) {
	return Math.abs(sqrtFunction(argument) - Math.sqrt(argument));
}

function howMuchTime(sqrtFunction, argument) {
	var begin = new Date().getTime();
	for (var i = 0; i < 1000; i++) {
		sqrtFunction(argument);
	}
	return new Date().getTime() - begin;
}
