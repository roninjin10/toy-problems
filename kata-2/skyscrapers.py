"""
kata is here https://www.codewars.com/kata/5671d975d81d6c1c87000022

In a grid of 4 by 4 squares you want to place a skyscraper in each square with only some clues:

The height of the skyscrapers is between 1 and 4
No two skyscrapers in a row or column may have the same number of floors
A clue is the number of skyscrapers that you can see in a row or column from the outside
Higher skyscrapers block the view of lower skyscrapers located behind them

Can you write a program that can solve this puzzle? 

Example: 

To understand how the puzzle works, this is an example of a row with 2 clues. Seen from the left side there are 4 buildings visible while seen from the right side only 1: 
 

There is only one way in which the skyscrapers can be placed. From left-to-right all four buildings must be visible and no building may hide behind another building: 
 

Example of a 4 by 4 puzzle with the solution: 
        

Task: 

Finish:
function solvePuzzle(clues)
Pass the clues in an array of 16 items. This array contains the clues around the clock, index: 
 
If no clue is available, add value 0
Each puzzle has only one possible solution
SolvePuzzle() returns matrix int[][]. The first indexer is for the row, the second indexer for the column. (Python: returns 4-tuple of 4-tuples, Ruby: 4-Array of 4-Arrays)

"""

def solve_puzzle (clues):
    
    clues = [5 if clue == 0 else clue for clue in clues]
    
    # set up views
    views = {
        1: {(4,2,3,1),(4,2,1,3),(4,3,2,1),(4,3,1,2),(4,1,2,3),(4,1,3,2)},
        2: {(1,4,2,3),(1,4,3,2),(2,1,4,3),(2,4,1,3),(2,4,3,1),(3,2,1,4),(3,2,4,1),(3,1,2,4),(3,1,4,2),(3,4,2,1),(3,4,1,2)},
        3: {(1,2,4,3),(1,3,2,4),(1,3,4,2),(2,1,3,4),(2,3,1,4),(2,3,4,1)},
        4: {(1,2,3,4)},
        }
    
    # set views[5]
    views[5] = views[1].union(views[2],views[3],views[4])
    
    # set views for negative keys equal to reverse of positive
    for key in views.keys():
        views[-key] = set()
        for l in views[key]:
            views[-key].add((l[3],l[2],l[1],l[0]))
    
    # find the possible views for each row/col
    horizontals = [
        views[clues[15]].intersection(views[-clues[4]]), 
        views[clues[14]].intersection(views[-clues[5]]), 
        views[clues[13]].intersection(views[-clues[6]]), 
        views[clues[12]].intersection(views[-clues[7]])
        ]
    
    verticals = ([
        views[clues[0]].intersection(views[-clues[11]]), 
        views[clues[1]].intersection(views[-clues[10]]), 
        views[clues[2]].intersection(views[-clues[9]]), 
        views[clues[3]].intersection(views[-clues[8]]),
        ])
    
    # find each board possible
    horizontal_boards = set()
    for row0 in horizontals[0]:
        for row1 in horizontals[1]:
            for row2 in horizontals[2]:
                for row3 in horizontals[3]:
                    horizontal_boards.add((row0,row1,row2,row3))
                    
    vertical_boards = set()
    for col0 in verticals[0]:
        for col1 in verticals[1]:
            for col2 in verticals[2]:
                for col3 in verticals[3]:
                    vertical_boards.add((
                        (col0[0],col1[0],col2[0],col3[0]),
                        (col0[1],col1[1],col2[1],col3[1]),
                        (col0[2],col1[2],col2[2],col3[2]),
                        (col0[3],col1[3],col2[3],col3[3]),
                        ))
    
    # take intersection to find all possible boards
    out = list(vertical_boards.intersection(horizontal_boards))[0]
      
    return (
        (out[0][0], out[0][1], out[0][2], out[0][3]),
        (out[1][0], out[1][1], out[1][2], out[1][3]),
        (out[2][0], out[2][1], out[2][2], out[2][3]),
        (out[3][0], out[3][1], out[3][2], out[3][3]),
        )