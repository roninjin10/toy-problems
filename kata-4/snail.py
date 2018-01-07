"""
Snail Sort

Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]

For better understanding, please follow the numbers of the next array consecutively:

array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]

This image will illustrate things more clearly: http://www.haan.lu/files/2513/8347/2456/snail.png

NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.

NOTE 2: The 0x0 (empty matrix) is represented as [[]]
"""

def snail(array):
    n = len(array[0])
    x = 0
    y = 0
    out = []
    used_index = []
    direction = 'r'
    while len(out) < n*n:
        out.append(array[y][x])
        used_index.append([x,y])
        if direction == 'r':
            if x == n-1 or [x+1,y] in used_index:
                direction = 'd'
                y += 1
            else:
                x += 1
        elif direction == 'd':
            if y == n-1 or [x,y+1] in used_index:
                direction = 'l'
                x -= 1
            else:
                y += 1
        elif direction == 'l':
            if x == 0 or [x-1,y] in used_index:
                direction = 'u'
                y -= 1
            else:
                x -= 1
        elif direction == 'u':
            if y == 0 or [x,y-1] in used_index:
                direction = 'r'
                x += 1
            else:
                y -= 1
    return out