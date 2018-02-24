/*
This time we want to write calculations using functions and get the results. Let's have a look at some examples:

seven(times(five())); // must return 35
four(plus(nine())); // must return 13
eight(minus(three())); // must return 5
six(dividedBy(two())); // must return 3
Requirements:

There must be a function for each number from 0 ("zero") to 9 ("nine")
There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy (divided_by in Ruby)
Each calculation consist of exactly one operation and two numbers
The most outer function represents the left operand, the most inner function represents the right operand

*/

let numb = function(n){
  return function(f){
    if (f === undefined){
      return n;
    } else{
      return f(n);
    }
  }
}

let zero = numb(0);
let one = numb(1);
let two = numb(2);
let three = numb(3);
let four = numb(4);
let five = numb(5);
let six = numb(6);
let seven = numb(7);
let eight = numb(8);
let nine = numb(9);

let plus = function(x) {return function(y){return y+x};}
let minus = function(x) {return function(y){return y-x};}
let times = function(x) {return function(y){return y*x};}
let dividedBy = function(x) {return function(y){return y/x};}
