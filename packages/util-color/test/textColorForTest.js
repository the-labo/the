'use strict'

/**
 * Test for textColorFor.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const textColorFor = require('../lib/textColorFor')

describe('text-color-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(textColorFor('#FFF'), '#333333')

    equal(textColorFor('#38A'), '#FFFFFF')
  })
})

/* global describe, before, after, it */
