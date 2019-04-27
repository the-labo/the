/**
 * Test for TheChatTimeLineItem.
 * Runs with mocha.
 */
'use strict'

const TheChatTimeLineItem = require('../shim/TheChatTimeLineItem').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-chat-time-line-item', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheChatTimeLineItem))
  })
})

/* global describe, before, after, it */
