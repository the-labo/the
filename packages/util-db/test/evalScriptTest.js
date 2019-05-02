/**
 * Test for evalScript.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const evalScript = require('../lib/evalScript')

describe('eval-script', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(evalScript('1+2'), 3)
    ok(evalScript('1+a', { variables: { a: 3 } }), 4)
  })
})

/* global describe, before, after, it */
