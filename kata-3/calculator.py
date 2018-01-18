#Create a simple calculator that given a string of 
#operators (+ - * and /) and numbers separated by 
#spaces returns the value of that expression

from fractions import Fraction 

class Calculator(object):
  def evaluate(self, string):
    expression = string.split(' ')
    while '/' in expression or '*' in expression:
        for index, item in enumerate(expression):
            if item == '/':
                operand2 = Fraction(expression.pop(index+1))
                expression.pop(index)
                operand1 = Fraction(expression.pop(index-1))
                expression.insert(index-1, operand1 / operand2)
                break
            elif item == '*':
                operand2 = Fraction(expression.pop(index+1))
                expression.pop(index)
                operand1 = Fraction(expression.pop(index-1))
                expression.insert(index-1, operand1 * operand2)
                break
    while '+' in expression or '-' in expression:
        for index, item in enumerate(expression):
            if item == '-':
                operand2 = Fraction(expression.pop(index+1))
                expression.pop(index)
                operand1 = Fraction(expression.pop(index-1))
                expression.insert(index-1, operand1 - operand2)
                break
            elif item == '+':
                operand2 = Fraction(expression.pop(index+1))
                expression.pop(index)
                operand1 = Fraction(expression.pop(index-1))
                expression.insert(index-1, operand1 + operand2)
                break
    return float(expression[0])
