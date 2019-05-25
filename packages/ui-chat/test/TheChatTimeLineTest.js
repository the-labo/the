'use strict'
/**
 * Test for TheChatTimeLine.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheChatTimeLine = require('../shim/TheChatTimeLine').default

describe('the-chat-time-line', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChatTimeLine))
  })
})

/* global describe, before, after, it */
