'use strict'
/**
 * @memberof module:@the-/client.mixins
 * @function streamMix
 * @param {function()}
 * @returns {function()}
 */
const asleep = require('asleep')
const uuid = require('uuid')
const { unlessProduction } = require('@the-/check')
const { TheQueue } = require('@the-/queue')
const { Consumer, TheStream } = require('@the-/stream')
const IOEvents = require('../constants/IOEvents')

class RemoteStream extends TheStream {
  constructor(streamName, socket) {
    super()
    this.streamName = streamName
    this.socket = socket
    this.sid = uuid.v4()
    this.tmieout = 30 * 1000
    this.closed = false
  }

  fireRemoteEvent(event, data) {
    const { sid, socket } = this
    socket.emit(event, { ...data, sid })
  }

  listenToRemoteEvent(event, handler) {
    const { socket } = this
    const handlerWrap = (received) => {
      if (received.sid === this.sid) {
        handler(received)
      }
    }
    socket.on(event, handlerWrap)
  }

  on(event, handler) {
    unlessProduction(() => {
      const isValidEvent = ['open', 'error', 'close', 'receive'].includes(event)
      if (!isValidEvent) {
        throw new Error(`[TheClient.RemoteStream] Unknown event: ${event}`)
      }
    })
    return super.on(event, handler)
  }

  async cleanup() {
    await asleep(0)
    if (!this.remoteConsumer.closed) {
      try {
        await this.remoteConsumer.abort()
      } catch (e) {
        // Do nothing
      }
    }
    if (!this.closed) {
      await this.abort()
    }
  }

  async close() {
    await super.close()
    await asleep(0)
    this.fireRemoteEvent(IOEvents.STREAM_CLOSE, {})
    await new Promise((resolve, reject) => {
      const timeoutTimer = setTimeout(() => {
        reject(new Error('[TheClient] Stream close timeout'))
      }, this.tmieout)
      this.listenToRemoteEvent(IOEvents.STREAM_DID_CLOSE, () => {
        clearTimeout(timeoutTimer)
        resolve()
      })
    })
  }

  async consume(provider) {
    for await (const chunk of provider) {
      await this.socket.emit(`${IOEvents.STREAM_CHUNK}/${this.sid}`, chunk)
    }
    await asleep(0)
    this.fireRemoteEvent(IOEvents.STREAM_FIN, {})
  }

  async open(params) {
    const { sid, socket, streamName } = this
    this.remoteConsumer = new Consumer({})
    await super.open()

    const chunkQueue = new TheQueue({ autoStart: true, name: 'chunk-queue' })
    const onChunk = async (chunk) => {
      chunkQueue.push(async () => {
        await this.remoteConsumer.waitToWrite()
        await this.remoteConsumer.write(chunk)
      })
    }
    onChunk.lock = false
    socket.on(`${IOEvents.STREAM_CHUNK}/${sid}`, onChunk)
    socket.on(IOEvents.DISCONNECT, async () => {
      await this.cleanup()
    })
    this.listenToRemoteEvent(IOEvents.STREAM_FIN, async () => {
      chunkQueue.push(async () => {
        await this.remoteConsumer.waitToWrite()
        await this.remoteConsumer.close()
      })
      await chunkQueue.wait()
    })
    this.fireRemoteEvent(IOEvents.STREAM_OPEN, { params, streamName })
    this.listenToRemoteEvent(IOEvents.STREAM_DID_CLOSE, async () => {
      socket.off(`${IOEvents.STREAM_CHUNK}/${sid}`, onChunk)
      await this.remoteConsumer.waitToWrite()
      await this.remoteConsumer.close()
      this.streamWillClose()
      if (!this.closed) {
        void this.close()
      }
    })
    this.listenToRemoteEvent(IOEvents.STREAM_ERROR, ({ error }) => {
      this.streamDidCatch(error)
    })
    await new Promise((resolve, reject) => {
      const timeoutTimer = setTimeout(() => {
        reject(new Error('[TheClient] Stream open timeout'))
      }, this.tmieout)
      this.listenToRemoteEvent(IOEvents.STREAM_DID_OPEN, () => {
        clearTimeout(timeoutTimer)
        resolve()
      })
    })
  }

  async *provide() {
    for await (const value of this.remoteConsumer.toGenerator()) {
      yield value
    }
  }
}

/** @lends module:@the-/client.mixins.streamMix */
function streamMix(Class) {
  /**
   * @inner
   * @memberOf module:@the-/client.mixins.streamMix
   */
  class StreamMixed extends Class {
    async openStream(name, params) {
      const { socket } = this
      const stream = new RemoteStream(name, socket)
      await stream.open(params)
      return stream
    }
  }

  return StreamMixed
}

module.exports = streamMix
