"""
Task

You are given a string s. Every letter in s appears once.

Consider all strings formed by rearranging the letters in s. After ordering these strings in dictionary order, return the middle term. (If the sequence has a even length n, define its middle term to be the (n/2)th term.)
Example

For s = "abc", the result should be "bac".

The permutations in order are:
"abc", "acb", "bac", "bca", "cab", "cba"
So, The middle term is "bac".

Input/Output

    [input] string s

    unique letters (2 < length <= 26)

    [output] a string

    middle permutation.

"""

import math

def middle_permutation(string):
    string_array = sorted(list(string))
    new_string_array = []
    done_splitting = False
    while len(string_array) != 0 and done_splitting == False:
        if len(string_array) % 2 != 0:
            new_string_array.append(string_array.pop(int(len(string_array)/2)))
        else:
            new_string_array.append(string_array.pop(int((len(string_array)/2) - 1)))
            done_splitting = True
    return ''.join(new_string_array + string_array[::-1])