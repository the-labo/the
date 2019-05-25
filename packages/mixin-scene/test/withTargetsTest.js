'use strict'
/**
 * Test for withTargets.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const withTargets = require('../lib/withTargets')

describe('with-targets', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const C = withTargets(class {})
    const c = new C()
    ok(c)
  })
})

/* global describe, before, after, it */
