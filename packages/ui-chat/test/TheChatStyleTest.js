/**
 * Test for TheChatStyle.
 * Runs with mocha.
 */
'use strict'

const TheChatStyle = require('../shim/TheChatStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-chat-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheChatStyle))
  })
})

/* global describe, before, after, it */
