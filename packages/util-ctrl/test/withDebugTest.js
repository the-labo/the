/**
 * Test for withDebug.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal },
} = require('assert')
const withDebug = require('../lib/withDebug')

describe('with-debug', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const ctrl = withDebug({
      async sayYo() {
        return 'yo'
      },
    })
    equal(await ctrl.sayYo(), 'yo')
  })
})

/* global describe, before, after, it */
