/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

import { deepEqual, ok } from 'assert'
import React from 'react'
import { normalizeOptions } from '../lib/helpers'

describe('helpers', () => {
  before(() => {})

  after(() => {})

  it('normalizeOptions', () => {
    ok(normalizeOptions)
    deepEqual(normalizeOptions(['foo']), { foo: 'foo' })
    deepEqual(normalizeOptions({ foo: 'bar' }), { foo: 'bar' })
  })
})

/* global describe, before, after, it */
