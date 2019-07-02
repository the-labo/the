/**
 * Test for entryAccessFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const {
  scopes: { ObjectScope, ScopeScope },
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
    const caught = entryAccess
      .process(() => {
        const e = new Error('failed to input')
        e.entryErrors = {
          username: {
            minLength: '1',
            reason: 'TOO_SHORT',
          },
        }
        throw e
      })
      .then(() => null)
      .catch((e) => e)
    ok(!!caught)
    ok(entryAccess.getEntryErrors())
  })
})

/* global describe, before, after, it */
