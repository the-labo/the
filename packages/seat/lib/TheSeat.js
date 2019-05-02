/**
 * @memberof module:@the-/seat
 * @class TheSeat
 */
'use strict'

const abind = require('abind')
const { get, has, remove, set } = require('json-pointer')
const mkdirp = require('mkdirp')
const path = require('path')
const {
  copyAsJsonSync,
  readAsJsonSync,
  statSync,
  writeAsJsonSync,
} = require('@the-/util-file')
const { handleUnknownOptions, randomString } = require('./helpers')
const m = require('./mixins')

const TheSeatBase = [m.lockMix, m.scopeMix].reduce(
  (Class, mix) => mix(Class),
  class Base {},
)

/** @lends module:@the-/seat.TheSeat */
class TheSeat extends TheSeatBase {
  static get DEFAULT_FILENAME() {
    const { HOME = '~' } = process.env
    return path.resolve(HOME, '.seat.json')
  }

  constructor(filename = TheSeat.DEFAULT_FILENAME, options = {}) {
    super()
    const { scopeName = null, ...rest } = options
    this.syncAt = null
    this.data = null
    this.filename = filename
    this.lockFilename = filename + '.lock'
    this.backupFilename = filename + '.bk'
    this.scopeName = scopeName
    handleUnknownOptions(rest)
    abind(this)
  }

  /**
   * Acquire value with
   * @param {string} key - Key for value
   * @param {function()} next - Next value generator
   */
  acquire(key, next) {
    if (this.has(key)) {
      return this.get(key)
    }
    let taking = next()
    while (!this.canTake(key, taking)) {
      taking = next(taking)
    }
    this.take(key, taking)
    return this.get(key)
  }

  /**
   * Acquire number value for key
   * @param {string} key - Key for value
   * @param {Object} [options={}] - Optional settings
   * @param {number} [options.base=1] - Base number
   * @param {number} [options.increment=1] - Increment amount when retry
   * @returns {number}
   */
  acquireNumber(key, options = {}) {
    const { base = 1, increment = 1, ...rest } = options
    handleUnknownOptions(rest)
    return this.acquire(key, (value = base) => value + increment)
  }

  /**
   * Acquire string value for key
   * @param {string} key - Key for value
   * @param {Object} [options={}] - Optional settings
   * @param {number} [options.bytes=4] - Byte length
   * @param {string} [options.prefix] - Prefix
   * @param {string} [options.suffix] - Suffix
   * @returns {string}
   */
  acquireString(key, options = {}) {
    const { bytes = 4, prefix = '', suffix = '', ...rest } = options
    handleUnknownOptions(rest)
    return this.acquire(key, () =>
      [prefix, randomString(bytes), suffix].join(''),
    )
  }

  /**
   * Bind accessors to key
   * @param {string} key - Key for value
   * @returns {Object} - Bound object
   */
  bind(key) {
    const namesToBind = [
      'take',
      'canTake',
      'get',
      'has',
      'release',
      'acquire',
      'acquireString',
      'acquireNumber',
    ]
    return Object.assign(
      {},
      ...namesToBind.map((name) => ({
        [name]: this[name].bind(this, key),
      })),
    )
  }

  /**
   * Check if it can taken by key
   * @param {string} key - Key for value
   * @param {*} value
   * @returns {boolean}
   */
  canTake(key, value) {
    this.sync()
    const { data } = this
    const scopePath = this.scopePathFor()
    if (!has(data, scopePath)) {
      return true
    }
    const taken = get(data, scopePath) || {}
    for (const takenKey of Object.keys(taken)) {
      const hit = taken[takenKey] === value
      if (hit) {
        return takenKey === key
      }
    }
    return true
  }

  drop() {
    this.data = {}
    this.flush()
  }

  flush() {
    const { backupFilename, data, filename } = this
    this.lock()
    mkdirp.sync(path.dirname(filename))
    copyAsJsonSync(filename, backupFilename)
    writeAsJsonSync(filename, data || {}, null, 2)
    this.unlock()
  }

  /**
   * Get value for key
   * @param {string} key - Key for value
   * @returns {*}
   */
  get(key) {
    this.sync()
    const { data } = this
    return get(data, this.scopePathFor(key))
  }

  has(key) {
    this.sync()
    const { data } = this
    return has(data, this.scopePathFor(key))
  }

  read() {
    const { filename } = this
    try {
      return readAsJsonSync(filename)
    } catch (e) {
      return null
    }
  }

  /**
   * Release value for key
   * @param {string} key - Key for value
   */
  release(key) {
    this.sync()
    const { data } = this
    remove(data, this.scopePathFor(key))
    this.flush()
  }

  /**
   * Get scoped seat
   * @param {string} scopeName - Name of sub scope
   * @returns {TheSeat.constructor}
   */
  scope(scopeName) {
    const { constructor: Constructor } = this
    return new Constructor(this.filename, {
      scopeName: this.subScopeNameOf(scopeName),
    })
  }

  sync() {
    const { filename, syncAt } = this
    const stat = statSync(filename)
    const mtimeMs = stat && stat.mtimeMs
    if (mtimeMs) {
      const unchanged = syncAt === mtimeMs
      if (unchanged) {
        return
      }
      this.syncAt = mtimeMs
    }
    this.data = this.read() || {}
  }

  /**
   * Take value
   * @param {string} key - Key for value
   * @param {*} value
   * @returns {void}
   */
  take(key, value) {
    this.sync()
    const { data } = this
    if (!this.canTake(key, value)) {
      throw new Error(`${value} is already taken by ${key}`)
    }
    const having = this.has(key)
    if (having) {
      const gotten = this.get(key)
      if (gotten === value) {
        return
      } else {
        throw new Error(
          `You need release before taking another one (key:${key}, current: ${gotten}, taking: ${value}`,
        )
      }
    }
    set(data, this.scopePathFor(key), value)
    this.data = data
    this.flush()
    this.sync()
  }
}

module.exports = TheSeat
