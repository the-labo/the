/**
 * @function assertMethods
 * @param {function} Class
 * @param {string[]} reservedNames
 * @throws {Error} The server error
 */
'use strict'

/** @lends assertMethods */
function assertMethods(Class, reservedNames) {
  for (const name of reservedNames) {
    const hit = Class.prototype[name]
    if (hit) {
      throw new Error(
        `[TheServer] You can not define method with name "${name}"`,
      )
    }
  }
}

module.exports = assertMethods
