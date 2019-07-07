'use strict'
/**
 * Create "moduleRule" lint
 * @memberof module:@the-/lint.rules
 * @function moduleRule
 * @param {Object} config - Lint config
 * @returns {function()} Lint function
 */
const path = require('path')
const { parsePattern } = require('../helpers/parseHelper')

const _d = (m) => m.default || m

/** @lends module:@the-/lint.rules.moduleRule */
function moduleRule(config) {
  const {
    keyPattern,
    namedFromDefault = false,
    sameKeysWith,
    type,
    valuePattern,
    valueUnique = false,
    ...rest
  } = config
  if (Object.keys(rest).length > 0) {
    console.warn('[moduleRule] Unknown options', Object.keys(rest))
  }
  return async function moduleRuleCheck({ filename, report }) {
    const basename = path.basename(filename, path.extname(filename))
    const module = _d(require(path.resolve(filename)))
    if (type) {
      const actual = typeof module
      const ok = actual === type
      !ok &&
        report('Unexpected export type', {
          actual,
          expect: type,
          where: path.resolve(filename),
        })
    }

    if (keyPattern) {
      for (const key of Object.keys(module)) {
        const matcher = parsePattern(keyPattern)
        const ok = key.match && key.match(matcher)
        !ok &&
          report('Key patten not match', {
            actual: key,
            expect: matcher,
            where: path.resolve(filename),
          })
      }
    }
    if (valuePattern) {
      for (const value of Object.values(module)) {
        const matcher = parsePattern(valuePattern)
        const ok = value.match && value.match(matcher)
        !ok &&
          report('Value patten not match', {
            actual: value,
            expect: matcher,
            where: path.resolve(filename),
          })
      }
    }
    if (valueUnique) {
      const keys = Object.keys(module)
      const values = keys.map((key) => module[key])
      for (let i = 0; i < keys.length; i++) {
        const ok = values.indexOf(values[i]) === i
        !ok &&
          report('Unique violation', {
            actual: false,
            conflict: [values.indexOf(values[i]), i].map((i) => keys[i]),
            expect: true,
            value: values[i],
          })
      }
    }

    if (namedFromDefault) {
      const { displayName, name } = module.default || module
      const ok = name === basename || displayName === basename
      !ok &&
        report('Name not match', {
          actual: name || displayName,
          where: path.resolve(filename),
        })
    }

    if (sameKeysWith) {
      const module = require(path.resolve(filename))
      const target = require(path.resolve(sameKeysWith))

      const moduleKeys = Object.keys(module).sort()
      const targetKeys = Object.keys(target).sort()

      const ok = moduleKeys.join(',') === targetKeys.join(',')
      !ok &&
        report('Key not match', {
          actual: moduleKeys.join(','),
          expect: targetKeys.join(','),
          where: path.resolve(filename),
        })
    }
  }
}

module.exports = moduleRule
