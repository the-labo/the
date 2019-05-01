/**
 * Test for colorWithText.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const colorWithText = require('../lib/colorWithText')

describe('color-with-text', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(colorWithText('hoge'), colorWithText('hoge'))
    // console.log(colorWithText('foo', {base: '#E11'}))
  })
})

/* global describe, before, after, it */
