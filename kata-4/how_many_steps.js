/*
Description:
Each letter has a corresponding unicode. "a".charCodeAt() === 97, "c".charCodeAt() === 99.

In encryption and decryption, we often use the shift to achieve the purpose. If you want to change a letter from "a" to "c", you should shift to right 2 steps. If you want to change a letter from "a" to "z", you should shift to right 25 steps or shift to left 1 step(We can assume that the shift is cyclic, only between a-z).

In this Kata, we do not study the encryption and decryption. The problem is: give you two words, word1 and word2. After some shift operation, let word1 became word2, please calculate the minimum shift steps required.

You can assume that two words only contains lower case letters and they always has the same length, but character is not a one-to-one correspondence(As long as the characters are the same, don't mind their order). For example:

 word1="abc", word2="cde"
 we can:
 a-->c(shift 2) b-->d(shift 2) c-->e(shift 2)  total shift 6 steps
 or:
 a-->d(shift 3) b-->e(shift 3) c-->c(no shift) total shift 6 steps
 so we return 6 as the result
 howManyShift("abc","cde") === 6
Please note shift has two directions: left and tight. Sometimes shift to the left will use fewer steps. such as "a"-->"z", shift to left only use 1 step.

Examples
howManyShift("dog","cat") === 12
(d-->c,o-->t,g-->a)
howManyShift("word","text") === 9
(w-->x,o-->t,r-->t,d-->e)
howManyShift("code","wars") === 24
(c-->a o-->r d-->w e-->s)

howManyShift("same","same") === 0


*/

function howManyShift(word1,word2){
  let permutations = function(string) {
    let out = [];
    
    if (string.length === 1){
      return string;
    }
    
    for (let i = 0; i < string.length; i++) {
      let first = string[i];
      let charsLeft = string.substring(0, i) + string.substring(i + 1);
      let inner = permutations(charsLeft);
      for (let j = 0; j < inner.length; j++) {
        out.push(first + inner[j]);
      }
    }
    return out;
  }
  
  let getScore = function(word1,word2){
    let out = 0;
    for (let i = 0; i < word1.length; i++){
      let diff = Math.abs(word1.charCodeAt(i) - word2.charCodeAt(i));
      diff = diff <= 13 ? diff : 26 - diff;
      out += diff;
      if (out > solution){
        return null;
      }
    }
    return out;
  }
  let solution = word1.length * 26;
  
  let perms = permutations(word1);
  
  for (let i = 0; i < perms.length; i++){
    let score = getScore(perms[i], word2)
    solution = score !== null && score < solution ? score : solution;
  }
  return solution
}