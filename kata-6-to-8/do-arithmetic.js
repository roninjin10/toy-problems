/*
7 kyu

Given two numbers and an arithmetic operator (the name of it, as a string), return the result of the two numbers having that operator used on them.

a and b will both be positive integers, and a will always be the first number in the operation, and b always the second.

The four operators are "add", "subtract", "divide", "multiply".

A few examples:

arithmetic(5, 2, "add")      => returns 7
arithmetic(5, 2, "subtract") => returns 3
arithmetic(5, 2, "multiply") => returns 10
arithmetic(5, 2, "divide")   => returns 2.5

Try to do it without using if statements!
*/

//best way to do this without if statements is to use a case statement

//my solution also ended up being the best practice!

function arithmetic(a, b, operator){
  switch(operator){
  	case 'add':
  		return a + b;
  		break;
  	case 'subtract':
  		return a - b;
  		break;
  	case 'multiply':
  		return a * b;
  		break;
  	case 'divide':
  		return a / b;
  		break;
  }
}

//most clever solution is interesting.  
/*
function arithmetic(a, b, operator){
  optable = { "add":"+", "subtract": "-", "multiply": "*" , "divide":"/"};
  return eval(a + optable[operator] + b); 
}
*/