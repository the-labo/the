'use strict'
/**
 * Test for webStreams.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const { ReadableStream, WritableStream } = require('../lib/helpers/webStreams')

describe('web-streams', () => {
  before(() => {})

  after(() => {})

  it('ReadableStream test', async () => {
    let readableController
    const stream = new ReadableStream({
      pull: (controller) => {
        controller.enqueue('hoge3')
      },
      start: (controller) => {
        console.log('start')
        readableController = controller
        controller.enqueue('hoge')
        controller.enqueue('hoge2')
      },
    })
    ok(!stream.locked)
    const reader = stream.getReader()
    ok(stream.locked)
    equal((await reader.read()).value, 'hoge')
    await reader.releaseLock()
    const reader2 = stream.getReader()
    equal((await reader2.read()).value, 'hoge2')
    equal((await reader2.read()).value, 'hoge3')
    equal((await reader2.read()).value, 'hoge3')
    equal((await reader2.read()).value, 'hoge3')
    equal((await reader2.read()).value, 'hoge3')
    await readableController.close()
    await reader2.releaseLock()
    const reader3 = stream.getReader()
    equal((await reader3.read()).value, 'hoge3')
    equal((await reader3.read()).done, true)
    equal((await reader3.read()).done, true)
    equal((await reader3.read()).done, true)
    equal((await reader3.read()).done, true)
  })

  it('WritableStream test', async () => {
    const stream = new WritableStream({
      start: () => {},
      write: (chunk) => {
        console.log('on write', chunk)
      },
    })

    const writer = await stream.getWriter()
    writer.write('hoge')
    writer.close()
  })
})

/* global describe, before, after, it */
