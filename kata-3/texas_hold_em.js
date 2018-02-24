/*
Texas Hold'em is a Poker variant in which each player is given two "hole cards". Players then proceed to make a series of bets while five "community cards" are dealt. If there are more than one player remaining when the betting stops, a showdown takes place in which players reveal their cards. Each player makes the best poker hand possible using five of the seven available cards (community cards + the player's hole cards).

Possible hands are, in descending order of value:

Straight-flush (five consecutive ranks of the same suit). Higher rank is better.
Four-of-a-kind (four cards with the same rank). Tiebreaker is first the rank, then the rank of the remaining card.
Full house (three cards with the same rank, two with another). Tiebreaker is first the rank of the three cards, then rank of the pair.
Flush (five cards of the same suit). Higher ranks are better, compared from high to low rank.
Straight (five consecutive ranks). Higher rank is better.
Three-of-a-kind (three cards of the same rank). Tiebreaker is first the rank of the three cards, then the highest other rank, then the second highest other rank.
Two pair (two cards of the same rank, two cards of another rank). Tiebreaker is first the rank of the high pair, then the rank of the low pair and then the rank of the remaining card.
Pair (two cards of the same rank). Tiebreaker is first the rank of the two cards, then the three other ranks.
Nothing. Tiebreaker is the rank of the cards from high to low.
Given hole cards and community cards, complete the function hand to return the type of hand (as written above, you can ignore case) and a list of ranks in decreasing order of significance, to use for comparison against other hands of the same type, of the best possible hand.
*/

let ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'];
let cardsRanks = {'Straight-flush': isStraightFlush, 'Four-of-a-kind': isFourOfAKind, 'Full house': isFullHouse, 'Flush': isFlush, 'Straight': isStraight, 'Three-of-a-kind': isThreeOfAKind, 'Two pair': isTwoPair, 'Pair': isPair, 'Nothing': isNothing};
let cardsRankKeys = ['Straight-flush', 'Four-of-a-kind', 'Full house', 'Flush', 'Straight', 'Three-of-a-kind', 'Two pair', 'Pair', 'Nothing']

function permutator(arr) {
  let out = []
  for (let a = 0; a < 3; a++) {
    for (let b = a + 1; b < 4; b++) {
      for (let c = b + 1; c < 5; c++) {
        for (let d = c + 1; d < 6; d++) {
          for (let e = d + 1; e < 7; e++) {
            out.push( [ arr[a], arr[b], arr[c], arr[d], arr[e] ] );
          }
        }
      }
    }
  }
  return out
}


function isStraightFlush(cards) {
  return isFlush(cards) && isStraight(cards);
}

function cardCounts(cards) {
  let out = {};
  cards.forEach( (card) => out[card.rank] = out[card.rank] === undefined ? 1 : out[card.rank] + 1 , {} );
  return out;
}


function isFourOfAKind(cards) {
  let counts = cardCounts(cards);
  for (count in counts) {
    if (counts[count] === 4) {
      return true;
    }
  }
}

function isFullHouse(cards) {
  let counts = cardCounts(cards);
  let arr = [];
  for (count in counts) {
    arr.push(counts[count]);
  }
  return arr.length === 2 && (arr[0] === 3 || arr[0] === 2);
}

function isFlush(cards) {
  for (let i = 0; i < cards.length; i++) {
    if (cards[0].suit !== cards[i].suit) {
      return false;
    }
  }

  return true;
}

function isStraight(cards) {
  let counts = cardCounts(cards);
  let out = [];
  for (let i = 0; i < ranks.length; i++) {
    if (Object.keys(counts).includes(ranks[i])) {
      out.push(ranks[i])
    }
    if (out.length > 0 && out.length < 5 && !Object.keys(counts).includes(ranks[i])) {
      return false;
    }
  }
  return out.length === 5;
}

function isThreeOfAKind(cards) {
  let counts = cardCounts(cards);
  for (count in counts) {
    if (counts[count] === 3) {
      return true;
    }
  }
  return false;
}

function isTwoPair(cards) {
  let counts = cardCounts(cards);
  let pairs = 0;
  for (count in counts) {
    if (counts[count] === 2) {
      pairs += 1;
    }
  }
  return pairs === 2;
}

function isPair(cards) {
  let counts = cardCounts(cards);
  for (count in counts) {
    if (counts[count] === 2) {
      return true;
    }
  }
  return false;
}

function isNothing() {
  return true;
}

function findValue(cards) {
  cards = cards.sort((a,b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank));
  let cardsValue = cards.reduce((value, card) => value += Number(ranks.length - ranks.indexOf(card.rank)) >= 10 ? ranks.length - ranks.indexOf(card.rank) : '0' + (ranks.length - ranks.indexOf(card.rank)), '');
  let cardsRank = '';
  for (let i = 0; i < cardsRankKeys.length; i++) {
    if ( cardsRanks[cardsRankKeys[i]](cards) ) {
      return [cards, cardsRankKeys[i], Number(String(cardsRankKeys.length - i) + cardsValue)];
    }
  }
}

function createRanks(cards) { 
  let counts = {}
  cards.forEach(function(card) {
    counts[card] = counts[card] === undefined ? 1 : counts[card] + 1;
  });

  let threePlus = [];
  let pairs = [];
  let singles = [];

  for (let i = 0; i < cards.length; i++) {
    let count = counts[cards[i]];
    if (count >= 3) {
      threePlus = [cards[i]];
    }
    else if (count === 2 && !pairs.includes(cards[i])){
      pairs.push(cards[i]);
    }
    else if (count === 1) {
      singles.push(cards[i]);
    }
  }
  return threePlus.concat(pairs,singles);
}


function hand(holeCards, communityCards) {
  
  let allCards = holeCards.concat(communityCards).map(card => 
    {
    let out = {};
    out.rank = card.length === 2 ? card[0] : card.slice(0,2);
    out.suit = card[card.length-1];
    return out;
  });
  
  let bestHand = permutator(allCards)
    .map(cards => findValue(cards))
    .reduce((best, value) => best[2] > value[2] ? best : value);

  

  let out = {};
  out.type = bestHand[1];
  out.ranks = createRanks(bestHand[0].map(card => card.rank)
    .sort((a,b) => ranks.indexOf(a) - ranks.indexOf(b)));


  return out;
}

