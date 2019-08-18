'use strict'

/**
 * Create proxy for hash object
 * @memberof module:@the-/hash
 * @function proxy
 * @param {Object} src - Source object
 * @param {Object} [options={}] - Optional settings
 * @param {string} [options.name] - Name of object
 * @param {boolean} [options.unknownCheck] - Enable unknown checking
 * @returns {Proxy}
 */
function proxy(src, options = {}) {
  const { name = 'proxy', unknownCheck = true } = options
  if (typeof Proxy === 'undefined') {
    return Object.assign({}, src)
  }

  return new Proxy(src, {
    get(target, key) {
      const has = key in target
      if (unknownCheck) {
        const isUnknown =
          !has &&
          !/^@@/.test(String(key)) &&
          !/^__/.test(String(key)) &&
          !/^Symbol\(nodejs\./.test(String(key)) &&
          ![
            'default',
            'Symbol(Symbol.iterator)',
            'Symbol(Symbol.toStringTag)',
            'then',
            'catch',
            'finally',
            'toString',
            'toJSON',
          ].includes(String(key))
        if (isUnknown) {
          console.warn(`[${name}] Unknown property "${String(key)}"`)
        }
      }

      return target[key]
    },
  })
}

module.exports = proxy
