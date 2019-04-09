/**
 * @class SFUProxyPool
 */
'use strict'

const SFUProxy = require('./SFUProxy')

/** @lends SFUProxyPool */
class SFUProxyPool {
  constructor(config = {}) {
    this.config = config
    this.proxies = {}
  }

  cleanup() {
    for (const [pid, proxy] of Object.entries(this.proxies)) {
      if (proxy.closed) {
        this.clear(pid)
      }
    }
  }

  get(pid) {
    return this.proxies[pid]
  }

  new(pid, config) {
    const created = new SFUProxy({
      ...this.config,
      pid,
      ...config,
    })
    this.proxies[pid] = created
    return created
  }

  async clear(pid) {
    const proxy = this.proxies[pid]
    if (proxy) {
      await proxy.close()
      delete this.proxies[pid]
    }
  }
}

module.exports = SFUProxyPool
