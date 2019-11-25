/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const { renderErrorMessage } = require('../shim/helpers')

describe('helpers', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(renderErrorMessage)
  })
})

/* global describe, before, after, it */
