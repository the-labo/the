/**
 * @memberof module:@the-/stream
 * @class Consumer
 */
'use strict'

const generatorFromReadable = require('./helpers/generatorFromReadable')
const { ReadableStream, WritableStream } = require('./helpers/webStreams')

/** @lends module:@the-/stream.Consumer */
class Consumer {
  constructor() {
    const readable = new ReadableStream({
      start: async (controller) => {
        this.readableController = controller
      },
    })
    const writable = new WritableStream({
      write: async (chunk) => {
        this.readableController.enqueue(chunk)
      },
    })
    this.reader = readable.getReader()
    this.writer = writable.getWriter()
    this.closed = false
    this.aborted = false
  }

  assertNotClosed() {
    if (this.closed) {
      throw new Error(`[TheStream][Consumer] Already closed!`)
    }
  }

  toGenerator() {
    return generatorFromReadable(this)
  }

  async abort(reason) {
    this.aborted = true
    if (this.aborted) {
      return
    }
    if (this.reader) {
      await this.reader.cancel(reason)
      this.reader = null
    }
    if (this.writer) {
      await this.writer.abort(reason)
      this.writer = null
    }
  }

  async close() {
    if (this.closed) {
      return
    }
    if (this.aborted) {
      return
    }
    this.closed = true
    if (this.writer) {
      await this.writer.ready
      await this.writer.close()
      this.writer = null
    }
    if (this.readableController) {
      await this.readableController.close()
      this.readableController = null
    }
    if (this.reader) {
      await this.reader.closed
      this.reader = null
    }
  }

  async read() {
    this.assertNotClosed()
    return this.reader.read()
  }

  async waitToWrite() {
    if (this.writer) {
      await this.writer.ready
    }
  }

  async write(chunk) {
    this.assertNotClosed()
    await this.writer.write(chunk)
  }
}

module.exports = Consumer
