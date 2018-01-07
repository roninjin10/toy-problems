"""
When we attended middle school were asked to simplify mathematical expressions like "3x-yx+2xy-x" (or usually bigger), and that was easy-peasy ("2x+xy"). But tell that to your pc and we'll see!

Write a function:

simplify(poly)

that takes a string in input, representing a multilinear non-constant polynomial in integers coefficients (like "3x-zx+2xy-x"), and returns another string as output where the same expression has been simplified in the following way ( -> means application of simplify):

    All possible sums and subtraction of equivalent monomials ("xy==yx") has been done, e.g.:

    "cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab"

    All monomials appears in order of increasing number of variables, e.g.:

    "-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz"

    If two monomials have the same number of variables, they appears in lexicographic order, e.g.:

    "a+ca-ab" -> "a-ab+ac", "xzy+zby" ->"byz+xyz"

    There is no leading + sign if the first coefficient is positive, e.g.:

    "-y+x" -> "x-y", but no restrictions for -: "y-x" ->"-x+y"

N.B. to keep it simplest, the string in input is restricted to represent only multilinear non-constant polynomials, so you won't find something like `-3+yx^2'. Multilinear means in this context: of degree 1 on each variable.

Warning: the string in input can contain arbitrary variables represented by lowercase characters in the english alphabet.

Good Work :)
"""

def simplify(poly):
    #first parse polynomial into mononomials.
    #create a dictionary storing the coeficients with their associated terms as the key
    #create a list sorted in the order the final polynomial should be in
    #put together the final polynomial being careful for '1' '-1' and 0 coefficients

    if not poly[0] == '-':
        poly = '+' + poly 
    parse_terms = []
    while poly.find('-',1) != -1 or poly.find('+',1) != -1:
        #next_index = the next '-' or '+' if they exist
        next_index = poly.find('-',1) if (poly.find('-',1) != -1) and (poly.find('-',1) < poly.find('+',1) or poly.find('+',1) == -1) else poly.find('+',1)
        parse_terms.append(poly[:next_index])
        poly = poly[next_index:]
    parse_terms.append(poly)
    monos = {}
    for term in parse_terms:
        split_index = 0
        for l in term:
            if l.isdigit() or (l in ['-','+']):
                split_index += 1
            else:
                break
        monomial = term[split_index:]
        coef = int(term[:split_index] if split_index != 1 else term[:split_index] + '1')
        monomial = ''.join(sorted(monomial))
        coef = monos[monomial] + coef if monomial in monos.keys() else coef
        monos[monomial] = coef
        print(monos)
    all_coef = sorted(sorted([k for k in monos.keys()])[::-1],key= lambda d: -len(d))
    out = ''
    for o in all_coef[::-1]:
        if monos[o] < -1:
            out = out + str(monos[o]) + o
        elif monos[o] == -1:
            out = out + '-' + o 
        elif monos[o] == 1:
            out = out + '+' + o
        elif monos[o] > 1:
            out = out + '+' + str(monos[o]) + o
    out = out if out[:1] == '-' else out[1:]
    return out