/**
 * Test for toggleBodyClass.
 * Runs with mocha.
 */
'use strict'

const toggleBodyClass = require('../lib/toggleBodyClass')
const React = require('react')
const { ok, equal } = require('assert').strict

describe('toggle-body-class', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    toggleBodyClass('hoge', 1)
  })
})

/* global describe, before, after, it */
