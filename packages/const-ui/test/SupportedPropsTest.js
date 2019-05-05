/**
 * Test case for SupportedProps.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const SupportedProps = require('../lib/SupportedProps')

describe('supported-props', function() {
  this.timeout(3000)

  it('Supported props', () => {
    for (const name of Object.keys(SupportedProps)) {
      ok(SupportedProps[name])
    }
  })
})

/* global describe, it */
