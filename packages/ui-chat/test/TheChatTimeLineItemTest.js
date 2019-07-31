'use strict'

/**
 * Test for TheChatTimeLineItem.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheChatTimeLineItem } = require('../shim/TheChatTimeLineItem')

describe('the-chat-time-line-item', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChatTimeLineItem))
  })
})

/* global describe, before, after, it */
