'use strict'

/**
 * Has more for counts
 * @memberof module:@the-/util-site
 * @function hasMoreFor
 * @param counts
 * @returns {*}
 */
function hasMoreFor(counts) {
  if (!counts) {
    return false
  }

  const { length, offset, total } = counts
  return offset + length < total
}

module.exports = hasMoreFor
