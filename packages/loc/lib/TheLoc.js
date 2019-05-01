/**
 * Locale resolver
 * @memberOf module:@the-/loc
 * @class TheLoc
 * @param {Object<string, Object>} config - Localed values
 */
'use strict'

const argx = require('argx')
const evaljson = require('evaljson')
const { sprintf } = require('sprintf-js')
const mergedLocales = require('./helpers/mergedLocales')
const resolveInScope = require('./helpers/resolveInScope')
const toCompoundLocale = require('./helpers/toCompoundLocale')
const validateLocales = require('./helpers/validateLocales')

/** @lends module:@the-/loc.TheLoc */
class TheLoc {
  constructor(config, options = {}) {
    if ('buildin' in options) {
      throw new Error(`[TheLoc] buildin is no longer supported`)
    }
    for (const namespace of Object.keys(config || {})) {
      const values = mergedLocales(config[namespace])
      this.register(namespace, values, { ctx: config })
    }
  }

  /**
   * Bind lang
   * @param {string} lang
   * @returns {Function} - Bound function
   */
  bind(lang) {
    let scope = this[lang]
    if (!scope) {
      const defaultLang = Object.keys(this)[0]
      console.warn(
        `[TheLoc] lang "${lang}" is not found. Using "${defaultLang}" instead.`,
      )
      scope = this[defaultLang]
    }
    const bound = this.resolve.bind(this, lang)
    return Object.assign(bound, scope)
  }

  /**
   * Register values for a namespace
   * @param {string} namespace
   * @param {Object} values
   * @param {Object} [options={}]
   * @param {Object} [options.ctx]
   * @param {number} [options.depth=5]
   * @returns {TheLoc} Returns this
   */
  register(namespace, values, options = {}) {
    const { ctx, depth = 5 } = options
    this[namespace] = evaljson(values, this, ctx)
    for (let i = 0; i < depth; i++) {
      this[namespace] = evaljson(values, this, ctx, this[namespace])
    }
    return this
  }

  /**
   * Resolve message for key
   * @param {string} lang - Lang to resolve
   * @param {...string} keypaths - Key to resolve
   * @returns {?string}
   */
  resolve(lang, ...keypaths) {
    const args = argx(arguments)
    lang = args.shift('string')
    const vars = args.pop('object') || {}
    const keypath = args
      .remain()
      .filter(Boolean)
      .join('.')
    if (!this[lang]) {
      throw new Error('Unknown lang:' + lang)
    }
    const searchingLang = [
      lang,
      ...Object.keys(this).filter((key) => key !== lang),
    ]
    for (const lang of searchingLang) {
      const found = resolveInScope(this[lang], keypath)
      if (found === '') {
        return found
      }
      const ok =
        (found && typeof found === 'string') || typeof found === 'number'
      if (ok) {
        try {
          return sprintf(found, vars)
        } catch (e) {
          console.warn(
            `[TheLoc] Failed to parse "${found}" with error:`,
            e.message,
          )
          return found
        }
      }
    }
    console.warn(`[TheLoc] Failed to resolve keypath: "${keypath}"`)
    return null
  }

  /**
   * Convert to compound format object
   * @returns {Object} - Compound object
   */
  toCompound() {
    const src = Object.assign({}, this)
    return toCompoundLocale(src)
  }

  toJSON() {
    return Object.assign({}, this)
  }

  /**
   * Validate this locale
   */
  validate() {
    const src = Object.assign({}, this)
    const failures = validateLocales(src)
    if (failures) {
      console.error(`[TheLoc] ${failures.length} failures found:\n`)
      const missing = failures.map(({ missing }) => missing).filter(Boolean)
      for (const { keypath, lang } of missing) {
        console.warn(`  <${lang}> "${keypath}" is missing`)
      }
    } else {
      console.log('[TheLoc] Everything is OK')
    }
  }
}

module.exports = TheLoc
