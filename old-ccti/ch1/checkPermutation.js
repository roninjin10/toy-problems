const countLetters = (str) => {
  let out = {}
  for (const c of str) {
    out[c] = (out[c] || 0) + 1
  }
  return out
}

const checkPermutation = (str1, str2) => {
  const count1 = countLetters(str1)
  const count2 = countLetters(str2)

  if (Object.keys(count1).length !== Object.keys(count2).length) {
    return false
  }

  for (const c of Object.keys(count1)) {
    if (count1[c] !== count2[c]) {
      return false
    }
  }
  return true
}

module.exports = checkPermutation