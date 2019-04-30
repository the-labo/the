/**
 * @memberOf module:@the-/code
 * @function applyConverter
 */
'use strict'

/** @lends module:@the-/code.applyConverter */
async function applyConverter(content, convert, options = {}) {
  const max = 1000
  let count = 1
  let converted = await convert(content)
  while (content !== converted) {
    content = converted
    converted = await convert(content)
    count++
    if (count > max) {
      throw new Error(`[TheCode] Convert loops!`)
    }
  }
  return converted
}

module.exports = applyConverter
