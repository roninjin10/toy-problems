"""
Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]
"""


#my original solution

def move_zeros(array):
    new_array = []
    zero_array = []
    for i in array:
        if  i == 0 and not isinstance(i, bool):
            zero_array.append(i)
        else:
            new_array.append(i)
    return new_array + zero_array

#much more consice solution after learning from others solutions
def move_zeros(array):
    non_zeros = [i for i in array if (i != 0) or isinstance(i,bool)]
    return non_zeros + [0]*(len(array)-len(non_zeros))