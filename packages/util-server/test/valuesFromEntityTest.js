'use strict'
/**
 * Test for valuesFromEntity.
 * Runs with mocha.
 */
const { deepStrictEqual: deepEqual } = require('assert').strict
const valuesFromEntity = require('../lib/valuesFromEntity')

describe('values-from-entity', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    deepEqual(
      valuesFromEntity({
        $$as: 'Ball',
        id: 1,
        name: 'b01',
      }),
      {
        id: 1,
        name: 'b01',
      },
    )
  })
})

/* global describe, before, after, it */
