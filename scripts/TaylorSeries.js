;
/* Precision 1e-4 complies if x < 30 */
function TaylorSeries(x, seriesFunction, epsilon) {
    epsilon = epsilon || 1e-4; // default precision is 0.0001
    sum = currentIter = 0;
    partSum = 1;
    while (Math.abs(partSum) > epsilon) {
        partSum = seriesFunction(x, currentIter++);
        sum += partSum;
        // debugger;
    }
    return sum;
}

/* The most simple version.
It doesn't calculate factorial (crushes) for negative numbers */
function factorial(x) {
    if (x == 0) {
        return 1;
    }
    return x * factorial(x - 1);
}

function sinTaylor(x, n) {
    return Math.pow(-1, n) * shTaylor(x, n);
}

function cosTaylor(x, n) {
    return Math.pow(-1, n) * chTaylor(x, n);
}

function shTaylor(x, n) {
    power = 2 * n + 1;
    return Math.pow(x, power) / factorial(power);
}

function chTaylor(x, n) {
    power = 2 * n;
    return Math.pow(x, power) / factorial(power);
}

function expTaylor(x, n) {
    return Math.pow(x, n) / factorial(n);
}
