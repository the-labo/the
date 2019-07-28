/**
 * @memberof module:@the-/server.streaming
 * @protected
 * @function toStreamDriverFactory
 */
'use strict'

const asleep = require('asleep')

/** @lends module:@the-/server.streaming.toStreamDriverFactory */
function toStreamDriverFactory(Class, { cid, ioConnector, sid }) {
  class Stream extends Class {
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
  }
  function StreamDriverFactory(config) {
    const stream = new Stream(config)

    const streamDriver = {
      stream,
    }
    return streamDriver
  }
  return StreamDriverFactory
}

module.exports = toStreamDriverFactory
