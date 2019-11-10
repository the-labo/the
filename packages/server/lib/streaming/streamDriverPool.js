'use strict'

/**
 * @memberof module:@the-/server.helpers
 * @function StreamDriverPool
 * @inner
 * @returns {*} */
function StreamDriverPool() {
  const instancesHash = {}
  return {
    cleanup(cid) {
      const instances = instancesHash[cid] || {}
      for (const [, instance] of Object.entries(instances)) {
        const { stream } = instance
        if (!stream.closed) {
          stream.abort()
        }
      }
      instancesHash[cid] = null
    },
    delInstance(cid, sid) {
      instancesHash[cid] = instancesHash[cid] || {}
      delete instancesHash[cid][sid]
    },
    getInstance(cid, sid) {
      instancesHash[cid] = instancesHash[cid] || {}
      const instance = instancesHash[cid][sid]
      if (!instance) {
        throw new Error(`[TheServer] Stream not found for ${sid}`)
      }

      return instance
    },
    hasInstance(cid, sid) {
      const instances = instancesHash[cid] || {}
      return !!instances[sid]
    },
    setInstance(cid, sid, instance) {
      instancesHash[cid] = instancesHash[cid] || {}
      instancesHash[cid][sid] = instance
    },
  }
}

/**
 * Stream pool
 * @memberof module:@the-/server.helpers
 * @function streamPool
 * @returns {*}
 */
function streamDriverPool(...args) {
  return StreamDriverPool(...args)
}

module.exports = streamDriverPool
