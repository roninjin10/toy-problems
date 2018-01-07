"""
Your job is to create a calculator which evaluates expressions in Reverse Polish notation.

For example expression 5 1 2 + 4 * + 3 - (which is equivalent to 5 + ((1 + 2) * 4) - 3 in normal notation) should evaluate to 14.

Note that for simplicity you may assume that there are always spaces between numbers and operations, e.g. 1 3 + expression is valid, but 1 3+ isn't.

Empty expression should evaluate to 0.

Valid operations are +, -, *, /.

You may assume that there won't be exceptional situations (like stack underflow or division by zero).
"""

def calc(expr):
    operands = {'+','-','*','/'}
    expr_list = [i if i in operands else float(i) for i in expr.split()]
    stack = []
    for i in range(len(expr_list)):
        if expr_list[i] in operands:
            operand = expr_list[i]
            num_1 = stack.pop()
            num_2 = stack.pop()
            if operand == '+':
                stack.append(num_1 + num_2)
            elif operand == '-':
                stack.append(num_2 - num_1)
            elif operand == '*':
                stack.append(num_2 * num_1)
            elif operand == '/':
                stack.append(num_2 / num_1)
        else:
            stack.append(expr_list[i])
    return stack[len(stack) - 1] if len(stack) > 0 else 0