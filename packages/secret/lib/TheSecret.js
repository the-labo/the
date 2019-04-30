/**
 * @memberOf module:@the-/secret
 * @class TheSecret
 * @augments CryptoMixed
 * @augments LockMixed
 */
'use strict'

const abind = require('abind')
const aslogger = require('aslogger')
const crypto = require('crypto')
const path = require('path')
const qs = require('qs')
const { readAsJsonSync, statSync, writeAsJsonSync } = require('@the-/util-file')
const m = require('./mixins')
const pkg = require('../package')
const TheSecretBase = [m.cryptoMix, m.lockMix].reduce(
  (Class, mix) => mix(Class),
  class Base {},
)

const IV_LENGTH = 16

/** @lends module:@the-/secret.TheSecret */
class TheSecret extends TheSecretBase {
  constructor(filename, password, options = {}) {
    const {
      algorithm = 'aes-256-cbc',
      cryptPrefix = 'data:encrypted;the-secret,',
      metaFieldKey = '__encryption__',
      prefix = '[secret] ',
      silent = false,
    } = options
    super()
    if (!password) {
      throw new Error(`[TheSecret] Password is required`)
    }
    this.filename = filename
    this.lockFilename = filename + '.lock'
    this.metaFieldKey = metaFieldKey
    this.logger = aslogger({
      PREFIX: prefix,
      disabled: silent,
    })
    this.setupCrypt({ algorithm, password, prefix: cryptPrefix })
    abind(this)
  }

  /**
   * Descript data in file
   */
  decrypt() {
    const data = this.get()
    if (!data) {
      return
    }
    const meta = qs.parse(data[this.metaFieldKey] || '')
    const iv = 'iv' in meta ? Buffer.from(meta.iv, 'hex') : null
    const decrypted = this.decryptData(data, { iv })
    delete decrypted[this.metaFieldKey]
    this.save(decrypted)
  }

  /**
   * Encrypt data in file
   */
  encrypt() {
    const data = this.get()
    if (!data) {
      return
    }

    const meta = qs.parse(data[this.metaFieldKey] || '')
    const iv =
      'iv' in meta ? Buffer.from(meta.iv, 'hex') : crypto.randomBytes(IV_LENGTH)
    const encrypted = this.encryptData(data, { iv })
    this.save({
      ...encrypted,
      [this.metaFieldKey]: qs.stringify({
        by: [pkg.name, pkg.version].join('@'),
        iv: iv.toString('hex'),
      }),
    })
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
    const notChanged = mtimeMs && mtimeMs === this.cacheAt
    if (notChanged) {
      return this.cache
    }
    const content = this.decryptData(readAsJsonSync(this.filename))
    this.cache = content
    this.cacheAt = mtimeMs
    return content
  }

  save(data) {
    const before = readAsJsonSync(this.filename)
    this.lock()
    writeAsJsonSync(this.filename, data)
    this.unlock()
    const after = readAsJsonSync(this.filename)
    const changed = JSON.stringify(before) !== JSON.stringify(after)
    if (changed) {
      const cwd = process.cwd()
      this.logger.debug(`File updated: ${path.relative(cwd, this.filename)}`)
    }
  }

  /**
   * Write out into external file
   * @param {string} filename
   */
  writeout(filename) {
    const data = this.get()
    writeAsJsonSync(filename, data)
  }
}

module.exports = TheSecret
