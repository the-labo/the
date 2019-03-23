/**
 * Test for isKeyCode.
 * Runs with mocha.
 */
'use strict'

const isKeyCode = require('../lib/isKeyCode')
const React = require('react')
const { ok, equal } = require('assert').strict

describe('is-key-code', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    ok(isKeyCode.enter(13))
    ok(isKeyCode.enter('13'))
  })
})

/* global describe, before, after, it */
