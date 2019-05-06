/**
 * @memberof module:@the-/support.helpers
 * @function findEvalCode
 */
'use strict'
const { finder, parse } = require('@the-/ast')

/** @lends module:@the-/support.helpersfindEvalCode */
function findEvalCode(src) {
  const parsed = parse(String(src), {})
  const CallExpressions = finder.findByTypes(parsed, ['CallExpression'])
  const evals = CallExpressions.filter((C) => C.callee.name === 'eval')
  return evals
    .map((v) => v['arguments'][0])
    .filter(Boolean)
    .filter((node) => {
      if (node.type === 'TemplateLiteral') {
        return node.expressions.length === 0
      }
      return node.type === 'StringLiteral'
    })
    .map((node) => {
      switch (node.type) {
        case 'StringLiteral':
          return {
            code: node.extra.rawValue,
            loc: node.loc.start,
          }
        case 'TemplateLiteral':
          return {
            code: node.quasis[0].value.raw,
            loc: node.loc.start,
          }
        default:
          return null
      }
    })
    .filter(Boolean)
}

module.exports = findEvalCode
