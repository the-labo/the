/**
 * @memberOf module:@the-/code
 * @namespace astHelper
 */
'use strict'

const astHelper = Object.freeze(
  /** @lends module:@the-/code.astHelper */
  {
    is: (node, type) => {
      if (!node) {
        return false
      }
      return node.type === type
    },
    /** @deprecated */
    isAssignmentPattern: (node) => astHelper.is(node, 'AssignmentPattern'),
    /** @deprecated */
    isEmptyObjectPattern: (node) => {
      if (!node) {
        return false
      }
      return astHelper.isObjectPattern(node) && node.properties.length === 0
    },
    /** @deprecated */
    isImportDefaultSpecifier: (node) =>
      astHelper.is(node, 'ImportDefaultSpecifier'),
    /** @deprecated */
    isImportSpecifier: (node) => astHelper.is(node, 'ImportSpecifier'),
    /** @deprecated */
    isObjectPattern: (node) => astHelper.is(node, 'ObjectPattern'),
    /** @deprecated */
    isRequireExpression: (node) => {
      if (!node) {
        return false
      }
      return (
        node.type === 'CallExpression' &&
        (node.callee && node.callee.name === 'require')
      )
    },
  },
)

module.exports = astHelper
