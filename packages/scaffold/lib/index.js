/**
 * Scaffold for the-projects
 * @module @the-/scaffold
 */

'use strict'

const theScaffold = require('./theScaffold')
const tmpls = require('./tmpls.json')

const lib = theScaffold.bind(this)

Object.assign(lib, theScaffold, {
  tmpls,
  theScaffold
})

module.exports = lib