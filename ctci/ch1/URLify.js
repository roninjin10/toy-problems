const URLify = (str) => {
  return str
    .split('')
    .map(c => c === ' ' ? '%20' : c)
    .join('')
}

module.exports = URLify