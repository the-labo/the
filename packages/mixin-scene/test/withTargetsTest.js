/**
 * Test for withTargets.
 * Runs with mocha.
 */
'use strict'

const withTargets = require('../lib/withTargets')
const {ok, equal} = require('assert')

describe('with-targets', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const C = withTargets(class {})
    const c = new C
    ok(c)
  })
})

/* global describe, before, after, it */
