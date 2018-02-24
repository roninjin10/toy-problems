/*
Write a program that will calculate the number of trailing zeros in a factorial of a given number.

N! = 1 * 2 * 3 * ... * N

Be careful 1000! has 2568 digits...

For more info, see: http://mathworld.wolfram.com/Factorial.html
Examples

zeros(6) = 1
# 6! = 1 * 2 * 3 * 4 * 5 * 6 = 720 --> 1 trailing zero

zeros(12) = 2
# 12! = 479001600 --> 2 trailing zeros

Hint: You're not meant to calculate the factorial. Find another way to find the number of zeros.

*/
//so the question is how many 10s (5*2) exist in the factored down version of n!
//because there are so many factors of 2 available that we will never run out this question is basically asking
//how many factors of 5 exist in n!
//tons of failed attempts were too slow.
//this method that worked takes every power of 5  and counts how many of them exist in factored N, n-1, n-2, ...


function zeros (n) {
  out = 0;
  if (n != 0){
    power_5 = Math.floor(Math.log(n)/Math.log(5));
    while (power_5 != 0){
      out += Math.floor(n / ( Math.pow(5,power_5)) );
      power_5 -= 1;
    }
  }
  return out;
}