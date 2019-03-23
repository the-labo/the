/**
 * Test for isServerSide.
 * Runs with mocha.
 */
'use strict'

const isServerSide = require('../lib/isServerSide')
const React = require('react')
const { ok, equal } = require('assert')

describe('is-server-side', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    ok(isServerSide())
  })
})

/* global describe, before, after, it */
