/*
5 kyu

Given a positive number n > 1 find the prime factor decomposition of n. The result will be a string with the following form :

 "(p1**n1)(p2**n2)...(pk**nk)"

with the p(i) in increasing order and n(i) empty if n(i) is 1.

Example: n = 86240 should return "(2**5)(5)(7**2)(11)"

*/

/*
INTUITION

this feels like a problem we want to do recursively.  If we start from 2 and count up looking for a divisor
we are guaranteed that the divosor will be a prime number (if it is not prime we would never reach the
divisor).   So if we start with the number, look for divisor, and then start back again with the new unfactored 
part we will know we are done when we start testing a number bigger than the unfactored part to the square root.
*/

/*
HOW TO CODE IT

1. we want a while loop that ends when we have prime factorization.
2. we want to store our values in a hash/dictionary/object that keeps track of how many of each factor we have
3. when we have prime factorization we then want to combine the list into the string that is to be returned. This can be a seperate function

*/

// first attempt timed out because I forgot to update unfactored within the while loop
// second attempt failed because String should be capitalized.  Also it appears I didn't need to convert to a string
// third attempt failed because i used updated testFactor to update unfactored instead of the old testFactor
// fourth attempt failed because need to include the final prime factor. Changed while loop to go all the way up to unfactored
// fifth attemped worked!
// I could make it stop again at the square root to run faster if I need a peformance boost.

function primeFactors(n){
	var factorsObj = {};
	var factorsArray = [];
	var unfactored = n;
	var testFactor = 2;
	while (testFactor <= unfactored){
		if(unfactored % testFactor == 0){
			if(factorsObj.hasOwnProperty(testFactor)){
				factorsObj[testFactor]++;
			}else{
				factorsObj[testFactor] = 1;
				factorsArray.push(testFactor);
			}
			unfactored /= testFactor;
			testFactor = 2;
		}else{
			testFactor++;
		}
	}
	
	return primeFactorsToString(factorsObj, factorsArray);
}

function primeFactorsToString(factorsObj, factorsArray){
	var out = '';
	for(var i = 0; i < factorsArray.length; i++){
		if (factorsObj[factorsArray[i]] == 1){
			out += '(' + String(factorsArray[i]) + ')';
		}else {
			out += '(' + String(factorsArray[i]) + '**' + String(factorsObj[factorsArray[i]]) + ')';
		}
	}
	return out;
}

/*
the highest voted answer is pretty elegent and consice but somewhat hard to read at expense of consiseness
while loop until until the factor we are testing is bigger than the square root of n
while loop to find the number of factors that match
update the return string and incriment i
*/

//solution after studying other solutions
function primeFactors(n){
    var out = ''; factor = 2; factorCount = 0; unfactored = n;
    while(factor <= Math.sqrt(unfactored)){
    	
    	while(unfactored % factor == 0){
    		factorCount++;
    		unfactored /= factor;
    	}
    	
    	if(factorCount == 1){
    		out += '(' + factor + ')';
    	}else if (factorCount > 1){
    		out += '(' + factor + '**' + factorCount + ')';
    	}
    	
    	factorCount = 0
    	factor++
    }

    if (unfactored == 1){
    	return out;
    }else{
    	return out + '(' + unfactored + ')';
    }
}
    
    