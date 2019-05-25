'use strict'
/**
 * Test for TheChatForm.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheChatForm = require('../shim/TheChatForm').default

describe('the-chat-form', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChatForm))
  })
})

/* global describe, before, after, it */
