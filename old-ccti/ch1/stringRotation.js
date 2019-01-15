// check if str2 is a substring of str1
const isSubstring = (str1, str2) => {
  return str1.includes(str2)
}

const isStringRotation = (str1, str2) => {
   return isSubstring(str1 + str1, str2)
}

module.exports = isStringRotation