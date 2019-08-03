'use strict'

/**
 * @memberof module:@the-/lint.helpers
 * @class SpellCache
 */
const { readAsJson, unlinkAsync, writeAsJson } = require('@the-/util-file')

/** @lends module:@the-/lint.helpers.SpellCache */
class SpellCache {
  constructor(filename) {
    this.filename = filename
    this.needsSync = true
    this.data = null
  }

  async clear() {
    try {
      await unlinkAsync(this.filename)
    } catch (e) {
      // Do nothing
    }
  }

  async del(key) {
    await this.syncIfNeeded()
    const data = { ...this.data }
    delete data[key]
    this.data = data
    await this.flushRequest()
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
    return (await readAsJson(this.filename).catch(() => null)) || {}
  }

  async _writeFile(data) {
    await writeAsJson(this.filename, data || {})
  }
}

module.exports = SpellCache
