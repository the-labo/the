/**
 * Create "usageRule" lint.
 * This rule makes sure target files is used in somewhere
 * @function usageRule
 * @param {Object} config - Lint config
 * @param {string} config.usedIn - Files that may use the module
 * @returns {function} Lint function
 */
'use strict'

const aglob = require('aglob')
const { readFileAsync } = require('asfs')
const path = require('path')
const stringcase = require('stringcase')

const transformFuncFor = (name) => {
  if (!stringcase[name]) {
    throw new Error(`[TheLint][usageRule] Unknown transform: ${name}`)
  }
  return stringcase[name]
}

/** @lends usageRule */
function usageRule(config) {
  const {
    ignore = '**/node_modules/**',
    keysUsedIn = null,
    transform = null,
    usedIn = null,
    ...rest
  } = config
  if (Object.keys(rest).length > 0) {
    console.warn(`[usageRule] Unknown options`, Object.keys(rest))
  }

  return async function usageRuleCheck({ content, filename, report }) {
    const transformFunc = transform ? transformFuncFor(transform) : (v) => v

    const findUnusedName = async (usedNames, usingFilenames) => {
      let unusedNames = [...usedNames]
      for (const using of await aglob(usingFilenames, { ignore })) {
        const skip = path.resolve(filename) === path.resolve(using)
        if (skip) {
          continue
        }
        const content = String(await readFileAsync(using))
        for (const usedName of [...unusedNames]) {
          const hit = content.match(usedName)
          if (hit) {
            unusedNames = unusedNames.filter((f) => f !== usedName)
          }
        }
        if (unusedNames.length === 0) {
          return []
        }
      }
      return unusedNames
    }

    const extname = path.extname(filename)
    const moduleName = transformFunc(path.basename(filename, extname))

    if (usedIn) {
      const unusedNames = await findUnusedName([moduleName], usedIn)
      const ok = unusedNames.length === 0
      !ok &&
        report('Module not used in anywhere', {
          actual: false,
          expect: usedIn,
          module: moduleName,
          where: path.resolve(filename),
        })
    }
    if (keysUsedIn) {
      const keys = Object.keys(require(path.resolve(filename)))
      const unusedNames = await findUnusedName(keys, keysUsedIn)
      const ok = unusedNames.length === 0
      !ok &&
        report('Module key not used in anywhere', {
          actual: false,
          expect: keysUsedIn,
          keys: unusedNames,
          module: moduleName,
          where: path.resolve(filename),
        })
    }
  }
}

module.exports = usageRule
