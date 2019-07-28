'use strict'
/**
 * Stream pool
 * @memberof module:@the-/server.helpers
 * @function streamPool
 */
/**
 * @memberof module:@the-/server.helpers
 * @inner
 * @class StreamDriverPool
 */
class StreamDriverPool {
  constructor({}) {
    this.instances = {}
  }

  cleanup(cid) {
    const instances = this.instances[cid] || {}
    for (const [, instance] of Object.entries(instances)) {
      const { stream } = instance
      if (!stream.closed) {
        stream.abort()
      }
    }
    this.instances[cid] = null
  }

  delInstance(cid, sid) {
    this.instances[cid] = this.instances[cid] || {}
    delete this.instances[cid][sid]
  }

  getInstance(cid, sid) {
    this.instances[cid] = this.instances[cid] || {}
    const instance = this.instances[cid][sid]
    if (!instance) {
      throw new Error(`[TheServer] Stream not found for ${sid}`)
    }
    return instance
  }

  hasInstance(cid, sid) {
    const instances = this.instances[cid] || {}
    return !!instances[sid]
  }

  setInstance(cid, sid, instance) {
    this.instances[cid] = this.instances[cid] || {}
    this.instances[cid][sid] = instance
  }
}

/** @lends module:@the-/server.helpers.streamPool */
function streamDriverPool(...args) {
  return new StreamDriverPool(...args)
}

module.exports = streamDriverPool
