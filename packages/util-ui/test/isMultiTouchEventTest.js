/**
 * Test for isMultiTouchEvent.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const isMultiTouchEvent = require('../lib/isMultiTouchEvent')

describe('is-multi-touch-event', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(isMultiTouchEvent)
  })
})

/* global describe, before, after, it */
