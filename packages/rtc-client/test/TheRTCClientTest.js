/**
 * Test for TheRTCClient.
 * Runs with mocha.
 */
'use strict'

const aport = require('aport')
const asleep = require('asleep')
const { equal, ok } = require('assert').strict
const theRTC = require('@the-/rtc')
const TheRTCClient = require('../lib/TheRTCClient')

describe('the-rtc-client', function() {
  this.timeout(150000)
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheRTCClient)

    const port = await aport()
    const rtc = theRTC()
    await rtc.listen(port)

    await asleep(1000)
    {
      const c01 = new TheRTCClient()
      const c02 = new TheRTCClient()
      await c01.connect(`http://localhost:${port}`, { forceNew: true })
      await c02.connect(`http://localhost:${port}`, { forceNew: true })

      {
        await c01.join('hoge')
        await c02.join('hoge')

        const received = await new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error(`Timeout`)), 1000)
          c01.subscribe('greeting', ({ payload, topic }) => {
            resolve(payload, topic)
          })
          void c02.publish('greeting', { message: 'hi there' })
        })
        ok(received)
        equal(received.message, 'hi there')

        await asleep(100)

        await c01.leave()
        await c02.leave()
      }

      await c01.disconnect()
      await c02.disconnect()
    }

    rtc.close()
  })
})

/* global describe, before, after, it */
