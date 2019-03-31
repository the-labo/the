/**
 * Test for TheVideo.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheVideo = require('../shim/TheVideo').default

describe('the-video', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheVideo))
  })
})

/* global describe, before, after, it */
