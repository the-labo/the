/**
 * Mixin for queue
 * @memberOf module:@the-/resource.mixins
 * @function queueMix
 * @param {function} Class
 * @returns {function} Mixed class
 */
'use strict'

const asleep = require('asleep')

/** @lends module:@the-/resource.mixins.queueMix */
function queueMix(Class) {
  /**
   * @memberOf module:@the-/resource.mixins.queueMix
   * @inner
   */
  class QueueMixed extends Class {
    constructor() {
      super(...arguments)
      this.creatingQueue = []
    }

    async createWithQueue(attr, options = {}) {
      const { timeout = 1.5 * 1000, ...otherOptions } = options
      return new Promise((resolve, reject) => {
        this.creatingQueue.push({ attr, reject, resolve })
        void this.flushCreatingQueue({ timeout, ...otherOptions })
      })
    }

    async flushCreatingQueue({ options = {}, timeout = 0 } = {}) {
      await asleep(timeout)
      const queue = [...this.creatingQueue]
      if (queue.length === 0) {
        return []
      }
      this.creatingQueue = []
      const attributesArray = queue.map(({ attr }) => attr)
      const created = []
      try {
        const results = await this.createBulk(attributesArray, options)
        for (let i = 0; i < results.length; i++) {
          const result = results[i]
          const { resolve } = queue[i]
          resolve && resolve(result)
          created.push(result)
        }
      } catch (e) {
        for (const { reject } of queue) {
          reject && reject(e)
        }
      }
      return created
    }
  }
  return QueueMix
}

module.exports = queueMix
