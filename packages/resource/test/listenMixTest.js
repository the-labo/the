/**
 * Test for listenMix.
 * Runs with mocha.
 */
'use strict'

const { equal } = require('assert').strict
const EventEmitter = require('events')
const listenMix = require('../lib/mixins/listenMix')

describe('listen-mix', () => {
  before(() => {})

  after(() => {})

  it('Close listeners', async () => {
    const Foo = listenMix(class Base extends EventEmitter {})
    const foo = new Foo()

    const close = foo.listenEvents({
      onCreate() {},
    })
    equal(foo.listenerCount('onCreate'), 1)
    close()
    equal(foo.listenerCount('onCreate'), 0)
  })
})

/* global describe, before, after, it */
