/**
 * Test script for the-project
 * @module @the-/script-test
 * @version 15.2.2
 */

'use strict'

const test = require('./test')
const lib = test.bind(this)

Object.assign(lib, {
  test,
})

module.exports = lib
