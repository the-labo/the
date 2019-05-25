'use strict'
/**
 * Test for TheChat.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheChat = require('../shim/TheChat').default

describe('the-chat', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheChat))
  })
})

/* global describe, before, after, it */
