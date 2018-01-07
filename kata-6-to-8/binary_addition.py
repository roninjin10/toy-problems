"""
Implement a function that adds two numbers together and returns their sum in binary. The conversion can be done before, or after the addition.

The binary number returned should be a string.


"""

#this problem is pretty trivial to solve in python.
#I thought it would be more fun to solve in a non trivial way

def add_binary(a,b):
    dec_sum = a+b
    s = ''
    n = 0
    bin_place = 0
    #find the first binary place
    while 2**(bin_place+1) <= dec_sum:
        bin_place += 1
    #while the binary number is not yet equal to the sum
    while n != a + b:
        #check if the current binary place is a 0 
        #or a 1 and then move to next binary place
        if n + 2**bin_place  > dec_sum:
            s = s + '0'
            n = n
        else:
            s = s + '1'
            n = n + 2**bin_place
        bin_place -= 1
    #fill in the rest of the binary places with 0s
    while bin_place != -1:
        s = s + '0'
        bin_place -= 1
    return s