'use strict'

/**
 * Alias of {@link module:@the-/axe.create}
 * @memberof module:@the-/axe
 * @namespace default
 */
const create = require('./create')
const TheAxe = require('./TheAxe')

const singleton = create()

module.exports = Object.assign(singleton, {
  TheAxe,
  create,
})
