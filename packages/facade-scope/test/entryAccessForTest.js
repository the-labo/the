/**
 * Test for entryAccessFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { deepEqual, ok },
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

    entryAccess.set({ username: 'user1' })
    entryAccess.set({ password: 'pass1' })
    deepEqual(entryAccess.getEntry(), { password: 'pass1', username: 'user1' })

    entryAccess.reset({ username: 'user' })
    deepEqual(entryAccess.getEntryErrors(), {})
    deepEqual(entryAccess.getEntry(), { username: 'user' })
  })

  it('Handle nested', () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(ObjectScope, 'entry')
    x.load(ObjectScope, 'entryErrors')
    const entryAccess = entryAccessFor(x)

    entryAccess.set({
      'a[0]': 1,
    })
    entryAccess.set({
      'a[1]': 2,
    })
    deepEqual(store.x.entry.state, { 'a[0]': 1, 'a[1]': 2, 'a[length]': 2 })
  })
})

/* global describe, before, after, it */
