def triangle(row):
    if len(row) == 1:
        return row
    colors = ['R','G','B']
    row = [x for x in row]
    n1, n2 = row.pop(), row.pop()
    while len(row) > 1:
        newRow
        for i in range(len(row)):
            up = n1 if n1 == n2 else [c for c in colors if c not in (n1,n2)][0]
            newRow.append(up)
        row = newRow
    return row[0]