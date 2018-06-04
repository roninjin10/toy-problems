const isUnique = (str) => {
  let chars = new Set()
  for (const c of str) {
    if (chars.has(c)) {
      return false
    }
    chars.add(c)
  }
  return true
}

module.exports = isUnique