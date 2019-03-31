/**
 * Test for textColorFor.
 * Runs with mocha.
 */
'use strict'

const textColorFor = require('../lib/textColorFor')
const {ok, equal} = require('assert')

describe('text-color-for', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    equal(
      textColorFor('#FFF'),
      '#333333'
    )

    equal(
      textColorFor('#38A'),
      '#FFFFFF'
    )
  })
})

/* global describe, before, after, it */
