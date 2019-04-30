/**
 * Alias of {@memberOf module:@the-/polyfill
 * @function default
 * @link module:@the-/polyfill.create}
 */
'use strict'

const create = require('./create')
const ThePolyfill = require('./ThePolyfill')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.ThePolyfill = ThePolyfill
exports.create = create

module.exports = Object.assign(lib, {
  ThePolyfill,
  create,
})
