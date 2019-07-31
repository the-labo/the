'use strict'
const applyToNodes = (nodes, convert) => {
  for (const node of nodes) {
    const converted = convert(node)
    if (converted) {
      return converted
    }
  }
  return null
}

module.exports = applyToNodes
