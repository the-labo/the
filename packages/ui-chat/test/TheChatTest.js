'use strict'
/**
 * Test for TheChat.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheChat } = require('../shim/TheChat')

describe('the-chat', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChat))
  })
})

/* global describe, before, after, it */
