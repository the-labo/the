/**
 * @memberof module:@the-/stream
 * @class Provider
 */
'use strict'

const generatorFromReadable = require('./helpers/generatorFromReadable')
const { ReadableStream } = require('./helpers/webStreams')

/** @lends module:@the-/stream.Provider */
class Provider {
  constructor(generator) {
    const readable = new ReadableStream({
      pull: async (controller) => {
        const { done, value } = await generator.next()
        if (done) {
          controller.close()
        } else {
          controller.enqueue(value)
        }
      },
      start: async (controller) => {
        this.readableController = controller
      },
    })
    this.reader = readable.getReader()
    this.closed = false
    this.done = false
  }

  toGenerator() {
    return generatorFromReadable(this)
  }

  async abort(reason) {
    if (this.reader) {
      await this.reader.cancel(reason)
      this.reader = null
    }
  }

  async close() {
    this.reader = null
    this.closed = true
  }

  async read() {
    if (this.done) {
      throw new Error(`[TheStream][Provider] Already done!`)
    }
    const { done, value } = await this.reader.read()
    this.done = done
    return { done, value }
  }
}

module.exports = Provider
