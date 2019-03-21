/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

const helpers = require('../lib/helpers')
const {ok, equal, deepEqual} = require('assert')

describe('helpers', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const parsed = helpers.parseDef({
      '_': {
        input: {
          entry: 'OBJ'
        },
        foo: {
          bar: 'BOOL'
        }
      },

      input01: {$ref: '#/_/input'},
      input02: {$ref: '_.input'},
      input03: {$ref: ['_.foo', '_.input']},
      input04: {$ref: []},
    })
    deepEqual(parsed, {
      'input01.entry': 'OBJ',
      'input02.entry': 'OBJ',
      'input03.bar': 'BOOL',
      'input03.entry': 'OBJ'
    })
  })
})

/* global describe, before, after, it */
