const stringCompression = (str) => {
  const out = ''
  let i = 0
  while (i < str.length) {
    let run = 0
    const c = str[i]
    while(i < str.length && c === str[i]) {
      run++
      i++
    }
    out += c + run
  }
  return out.length < str.length ? out : str
}

module.exports = stringCompression