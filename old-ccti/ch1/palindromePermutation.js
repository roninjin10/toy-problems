const countLetters = (str) => {
  let out = {}
  for (const c of str) {
    out[c] = (out[c] || 0) + 1
  }
  return out
}

const palindromePermutation = (str) => {
  const count = countLetters(str)
  let odds = 0
  for (const c of count) {
    if (count[c] % 2 === 1) {
      odds++
    }
  }
  return odds <= 1
}

module.exports = palindromePermutation