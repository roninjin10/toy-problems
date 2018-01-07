"""
Write a function that takes a string of braces, and determines if the order of the braces is valid. It should return true if the string is valid, and false if it's invalid.

This Kata is similar to the Valid Parentheses Kata, but introduces new characters: brackets [], and curly braces {}. Thanks to @arnedag for the idea!

All input strings will be nonempty, and will only consist of parentheses, brackets and curly braces: ()[]{}.
What is considered Valid?

A string of braces is considered valid if all braces are matched with the correct brace.
Examples

"(){}[]"   =>  True
"([{}])"   =>  True
"(}"       =>  False
"[(])"     =>  False
"[({})](]" =>  False

"""

#original solution
def validBraces(string):
  open_braces = []
  matching_brace = {
      '(': ')',
      '[': ']',
      '{': '}'
  }
  
  for brace in string:
      if brace in ['(', '{', '[']:
          open_braces.append(brace)
      elif len(open_braces) == 0:
          return False
      elif matching_brace[open_braces[len(open_braces)-1]] != brace:
          return False
      else:
          open_braces = open_braces[:-1]
  
  if len(open_braces) != 0:
      return False
  return True


#more concise and readable solution after learning from others solutions
def validBraces(string):
  braces = {'(': ')', '[': ']', '{': '}'}
  stack = []
  
  for character in string:
      if character in braces.keys():
          stack.append(character)
      else:
          if len(stack) == 0 or braces[stack.pop()] != character:
              return False
  return len(stack) == 0