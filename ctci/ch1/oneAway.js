const checkRemove = (str1, str2, i) => {
  return str1.slice(0, i) + str1.slice(i + 1) === str2
}

const checkInsert = (str1, str2, i) => {
  return str1.slice(0, i) + str2[i] + str1.slice(i) === str2
}

const checkReplace = (str1, str2, i) => {
  return str1.slice(0, i) + str2[i] + str1.slice(i + 1) === str2
}

const oneAway = (str1, str2) => {
  for (let i = 0; i <= str1.length; i++) {
    if (
      checkRemove(str1, str2, i) ||
      checkRemove(str2, str1, i) ||
      checkInsert(str1, str2, i) ||
      checkInsert(str2, str1, i) ||
      checkReplace(str1, str2, i) ||
      checkReplace(str2, str1, i)
    ) {
      return true
    }
  }
  return str1 === str2
}

module.exports = oneAway