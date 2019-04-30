/**
 * @class ThePS
 * @memberOf module:@the-/ps
 * @param {string} filename - PID filename
 * @param {Object} [options={}] - Optional settings
 * @param {boolean} [options.logging=false] - Enable logs
 */
'use strict'

const asleep = require('asleep')
const fs = require('fs')
const mkdirp = require('mkdirp')
const npid = require('npid')
const path = require('path')
const psList = require('ps-list')
const terminate = require('terminate')
const yesno = require('yesno')
const { isProduction } = require('@the-/check')

/** @lends module:@the-/ps.ThePS */
class ThePS {
  constructor(filename = 'var/the.pid', options = {}) {
    const { killPolicy = 'ask', logging = !isProduction() } = options
    this.filename = filename
    this.pid = null
    this.logging = logging
    this.killPolicy = killPolicy
  }

  cleanup() {
    const pid = this.read()
    if (!pid) {
      return false
    }
    const isMe = String(pid) === String(process.pid)
    if (!isMe) {
      return false
    }
    this.del()
    return true
  }

  del() {
    const { pid } = this
    if (!pid) {
      return
    }
    pid.remove()
    this.pid = null
  }

  log(...messages) {
    this.logging && console.log(...messages)
  }

  read() {
    const { filename } = this
    try {
      return String(fs.readFileSync(filename)).trim()
    } catch (e) {
      return null
    }
  }

  write() {
    const { filename } = this
    mkdirp.sync(path.dirname(filename))
    this.pid = npid.create(filename, true)
  }

  /**
   * Generate pid and remove on exit.
   * @returns {Promise<void>}
   */
  async acquire() {
    const pid = this.read()
    if (pid) {
      const isMe = String(pid) === String(process.pid)
      if (isMe) {
        return
      }
      await asleep(Math.random() * 100)
      const exists = (await psList(pid)).some(
        (ps) => String(ps.pid) === String(pid),
      )
      const abort = exists && !(await this.canKill(pid))
      if (abort) {
        process.exit(1)
        throw new Error(`[the-ps] Failed to acquire`)
      }
      try {
        const killed = await this.kill(pid)
        if (killed) {
          this.log(`[the-ps] Process killed:`, killed)
        }
      } catch (e) {
        // Do nothing
      }
    }
    const { filename } = this
    this.write()
    this.log(
      `[the-ps] PID file created:`,
      path.relative(process.cwd(), filename),
    )

    const cleanup = () => {
      const cleaned = this.cleanup()
      if (cleaned) {
        this.log(
          `[the-ps] PID file deleted:`,
          path.relative(process.cwd(), filename),
        )
      }
      process.nextTick(() => {
        process.exit(0)
      })
    }
    process.setMaxListeners(process.getMaxListeners() + 1)
    process.on('exit', cleanup)
    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
  }

  async canKill(pid) {
    switch (this.killPolicy) {
      case 'ask': {
        return new Promise((resolve) =>
          yesno.ask(
            `[the-ps] There is another process (pid: ${pid}) exists. Do you want to kill it? [y/N]`,
            false,
            (res) => resolve(res),
          ),
        )
      }
      case 'force':
        return true
      case 'never':
        return false
      default:
        throw new Error(`[ThePS]Unknown killPolicy: ${this.killPolicy}`)
    }
  }

  async kill(pid) {
    return new Promise((resolve, reject) =>
      terminate(pid, (err) => (err ? reject(err) : resolve(pid))),
    )
  }
}

module.exports = ThePS
