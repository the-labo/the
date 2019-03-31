/**
 * Test case for SupportedProps.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const co = require('co')
const SupportedProps = require('../lib/SupportedProps')

describe('supported-props', function() {
  this.timeout(3000)

  before(() => co(function*() {}))

  after(() => co(function*() {}))

  it('Supported props', () =>
    co(function*() {
      for (let name of Object.keys(SupportedProps)) {
        ok(SupportedProps[name])
      }
    }))
})

/* global describe, before, after, it */
