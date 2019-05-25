'use strict'
/**
 * @memberof module:@the-/store
 * @namespace helpers
 */
const { get, has } = require('json-pointer')
const { flatten } = require('objnest')

/** @lends module:@the-/store.helpers */
module.exports = {
  parseDef(obj) {
    const flattened = flatten(obj)

    const REF_SUFFIX = /\.\$ref$|\.\$ref\[[0-9]\]+|\.\$ref\[length]$/
    const LENGTH_SUFFIX = /\.\$ref\[length]/
    const LOCAL_POINTER_PREFIX = /^#/

    function resolveRef(ref) {
      if (Array.isArray(ref)) {
        return Object.assign({}, ...ref.map((ref) => resolveRef(ref)))
      }
      ref = ref.replace(/\./g, '/')
      if (!LOCAL_POINTER_PREFIX.test(ref)) {
        ref = `#/${ref}`
      }
      const pointer = ref.replace(LOCAL_POINTER_PREFIX, '')
      if (!has(obj, pointer)) {
        throw new Error(`Invalid ref: "${ref}"`)
      }
      const resolved = get(obj, pointer)
      const { $ref } = resolved
      if ($ref) {
        Object.assign(resolved, resolveRef($ref))
        delete resolved.$ref
      }
      return resolved
    }

    return Object.assign(
      {},
      ...Object.keys(flattened)
        .filter((key) => !/^_/.test(key))
        .map((key) => {
          if (REF_SUFFIX.test(key)) {
            const ref = flattened[key]
            if (LENGTH_SUFFIX.test(key)) {
              return {}
            }
            return flatten({ [key.replace(REF_SUFFIX, '')]: resolveRef(ref) })
          }
          return { [key]: flattened[key] }
        }),
    )
  },
  setByNamepath(target, namepath, value, separator = '.') {
    const resolvedNames = []
    const names = namepath.split(separator)
    while (names.length > 1) {
      const name = names.shift()
      resolvedNames.push(name)
      target = target[name]
      if (!target) {
        throw new Error(`Invalid name path: ${resolvedNames.join(separator)}`)
      }
    }
    target[names.shift()] = value
  },
}
