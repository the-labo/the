/**
 * Test for entryAccessFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { deepEqual, equal, ok, doesThrow },
} = require('assert')
const {
  scopes: {ObjectScope, BooleanScope, ScopeScope, StringScope, ValueScope },
} = require('@the-/scope')
const theStore = require('@the-/store')
const entryAccessFor = require('../lib/entryAccessFor')

describe('entry-access-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(ObjectScope, 'entry')
    x.load(ObjectScope, 'entryErrors')
    const entryAccess = entryAccessFor(x)
    doesThrow(() => {
      entryAccess.process(() => {
        const e = new Error('failed to input')
        e.entryErrors = {
          username: {
            reason: 'TOO_SHORT',
            minLength: '1',
          }
        }
        throw e
      })
    })
    ok(entryAccess.getEntryErrors())
  })
})

/* global describe, before, after, it */
