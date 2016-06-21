;
function numBits(x) {
    count = 0;
    while (x > 0) {
        x = x / 2 >> 0;
        count++;
    }
    return count;
}

/* This is a version of Newton's method given in Crandall & Pomerance, 
"Prime Numbers: A Computational Perspective" */
function sqrRootInt(x) {
    if (x == 0) {
        return 0;
    }
    a = Math.pow(2, Math.ceil(numBits(x) / 2));
    while (true) {
        b = Math.floor((a + Math.floor(x / a)) / 2);
        if (b >= a) return a;
        a = b;
    }
}

/* The Babylonian Method 
http://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method
@param x - the number to compute the square root of
@param g - the best guess so far (can omit from initial call) */
function sqrRoot(x, g) {
    if (x == 0) {
        return 0;
    }
    if (!g) {
        // Take an initial guess at the square root
        g = x / 2.0;
    }
    var d = x / g; // Divide our guess into the number
    var ng = (d + g) / 2.0; // Use average of g and d as our new guess
    if (g == ng) {
        // The new guess is the same as the old guess; further guesses
        // can get no more accurate so we return this guess
        return g;
    }
    // Recursively solve for closer and closer approximations of the square root
    return sqrRoot(x, ng);
}
