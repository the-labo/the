/**
 * Test for withBusy.
 * Runs with mocha.
 */
'use strict'

const withBusy = require('../lib/withBusy')
const { ok, equal } = require('assert')

describe('with-busy', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    withBusy.while({}, null, { value: () => null })
  })
})

/* global describe, before, after, it */
