/**
 * Has more for counts
 * @function hasMoreFor
 */
'use strict'

/** @lends hasMoreFor */
function hasMoreFor(counts) {
  if (!counts) {
    return false
  }
  const { length, offset, total } = counts
  return offset + length < total
}

module.exports = hasMoreFor
