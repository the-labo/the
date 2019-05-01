/**
 * Test case for SupportedProps.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const SupportedProps = require('../lib/SupportedProps')

describe('supported-props', function () {
  this.timeout(3000)

  it('Supported props', () => {
    for (let name of Object.keys(SupportedProps)) {
      ok(SupportedProps[name])
    }
  })
})

/* global describe, before, after, it */
