/**
 * Test for isServerSide.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
const isServerSide = require('../lib/isServerSide')

describe('is-server-side', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    ok(isServerSide())
  })
})

/* global describe, before, after, it */
