"""
A format for expressing an ordered list of integers is to use a comma separated list of either

    individual integers
    or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example ("12, 13, 15-17")

Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.

Example:

solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// returns "-6,-3-1,3-5,7-11,14,15,17-20"

Courtesy of rosettacode.org
"""

def solution(args):
    #go through the list keeping track of the first index of a run of consecutive integers
    cur_ind = 0
    ordered_list = []
    while cur_ind <= len(args) - 1:
        first_ind = cur_ind
        
        while cur_ind + 1 <= len(args)-1:
            if int(args[cur_ind+1]) - int(args[first_ind]) == cur_ind+1 - first_ind:
                cur_ind += 1
            else:
                break
                
        if cur_ind - first_ind >= 2:
            ordered_list.append(str(args[first_ind]) + '-' + str(args[cur_ind]))
        elif cur_ind - first_ind == 1:
            ordered_list.append(','.join([str(args[first_ind]), str(args[cur_ind])]))
        elif cur_ind - first_ind == 0:
            ordered_list.append(str(args[first_ind]))
            
        cur_ind += 1
    return ','.join(ordered_list)