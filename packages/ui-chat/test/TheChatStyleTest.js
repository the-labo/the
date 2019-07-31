'use strict'

/**
 * Test for TheChatStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheChatStyle } = require('../shim/TheChatStyle')

describe('the-chat-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChatStyle))
  })
})

/* global describe, before, after, it */
