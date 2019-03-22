/**
 * Build script for the-projects
 * @module @the-/script-build
 * @version 15.0.5
 */

'use strict'

const build = require('./build')
const lib = build.bind(this)

Object.assign(lib, {
  build
})

module.exports = lib