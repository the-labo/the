/**
 * Test for ThePack.
 * Runs with mocha.
 */
'use strict'

const ThePack = require('../lib/ThePack')
const { ok, strictEqual: equal, deepStrictEqual: deepEqual } = require('assert')

describe('the-pack', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(ThePack)
    const pack = new ThePack()

    deepEqual(
      pack.decode(pack.encode({ foo: 'bar' })),
      { foo: 'bar' },
    )

    equal(pack.decode(null), null)
    equal(pack.encode(null), null)

    equal(pack.decode(pack.encode('hoge')), 'hoge')
    equal(pack.decode(pack.encode(1)), 1)
    equal(pack.decode(pack.encode(null)), null)
  })

  it('Passing props', () => {
    const pack = new ThePack()
    ok(
      pack.decode(pack.encode({ foo: () => 'f' })),
    )
  })

  it('Try circular', () => {
    const pack = new ThePack()
    const a = { prop01: 1 }
    const b = { a }
    a.b = b
    let caught
    try {
      pack.encode(b)
    } catch (e) {
      caught = e
    }
    ok(caught)
  })
})

/* global describe, before, after, it */
