/**
 * Test for valuesFromEntity.
 * Runs with mocha.
 */
'use strict'

const valuesFromEntity = require('../lib/valuesFromEntity')
const { ok, strictEqual: equal, deepStrictEqual: deepEqual } = require('assert')

describe('values-from-entity', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    deepEqual(valuesFromEntity({
      $$as: 'Ball',
      id: 1,
      name: 'b01'
    }), {
      id: 1,
      name: 'b01',
    })
  })
})

/* global describe, before, after, it */
