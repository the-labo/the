'use strict'

/**
 * Configuration for prettier
 * @memberof module:@the-/const-code
 * @namespace PrettierConfig
 */
module.exports = Object.freeze(
  /** @lends module:@the-/const-code.PrettierConfig */
  {
    arrowParens: 'always',
    jsxBracketSameLine: false,
    jsxSingleQuote: true,
    parser: 'babel',
    quoteProps: 'as-needed',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  },
)
