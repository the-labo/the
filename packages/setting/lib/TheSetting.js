/**
 * @class TheSetting
 */
'use strict'

const abind = require('abind')
const askconfig = require('askconfig')
const aslogger = require('aslogger')
const {
  copyAsJsonSync,
  readAsJsonSync,
  statSync,
  writeAsJsonSync,
} = require('@the-/util-file')
const { numberIfPossible } = require('./helpers')
const m = require('./mixins')

const TheSettingBase = [m.lockMix].reduce(
  (Class, mix) => mix(Class),
  class Base {},
)

/** @lends TheSetting */
class TheSetting extends TheSettingBase {
  constructor(filename, defaultValues = {}, options = {}) {
    const { prefix = '[setting] ' } = options
    super()
    this.cache = null
    this.cacheAt = null
    this.filename = filename
    this.lockFilename = filename + '.lock'
    this.backupFilename = filename + '.bk'
    this.logger = aslogger({
      PREFIX: prefix,
    })

    this.logger.disabled = true
    const existing = this.get()
    this.set(Object.assign({}, defaultValues, existing || {}))
    this.logger.disabled = false

    abind(this)
  }

  /**
   * Delete value for name
   * @param {...string} names
   */
  del(...names) {
    const { logger } = this
    const values = this.get() || {}
    for (const name of names) {
      if (values.hasOwnProperty(name)) {
        delete values[name]
        logger.debug(`Value deleted: "${name}"`)
      }
    }
    this.save(Object.assign({}, values))
  }

  /**
   * Get value for name
   * @param {string} [name] - Name to get
   * @returns {*}
   */
  get(name) {
    if (arguments.length > 0) {
      const values = this.get()
      return values[name]
    }

    const { filename } = this
    const stat = statSync(filename)
    const mtimeMs = stat && stat.mtimeMs
    let notChanged = mtimeMs && mtimeMs === this.cacheAt
    if (notChanged) {
      return this.cache
    }
    try {
      const content = readAsJsonSync(this.filename)
      this.cache = content
      this.cacheAt = mtimeMs
      return content
    } catch (e) {
      const { backupFilename } = this
      throw new Error(
        `[the-setting] Failed to read value from ${filename}. ( Backup file: ${backupFilename} )`,
      )
    }
  }

  save(values) {
    const { backupFilename, filename } = this
    this.lock()
    copyAsJsonSync(filename, backupFilename)
    writeAsJsonSync(filename, Object.assign({}, values))
    this.unlock()
  }

  /**
   * Set values
   * @param {Object} values - Values to set
   */
  set(values = {}) {
    if (arguments.length === 2) {
      this.set({ [arguments[0]]: arguments[1] })
      return
    }
    const { logger } = this
    const current = this.get()
    this.save(Object.assign({}, current, values))
    logger.debug(`Data saved`)
    for (const name of Object.keys(values)) {
      logger.trace(`  ${name}: ${JSON.stringify(values[name])}`)
    }
    this.cache = null
    this.cacheAt = null
  }

  async ask() {
    const { logger } = this
    const current = this.get()
    const asked = await askconfig(current)

    const updating = {}

    for (const key of Object.keys(current)) {
      const from = current[key]
      let to = numberIfPossible(asked[key])
      if (from === to) {
        continue
      }
      logger.debug(`${key}: ${current[key]} => ${asked[key]}`)
      updating[key] = to
    }

    this.set(updating)
  }
}

module.exports = TheSetting
