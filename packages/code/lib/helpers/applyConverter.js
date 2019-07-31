'use strict'

/**
 * @memberof module:@the-/code
 * @function applyConverter
 */
/** @lends module:@the-/code.applyConverter */
async function applyConverter(content, convert, options = {}) {
  const { name = 'anonymous' } = options
  const max = 1000
  let count = 1
  let converted = await convert(content)
  while (content !== converted) {
    content = converted
    converted = await convert(content)
    count++
    if (count > max) {
      throw new Error(`[TheCode][${name}] Convert loops!`)
    }
  }
  return converted
}

module.exports = applyConverter
