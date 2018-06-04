const rotateMatrix = (matrix) => {
  let out = [...matrix]
  let l = matrix.length
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l; j++) {
      out[l - j, l - i] = matrix[i, j]
    }
  }
  return out
}

module.exports = rotateMatrix