
const find0s = (matrix) => {
  const row0s = new Set()
  const col0s = new Set()
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        row0s.add(i)
        col0s.add(j)
      }
    }
  }
  return { row0s, col0s }
}

const zeroMatrix = (matrix) => {
  const { row0s, col0s } = find0s(matrix)

  let out = [...zeroMatrix]
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (row0s.has(i) || col0s.has(j)) {
        out[i][j] = 0
      }
    }
  }
  return out
}