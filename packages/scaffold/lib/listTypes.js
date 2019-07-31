'use strict'

/**
 * @memberof module:@the-/scaffold
 * @function listTypes
 */
const { EOL } = require('os')

/** @lends module:@the-/scaffold.listTypes */
function listTypes(tmpls) {
  console.log(`${EOL}$ the-scaffold <type> <dest>${EOL}`)
  const types = Object.keys(tmpls)
    .map((type) => `  ${type}`)
    .join(EOL)
  console.log(`Available types: ${EOL}${EOL}${types}${EOL}`)
}

module.exports = listTypes
