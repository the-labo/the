/**
 * Test for TheChatTimeLine.
 * Runs with mocha.
 */
'use strict'

const TheChatTimeLine = require('../shim/TheChatTimeLine').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-chat-time-line', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheChatTimeLine))
  })
})

/* global describe, before, after, it */
