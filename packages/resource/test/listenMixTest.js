/**
 * Test for listenMix.
 * Runs with mocha.
 */
'use strict'

const listenMix = require('../lib/mixins/listenMix')
const { ok, equal } = require('assert')
const EventEmitter = require('events')
const asleep = require('asleep')

describe('listen-mix', () => {
  before(() => {
  })

  after(() => {
  })

  it('Close listeners', async () => {
    const Foo = listenMix(class Base extends EventEmitter {})
    const foo = new Foo()

    const close = foo.listenEvents({
      onCreate () {}
    })
    equal(foo.listenerCount('onCreate'), 1)
    close()
    equal(foo.listenerCount('onCreate'), 0)
  })
})

/* global describe, before, after, it */
