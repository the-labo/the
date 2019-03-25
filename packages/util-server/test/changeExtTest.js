/**
 * Test for changeExt.
 * Runs with mocha.
 */
'use strict'

const changeExt = require('../lib/changeExt')
const {ok, equal} = require('assert')

describe('change-ext', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    equal(
      changeExt('hoge.txt', '.raw'),
      'hoge.raw'
    )
  })
})

/* global describe, before, after, it */
