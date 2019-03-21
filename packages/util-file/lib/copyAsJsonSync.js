/**
 * @function copyAsJsonSync
 * @param {string} src
 * @param {string} dest
 */
'use strict'

const readAsJsonSync = require('./readAsJsonSync')
const writeAsJsonSync = require('./writeAsJsonSync')

/** @lends copyAsJsonSync */
function copyAsJsonSync(src, dest) {
  const data = readAsJsonSync(src)
  if (data) {
    writeAsJsonSync(dest, data)
  }
  return false
}

module.exports = copyAsJsonSync
