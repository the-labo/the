'use strict'
/**
 * Alias of {@link module:@the-/controller.create}
 * @memberof module:@the-/controller
 * @function default
 */
const create = require('./create')
const TheCtrl = require('./TheCtrl')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheCtrl = TheCtrl
exports.create = create

module.exports = Object.assign(lib, {
  TheCtrl,
})
