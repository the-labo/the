'use strict'

/**
 * @memberof module:@the-/code
 * @class FormatCache
 */
const { readAsJson, unlinkAsync, writeAsJson } = require('@the-/util-file')

/** @lends module:@the-/code.FormatCache */
class FormatCache {
  constructor(filename, options = {}) {
    const { version = 'unknown' } = options
    this.filename = filename
    this.needsSync = true
    this.data = null
    this.version = version
  }

  async clear() {
    try {
      await unlinkAsync(this.filename)
    } catch (e) {
      // Do nothing
    }
  }

  async flush() {
    await this._writeFile(this.data)
  }

  async flushRequest() {
    await this._flushLock
    this._flushLock = this.flush()
    await this._flushLock
  }

  async get(key) {
    await this.syncIfNeeded()
    if (!this.data) {
      this.data = await this._readFile()
    }

    return this.data[key]
  }

  async set(key, val) {
    await this.syncIfNeeded()
    this.data = {
      ...this.data,
      [key]: val,
    }
    await this.flushRequest()
  }

  async sync() {
    this.data = (await this._readFile().catch(() => null)) || {}
  }

  async syncIfNeeded() {
    if (this.needsSync) {
      await this._syncLock
      this._syncLock = this.sync()
      this.needsSync = false
      await this._syncLock
    }
  }

  async _readFile() {
    const data = (await readAsJson(this.filename).catch(() => null)) || {}
    if (data.$$version !== this.version) {
      return {}
    }

    delete data.$$version
    return data
  }

  async _writeFile(data) {
    await writeAsJson(this.filename, {
      ...(data || {}),
      $$version: this.version,
    })
  }
}

module.exports = FormatCache
