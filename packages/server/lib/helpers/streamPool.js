/**
 * Stream pool
 * @function streamPool
 */
'use strict'

/**
 * @class StreamPool
 */
class StreamPool {
  constructor({ streamClasses }) {
    this.streamClasses = streamClasses
    this.instances = {}
  }

  cleanup(cid) {
    const instances = this.instances[cid] || {}
    for (const [sid, instance] of Object.entries(instances)) {
      if (!instance.closed) {
        instance.abort()
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

/** @lends streamPool */
function streamPool(...args) {
  return new StreamPool(...args)
}

module.exports = streamPool
