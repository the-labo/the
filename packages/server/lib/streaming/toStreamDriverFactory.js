/**
 * @memberof module:@the-/server.streaming
 * @protected
 * @function toStreamDriverFactory
 */
'use strict'

const asleep = require('asleep')
const isClass = require('is-class')
const theAssert = require('@the-/assert')
const { unlessProduction } = require('@the-/check')
const { TheStream } = require('@the-/stream')
const SessionAccess = require('../helpers/SessionAccess')
const assert = theAssert('@the-/server')

/** @lends module:@the-/server.streaming.toStreamDriverFactory */
function toStreamDriverFactory(StreamFactory, options = {}) {
  const { inject, sessionStore, streamName } = options
  unlessProduction(() => {
    assert(!!StreamFactory, `[TheServer] Controller "${streamName}" is missing`)

    assert(
      !isClass(StreamFactory),
      `class base ctrl is no longer available: "${streamName}"`,
    )
  })

  function StreamDriverFactory({ cid, ioConnector, params, sid }) {
    const { proxy: session } = SessionAccess(sessionStore, cid)

    class Stream extends TheStream {
      async consume(provided) {}

      async streamDidCatch(error) {
        const result = await super.streamDidCatch(error)
        void ioConnector.sendStreamError(cid, sid, error)
        return result
      }

      async streamDidOpen() {
        const result = await super.streamDidOpen()
        await ioConnector.sendStreamDidOpen(cid, sid)
        for await (const chunk of this.provider.toGenerator()) {
          await ioConnector.sendStreamChunk(cid, sid, chunk)
        }
        await asleep(10)
        await ioConnector.sendStreamFin(cid, sid)
        return result
      }

      async streamWillClose() {
        const result = await super.streamWillClose()
        await ioConnector.sendStreamDidClose(cid, sid)
        return result
      }

      async *provide() {}
    }

    const stream = new Stream()
    const {
      consume = stream.consume,
      provide = stream.provide,
      ...unknown
    } = StreamFactory({
      ...inject(),
      handle: {
        get closed() {
          return stream.closed
        },
        close: () => stream.close(),
      },
      params,
      session,
      intercept: () => {
        // TODO
      },
    })
    const unknownKeys = Object.keys(unknown)
    assert(unknownKeys.length === 0, `unknown keys: ${unknown}`)

    stream.streamName = streamName
    stream.sid = sid
    stream.consume = consume.bind(stream)
    stream.provide = provide.bind(provide)
    stream.session = new Proxy(session, {
      get: (target, k) => target[k],
      set: () => {
        throw new Error('[TheServer] Cannot update session from stream')
      },
    })

    const streamDriver = {
      stream,
    }
    return streamDriver
  }

  return StreamDriverFactory
}

toStreamDriverFactory.all = (Streams, options = {}) =>
  Object.assign(
    {},
    ...Object.entries(Streams).map(([streamName, Stream]) => ({
      [streamName]: toStreamDriverFactory(Stream, {
        streamName,
        ...options,
      }),
    })),
  )

module.exports = toStreamDriverFactory
