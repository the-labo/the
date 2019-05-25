'use strict'
/**
 * Test for TheChatStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheChatStyle = require('../shim/TheChatStyle').default

describe('the-chat-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChatStyle))
  })
})

/* global describe, before, after, it */
