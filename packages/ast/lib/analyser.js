'use strict'

const analyzer =
  /**
   * Analyze node
   * @memberof module:@the-/ast
   * @namespace analyzer
   */
  {
    isSingleLine: (node) => {
      const { loc } = node
      return loc.start.line === loc.end.line
    },
  }

Object.freeze(analyzer)

module.exports = analyzer
