/**
 * Doc script for the-projects
 * @module @the-/script-doc
 * @version 15.1.4
 */

'use strict'

const doc = require('./doc')
const lib = doc.bind(this)

Object.assign(lib, {
  doc,
})

module.exports = lib
