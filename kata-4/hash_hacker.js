/*
Last Christmas Santa received his first computer as a gift from the elves.

Since he is got nothing to do during the year he learned JavaScript and now he spend all nights on codewars.com. The elves know that he will not bring gift to kids this year since it is too busy training on a very hard kata about himself (yes, this one!).

The only way to save the Christmas for the elves is to get into the Santa's workshop, get all gifts, and bring them to all kids around the world.

Unfortunately the workshop door is secured with an strange hash-function based system. The door show a public code y and, in order to access, you have to provide a related private code x: an integer number such than h(x)=y. Where h function is computed by the main server Santa managed to setup this year.

You're the best hacker of the pole and the elves needs your help!

You already gained access the server and you know you can exploit it to compute function h. But there is a big problem here: if you call h too much times the server will detect you as an intruder and your mission will fail miserably! [sound of crying kids here]

the elves know (from some note of Santa) that the first 10 calls to function h goes for free, but after that a counter starts and if it exceeds 2⌈log2x⌉ the game is over. (Gosh! the alarm count depends on x, the variable that you don't know!) Moreover, h changes every day but Santa always choose to be a non-decreasing (not necessarily continuous) function over the Reals. The public code y is a Real number while the private code you're looking for must be a non-negative integer x such that h(x)=y, and at least one such value x is guaranteed to exists.

Are you smart enough to solve this problem and save the Christmas?

Your code must work well on any possible function h, not only on those few used to validate it here.


*/

function crackHash(h, y, u = 0, l = 0) {
  if (u === 0) {
    while (h(u) <= y) {
      l = u;
      u = u*2 + 1;
    }
  }
  
  let m = Math.floor((u + l) / 2);
  let hash = h(m);
  
  return hash === y ? m : hash > y ? crackHash(h, y, m, l) : crackHash(h, y, u, m);
  
} 