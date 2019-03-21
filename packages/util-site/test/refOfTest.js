/**
 * Test for refOf.
 * Runs with mocha.
 */
'use strict'

const refOf = require('../lib/refOf')
const {ok, equal} = require('assert')

describe('ref-of', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    equal(
      refOf({$$as: 'User', id: 3}),
      'User#3'
    )
  })
})

/* global describe, before, after, it */
