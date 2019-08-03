'use strict'

/**
 * Create "propRule" lint
 * @memberof module:@the-/lint.rules
 * @function propRule
 * @param {Object} config - Lint config
 * @returns {function()} Lint function
 */
const { has } = require('json-pointer')
const path = require('path')
const interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')
const { parse, walk } = require('@the-/ast')

/** @lends module:@the-/lint.rules.propRule */
function propRule(config) {
  const { keypathAccess = {}, ...rest } = config
  if (Object.keys(rest).length > 0) {
    console.warn('[propRule] Unknown options', Object.keys(rest))
  }

  return async function propRuleCheck({ content, filename, report }) {
    function reportKeypathExpression(expression, given) {
      const {
        loc: {
          start: { column, line },
        },
      } = expression
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

    const parsed = parse(String(content), {
      sourceType: 'unambiguous',
    })
    const MemberExpressions = []
    walk.simple(parsed.program, {
      MemberExpression: (node) => MemberExpressions.push(node),
    })

    for (const [name, target] of Object.entries(keypathAccess)) {
      const { default: targetModule } = interopRequireDefault(
        require(path.resolve(target)),
      )
      for (const expression of MemberExpressions) {
        switch (expression.property.type) {
          case 'Identifier': {
            const objectNames = objectNamesFor(expression)
            if (objectNames[0] === name) {
              const names = [...objectNames.slice(1), expression.property.name]
              const key = `/${names.join('/').replace(/\./g, '/')}`
              const ok = has(targetModule, key)
              !ok && reportKeypathExpression(expression, names.join('.'))
            }

            break
          }
          case 'StringLiteral': {
            if (expression.object.name === name) {
              const {
                property: { value },
              } = expression
              const key = `/${value.replace(/\./g, '/')}`.replace(/^\/+/, '/')
              const ok = has(targetModule, key) || value in targetModule
              !ok && reportKeypathExpression(expression, value)
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
