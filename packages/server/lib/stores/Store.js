/**
 * Client data store for the-server
 * @class Store
 */
'use strict'

/** @lends Store */
class Store {
  constructor(storage, options = {}) {
    const {
      cleanupInterval = null,
      expireDuration = null,
      storeKey = this.constructor.name,
    } = options
    this.storage = storage
    this.expireDuration = expireDuration
    this.cleaning = false
    this.storeKey = storeKey

    void this.cleanup()

    if (cleanupInterval) {
      setInterval(this.cleanup.bind(this), cleanupInterval).unref()
    }
  }

  /**
   * Cleanup expired data
   * @returns {Promise.<string[]>}
   */
  async cleanup() {
    const { storage } = this
    const deleted = []
    if (this.cleaning) {
      return deleted
    }
    this.cleaning = true
    for (const id of await this.ids()) {
      const has = await this.has(id)
      if (!has) {
        await this.del(id)
        deleted.push(id)
      }
    }
    this.cleaning = false
    return deleted
  }

  /**
   * Delete data
   * @param id
   * @returns {Promise<*>}
   */
  async del(id) {
    const { storage } = this
    return storage.hdel(this.storeKey, id)
  }

  /**
   * Delete all data
   * @returns {Promise<number>}
   */
  async delAll() {
    const deleted = []
    for (const id of await this.ids()) {
      await this.del(id)
      deleted.push(id)
    }
    return deleted.length
  }

  /**
   * Get data
   * @param {string} id - Data id
   * @returns {Promise.<Object>}
   */
  async get(id) {
    const { storage } = this
    const found = await storage.hget(this.storeKey, id)
    if (!found) {
      return null
    }
    const { data, expiredAt } = JSON.parse(found)
    const expired = expiredAt && new Date(expiredAt) < new Date()
    return expired ? null : data
  }

  /**
   * Check if has data
   * @param {string} id - Data id
   * @returns {Promise.<boolean>}
   */
  async has(id) {
    return !!(await this.get(id))
  }

  /**
   * Get all ids
   * @returns {Promise<string[]>}
   */
  async ids() {
    const { storage } = this
    return storage.hkeys(this.storeKey)
  }

  /**
   * Set data
   * @param {string} id - Data id
   * @param {Object} data - Data to set
   * @returns {Promise.<void>}
   */
  async set(id, data) {
    const { expireDuration, storage } = this
    const expiredAt = expireDuration
      ? new Date().getTime() + expireDuration
      : null
    const saving = JSON.stringify({
      data,
      expiredAt,
      id,
    })
    const current = await storage.hget(this.storeKey, id)
    if (saving === current) {
      return
    }
    await storage.hset(this.storeKey, id, saving)
  }
}

module.exports = Store
