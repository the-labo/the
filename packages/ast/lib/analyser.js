'use strict'
/**
 * Analyze node
 * @memberof module:@the-/ast
 * @namespace analyzer
 */
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
