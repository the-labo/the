'use strict'
/**
 * Test for TheStream.
 * Runs with mocha.
 */
const asleep = require('asleep')
const {
  strict: { deepEqual, ok },
} = require('assert')
const TheStream = require('../lib/TheStream')

describe('the-stream', () => {
  before(() => {})

  after(() => {})

  it('Example', async () => {
    const consumedInStream = []
    const providedFromStream = []

    class CountupStream extends TheStream {
      streamDidOpen() {}

      streamWillClose() {}

      async consume(provider) {
        for await (const chunk of provider) {
          consumedInStream.push(chunk)
        }
      }

      async *provide() {
        const values = ['p1', 'p2', 'p3']
        for (const v of values) {
          yield await v
        }
      }
    }

    const stream = new CountupStream({})

    await stream.open()

    // Pushing values to stream
    await stream.push('a1')
    await stream.push('a2')
    await stream.push('a3')

    deepEqual(consumedInStream, ['a1', 'a2', 'a3'])

    await stream.pushEnd()

    // Pulling values from stream
    providedFromStream.push(
      await stream.pull(),
      await stream.pull(),
      await stream.pull(),
    )

    await stream.pull()
    ok(stream.pullDone)

    deepEqual(providedFromStream, ['p1', 'p2', 'p3'])

    await stream.close()
  })

  it('Fast consuming', async () => {
    const consumed = []

    class Stream extends TheStream {
      async consume(provider) {
        for await (const chunk of provider) {
          consumed.push(chunk)
        }
      }
    }

    const stream = new Stream({})
    await stream.open()
    await stream.push('hoge')
    await stream.push('hoge')
    await asleep(30)
    await stream.push('hoge')
    await stream.push('hoge')
    await stream.push('hoge')
    await stream.push('hoge')
    await stream.pushEnd()
    await stream.close()
  })
})

/* global describe, before, after, it */
