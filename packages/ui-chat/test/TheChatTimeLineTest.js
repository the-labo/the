'use strict'

/**
 * Test for TheChatTimeLine.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheChatTimeLine } = require('../shim/TheChatTimeLine')

describe('the-chat-time-line', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChatTimeLine))
  })
})

/* global describe, before, after, it */
