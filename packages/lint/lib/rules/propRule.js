/**
 * Create "propRule" lint
 * @function propRule
 * @param {Object} config - Lint config
 * @returns {function} Lint function
 */
'use strict'

const { has } = require('json-pointer')
const path = require('path')
const { parse, walk } = require('the-ast')

/** @lends propRule */
function propRule(config) {
  const { keypathAccess = {}, ...rest } = config
  if (Object.keys(rest).length > 0) {
    console.warn(`[propRule] Unknown options`, Object.keys(rest))
  }
  return async function propRuleCheck({ content, filename, report }) {
    function reportKeypathExpression(expression, given) {
      let { column, line } = expression.loc.start
      report(`Keypath not found: "${given}"`, {
        actual: true,
        code: String(content).substring(expression.start, expression.end),
        expect: false,
        given,
        loc: { column, line },
        where: path.resolve(filename),
      })
    }

    function objectNamesFor(expression) {
      const objectNames = []
      let { object } = expression
      while (object) {
        const objectName = object.property ? object.property.name : object.name
        if (!objectName) {
          return []
        }
        objectNames.unshift(objectName)
        object = object.object
      }
      return objectNames
    }

    const extname = path.extname(filename)
    const parsed = parse(String(content), {
      sourceType: 'unambiguous',
    })
    const MemberExpressions = []
    walk.simple(parsed.program, {
      MemberExpression: (node) => MemberExpressions.push(node),
    })

    for (const [name, target] of Object.entries(keypathAccess)) {
      const targetModule = require(path.resolve(target))
      for (const expression of MemberExpressions) {
        switch (expression.property.type) {
          case 'StringLiteral': {
            if (expression.object.name === name) {
              const { value } = expression.property
              const key = ('/' + value.replace(/\./g, '/')).replace(/^\/+/, '/')
              const ok = has(targetModule, key) || value in targetModule
              !ok && reportKeypathExpression(expression, value)
            }
            break
          }
          case 'Identifier': {
            const objectNames = objectNamesFor(expression)
            if (objectNames[0] === name) {
              const names = [...objectNames.slice(1), expression.property.name]
              const key = '/' + names.join('/').replace(/\./g, '/')
              const ok = has(targetModule, key)
              !ok && reportKeypathExpression(expression, names.join('.'))
            }
            break
          }
          default:
            break
        }
      }
    }
  }
}

module.exports = propRule
