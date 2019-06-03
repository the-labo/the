'use strict'
/**
 * Create "usageRule" lint.
 * This rule makes sure target files is used in somewhere
 * @memberof module:@the-/lint.rules
 * @function usageRule
 * @param {Object} config - Lint config
 * @param {string} config.usedIn - Files that may use the module
 * @returns {function()} Lint function
 */
const aglob = require('aglob')
const { readFileAsync } = require('asfs')
const { flatten } = require('objnest')
const path = require('path')
const stringcase = require('stringcase')
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')

const transformFuncFor = (name) => {
  if (!stringcase[name]) {
    throw new Error(`[TheLint][usageRule] Unknown transform: ${name}`)
  }
  return stringcase[name]
}

/** @lends module:@the-/lint.rules.usageRule */
function usageRule(config) {
  const {
    flattenKeysUsedIn = null,
    ignore = '**/node_modules/**',
    keysUsedIn = null,
    methodsUsedIn = null,
    transform = null,
    usedIn = null,
    ...rest
  } = config
  if (Object.keys(rest).length > 0) {
    console.warn('[usageRule] Unknown options', Object.keys(rest))
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
      const required = require(path.resolve(filename))
      const keys = Object.keys(required)
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
    if (flattenKeysUsedIn) {
      const required = require(path.resolve(filename))
      const flattenKeys = Object.keys(flatten(required))
      const unusedNames = await findUnusedName(flattenKeys, flattenKeysUsedIn)
      const ok = unusedNames.length === 0
      !ok &&
        report('Module key not used in anywhere', {
          actual: false,
          expect: flattenKeysUsedIn,
          keys: unusedNames,
          module: moduleName,
          where: path.resolve(filename),
        })
    }

    if (methodsUsedIn) {
      const src = String(await readFileAsync(path.resolve(filename)))
      const Classes = finder.findByTypes(parse(src), [
        NodeTypes.ClassDeclaration,
      ])
      for (const Class of Classes) {
        const ClassMethods = finder.findByTypes(Class, [NodeTypes.ClassMethod])
        const ClassMethodNames = ClassMethods.map(
          (ClassMethod) => ClassMethod.key && ClassMethod.key.name,
        ).filter(Boolean)
        const unusedNames = await findUnusedName(
          ClassMethodNames,
          methodsUsedIn,
        )
        const ok = unusedNames.length === 0
        !ok &&
          report('Class method not used in anywhere', {
            actual: false,
            expect: methodsUsedIn,
            keys: unusedNames,
            module: moduleName,
            where: path.resolve(filename),
          })
      }
    }
  }
}

module.exports = usageRule
