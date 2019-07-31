'use strict'

/**
 * Test for TheChatForm.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheChatForm } = require('../shim/TheChatForm')

describe('the-chat-form', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChatForm))
  })
})

/* global describe, before, after, it */
