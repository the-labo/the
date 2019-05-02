/**
 * @memberof module:@the-/stream
 * @class TheStream
 * @param {Object} [options={}]
 */
'use strict'

const asleep = require('asleep')
const Consumer = require('./Consumer')
const Provider = require('./Provider')

/** @lends module:@the-/stream */
class TheStream {
  constructor(options = {}) {
    const { app, client, params } = options
    this.app = app
    this.client = client
    this.opened = false
    this.params = params
  }

  assertNotClosed() {
    if (this.closed) {
      throw new Error(`[TheStream] Stream already closed!`)
    }
  }

  assertNotOpened() {
    if (this.opened) {
      throw new Error(`[TheStream] Stream already opened!`)
    }
  }

  streamDidCatch(e) {
    console.error(`[TheStream] Error`, e)
  }

  streamDidOpen() {}

  streamWillAbort() {}

  streamWillClose() {}

  async abort() {
    this.assertNotClosed()
    this.streamWillAbort()
    if (this.consumer) {
      await this.consumer.abort()
    }
    if (this.provider) {
      await this.provider.abort()
    }
  }

  async close() {
    if (this.closed) {
      return
    }
    this.assertNotClosed()
    this.streamWillClose()
    if (this.consumer) {
      await this.consumer.close()
      this.consumer = null
    }
    if (this.provider) {
      await this.provider.close()
      this.provider = null
    }
    this.opened = false
    this.closed = true
  }

  async consume(provider) {
    // Should be overridden
  }

  async open() {
    this.assertNotOpened()
    this.opened = true
    this.consumer = new Consumer()
    this.provider = new Provider(this.provide())
    this.streamDidOpen()
    void this.consume(this.consumer.toGenerator()).catch((e) => {
      this.streamDidCatch(e)
    })
  }

  /**
   * Pull next chunk
   * @returns {Promise<undefined>}
   */
  async pull() {
    this.assertNotClosed()
    const { done, value } = await this.provider.read()
    this.pullDone = done
    return value
  }

  /**
   * Push chunk
   * @param {...*} chunks - Chunk data to push
   * @returns {Promise<undefined>}
   */
  async push(...chunks) {
    this.assertNotClosed()
    await this._pushLock
    this._pushLock = (async () => {
      await this.consumer.waitToWrite()
      for (const chunk of chunks) {
        await this.consumer.write(chunk)
      }
      await this.consumer.waitToWrite()
      this._pushLock = null
    })()
    await this._pushLock
    await asleep(0) // Next tick
  }

  /**
   * Finish pushing
   * @returns {Promise<undefined>}
   */
  async pushEnd() {
    this.assertNotClosed()
    await this._pushLock
    await asleep(0) // Next tick
    if (await this.consumer) {
      await this.consumer.waitToWrite()
      await this.consumer.close()
    }
  }

  async *provide() {
    // Should be overridden
  }
}

TheStream.Provider = Provider
TheStream.Consumer = Consumer

module.exports = TheStream
