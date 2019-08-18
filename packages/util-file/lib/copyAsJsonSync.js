'use strict'

const readAsJsonSync = require('./readAsJsonSync')
const writeAsJsonSync = require('./writeAsJsonSync')

/**
 * @memberof module:@the-/util-file
 * @function copyAsJsonSync
 * @param {string} dest
 * @param {string} src
 * @returns {*}
 */
function copyAsJsonSync(src, dest) {
  const data = readAsJsonSync(src)
  if (data) {
    writeAsJsonSync(dest, data)
  }

  return false
}

module.exports = copyAsJsonSync
