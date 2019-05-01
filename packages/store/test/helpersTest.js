/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert').strict
const helpers = require('../lib/helpers')

describe('helpers', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const parsed = helpers.parseDef({
      _: {
        foo: {
          bar: 'BOOL',
        },
        input: {
          entry: 'OBJ',
        },
      },

      input01: { $ref: '#/_/input' },
      input02: { $ref: '_.input' },
      input03: { $ref: ['_.foo', '_.input'] },
      input04: { $ref: [] },
    })
    deepEqual(parsed, {
      'input01.entry': 'OBJ',
      'input02.entry': 'OBJ',
      'input03.bar': 'BOOL',
      'input03.entry': 'OBJ',
    })
  })
})

/* global describe, before, after, it */
