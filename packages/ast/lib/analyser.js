/**
 * Analyze node
 * @memberOf module:@the-/ast
 * @namespace analyzer
 */
'use strict'

const analyzer = Object.freeze(
  /** @lends module:@the-/ast.analyzer */
  {
    isSingleLine: (node) => {
      const { loc } = node
      return loc.start.line === loc.end.line
    },
  },
)

module.exports = analyzer
