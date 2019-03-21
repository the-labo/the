/**
 * Analyze node
 * @module analyzer
 */
'use strict'

const analyzer = Object.freeze(
  /** @lends analyzer */
  {
    isSingleLine: (node) => {
      const { loc } = node
      return loc.start.line === loc.end.line
    },
  },
)

module.exports = analyzer
