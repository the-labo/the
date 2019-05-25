'use strict'
/**
 * Test for isKeyCode.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const isKeyCode = require('../lib/isKeyCode')

describe('is-key-code', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    ok(isKeyCode.enter(13))
    ok(isKeyCode.enter('13'))
  })
})

/* global describe, before, after, it */
