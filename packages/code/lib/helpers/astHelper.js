'use strict'
const astHelper =
  /**
   * @memberof module:@the-/code
   * @namespace astHelper
   */
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
        node.callee &&
        node.callee.name === 'require'
      )
    },
  }

Object.freeze(astHelper)

module.exports = astHelper
