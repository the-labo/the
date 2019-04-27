/**
 * Test for TheChatForm.
 * Runs with mocha.
 */
'use strict'

const TheChatForm = require('../shim/TheChatForm').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-chat-form', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheChatForm))
  })
})

/* global describe, before, after, it */
