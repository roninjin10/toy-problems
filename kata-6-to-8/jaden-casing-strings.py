"""
7kyu

Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word.

Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

Example:

Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"

Note that the Java version expects a return value of null for an empty string or null.

"""


#This is one of my first Katas and it really blew my mind at the time how elegent python can be

#my original solution

def toJadenCase(string):
    string_array = string.split(" ")
    new_string = ""
    for word in string_array:
        first_letter = word[:1:]
        first_letter = first_letter.upper()
        suff = word[1::]
        new_word = first_letter + suff
        new_string = new_string + new_word + " "
    return new_string[:-1:]

#solution after having mind blown by others solutions
def toJadenCase(string):
    return " ".join(w.capitalize() for w in string.split())