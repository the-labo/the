/**
 * Test case for index
 */
'use strict'

const { ok } = require('assert')
const index = require('../index')

describe('index', () => {

  it('rules', () => {
    for (const [k, v] of Object.entries(index.rules)) {
      ok(/jsdoc/.test(k), `[${k}] valid prefix`)
      ok(['error', 'warn', 'off'].includes(v), `[${k}] valid value`)
    }
  })
})

/* global describe, it */
