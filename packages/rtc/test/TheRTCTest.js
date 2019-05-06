/**
 * Test for TheRTC.
 * Runs with mocha.
 */
'use strict'

const aport = require('aport')
const asleep = require('asleep')
const { equal, ok } = require('assert').strict
const socketIOClient = require('socket.io-client')
const { TheRTCClient } = require('@the-/rtc-client')
const IOEvents = require('../lib/constants/IOEvents')
const TheRTC = require('../lib/TheRTC')

describe('the-rtc', () => {
  before(async () => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheRTC)

    const port = await aport()
    const rtc = new TheRTC()

    await rtc.listen(port)

    {
      const received = {}
      const client = socketIOClient.connect(`http://localhost:${port}/rtc`)
      client.on(IOEvents.CONFIG_ICE_SERVERS, (iceServers) => {
        received.iceServers = iceServers
      })
      client.on(IOEvents.ROOM_STATE, (roomState) => {
        received.roomState = roomState
      })
      client.emit(IOEvents.ROOM_JOIN, { roomName: 'hoge' })
      client.emit(IOEvents.ROOM_LEAVE)
      await asleep(200)
      client.close()
      ok(received.iceServers)
      ok(received.roomState)
      ok(received.roomState.clients)
    }
    await asleep(100)
    await rtc.close()
  })

  it('Two clients', async () => {
    ok(TheRTCClient)

    const port = await aport()
    const rtc = new TheRTC()
    await rtc.listen(port)

    await asleep(100)
    {
      const c01 = new TheRTCClient()
      const c02 = new TheRTCClient()
      await c01.connect(`http://localhost:${port}`, { forceNew: true })
      await c02.connect(`http://localhost:${port}`, { forceNew: true })

      {
        await c01.join('hoge')
        await c02.join('hoge')

        const received = await new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('Time out'))
          }, 1000)
          c01.subscribe('chat01', ({ payload }) => {
            resolve(payload)
          })
          void c02.publish('chat01', { message: 'hi there' })
        })
        ok(received)
        equal(received.message, 'hi there')

        await c01.leave()
        await c02.leave()
      }

      await c01.disconnect()
      await c02.disconnect()
    }

    await rtc.close()
  })

  it('SFU', async () => {
    const port = await aport()
    const rtc = new TheRTC({
      topology: 'sfu',
    })
    await rtc.listen(port)
    {
      const c01 = new TheRTCClient()
      const c02 = new TheRTCClient()
      await c01.connect(`http://localhost:${port}`, { forceNew: true })
      await c02.connect(`http://localhost:${port}`, { forceNew: true })

      {
        const roomName = 'room-01'
        await c01.join(roomName)
        await c02.join(roomName)

        {
          const received = await new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('Time out'))
            }, 1000)
            c01.subscribe('chat01', ({ payload }) => {
              resolve(payload)
            })
            void c02.publish('chat01', { message: 'hi there' })
          })
          ok(received)
          equal(received.message, 'hi there')
        }

        {
          const received = await new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('Time out'))
            }, 1000)
            c02.subscribe('chat01', ({ payload }) => {
              resolve(payload)
            })
            void c01.publish('chat01', { message: 'hi there' })
          })
          ok(received)
          equal(received.message, 'hi there')
        }

        await c01.leave()
        await c02.leave()
      }

      await c01.disconnect()
      await c02.disconnect()
    }
    await rtc.close()
  })
})

/* global describe, before, after, it */
