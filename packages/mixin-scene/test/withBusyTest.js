'use strict'

/**
 * Test for withBusy.
 * Runs with mocha.
 */
const withBusy = require('../lib/withBusy')

describe('with-busy', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    withBusy.while({}, null, { value: () => null })
  })
})

/* global describe, before, after, it */
