'use strict'

/**
 * Find randomly
 * @memberof module:@the-/util-array
 * @function randomFind
 * @returns {function()}
 * @example
 *   [1,2,3].find(randomFind())
 */
/** @lends module:@the-/util-array.randomFind */
function randomFind() {
  if (arguments.length > 2) {
    throw new Error('[randomFind] Invalid args.')
  }
  let hit = -1
  return function find(v, i, arr) {
    if (i === 0) {
      hit = parseInt(arr.length * Math.random())
    }
    return hit === i
  }
}

module.exports = randomFind
