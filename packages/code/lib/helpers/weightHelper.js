'use strict'
module.exports = {
  weightModuleName(name) {
    if (!name) {
      return 0
    }
    let weight = 0
    if (/^@/.test(name)) {
      weight += 1
    }
    if (/^\.\//.test(name)) {
      weight += 2
    }
    const matched = name.match(/\.\.\//g)
    if (matched) {
      weight += matched.length * 2 + 1
    }

    return weight
  },
}
