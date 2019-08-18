'use strict'

const { EOL } = require('os')

/**
 * @memberof module:@the-/scaffold
 * @function listTypes
 * @param tmpls
 */
function listTypes(tmpls) {
  console.log(`${EOL}$ the-scaffold <type> <dest>${EOL}`)
  const types = Object.keys(tmpls)
    .map((type) => `  ${type}`)
    .join(EOL)
  console.log(`Available types: ${EOL}${EOL}${types}${EOL}`)
}

module.exports = listTypes
