/**
 * Test for TheChat.
 * Runs with mocha.
 */
'use strict'

const TheChat = require('../shim/TheChat').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-chat', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheChat))
  })
})

/* global describe, before, after, it */
