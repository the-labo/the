'use strict'
/**
 * @memberof module:@the-/bin
 * @class TheBin
 * @param {string} cmd - Command
 * @param {Object} [options={}] - Optional settings
 * @param {string} [options.guide] - Guide string
 * @param {string} [options.versionOption=--version] - Option string for version
 */
const { exec, spawn } = require('child_process')
const fs = require('fs')
const hasbin = require('hasbin')
const path = require('path')
const semver = require('semver')
const { promisify } = require('util')
const { unlessProduction } = require('@the-/check')

const statAsync = promisify(fs.stat)
const execAsync = promisify(exec)

/** @lends module:@the-/bin.TheBin */
class TheBin {
  constructor(cmd, options = {}) {
    const { guide = null, versionOption = '--version', ...rest } = options
    unlessProduction(() => {
      if (!cmd) {
        throw new Error('cmd is required')
      }
      const unknownOptions = Object.keys(rest)
      if (unknownOptions.length > 0) {
        console.warn('[TheBin] Unknown options: ', unknownOptions)
      }
    })

    this.cmd = String(cmd).trim()
    this.config = {
      guide,
      versionOption,
    }
  }

  bind() {
    const { cmd, config } = this
    const methods = Object.getOwnPropertyNames(TheBin.prototype)
      .filter((name) => typeof this[name] === 'function')
      .filter((name) => !['constructor'].includes(name))
      .reduce(
        (methods, name) => ({ ...methods, [name]: this[name].bind(this) }),
        {},
      )
    return Object.assign(methods.exec, methods, { cmd, config })
  }

  /**
   * Execute bin file
   * @param {...*} args - Arguments to pass
   * @returns {Promise<undefined>}
   */
  async exec(...args) {
    return new Promise((resolve, reject) => {
      const spawned = spawn(this.cmd, args, {
        env: { ...process.env },
        stdio: 'inherit',
      })
      spawned.on('error', (e) => reject(e))
      spawned.on('close', () => resolve())
    })
  }

  /**
   * Check if bin exists
   * @returns {Promise<boolean>}
   */
  async exists() {
    const { cmd } = this
    const asBin = await new Promise((resolve) =>
      hasbin(cmd, (exists) => resolve(exists)),
    )
    if (asBin) {
      return true
    }
    const asFile = !!(await statAsync(path.resolve(cmd)).catch(() => null))
    return asFile
  }

  /**
   * Satisfies version or not
   * @param {string} versionString - Version string to check
   * @returns {Promise<boolean>}
   */
  async satisfiesVersion(versionString) {
    const actual = await this.version()
    return semver.satisfies(actual, versionString)
  }

  async throwIfNotExists() {
    const exists = await this.exists()
    const { guide } = this.config
    if (!exists) {
      const message = [
        `[TheBin]${this.cmd} not exists`,
        guide && `( ${guide} )`,
      ]
        .filter(Boolean)
        .join(' ')
      throw new Error(message)
    }
  }

  /**
   * Verify the bin
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<boolean>}
   */
  async verify(options = {}) {
    const exists = await this.exists()
    if (!exists) {
      return false
    }
    const { version } = options
    if (version) {
      const satisfiesVersion = await this.satisfiesVersion(version)
      if (!satisfiesVersion) {
        return false
      }
    }
    return true
  }

  /**
   * Get command version
   * @returns {Promise<string>}
   */
  async version() {
    const {
      cmd,
      config: { versionOption },
    } = this
    const { stdout } = await execAsync(
      [cmd, versionOption].filter(Boolean).join(' '),
    )
    return String(stdout).trim()
  }
}

module.exports = TheBin
