'use strict'

const PrettierConfig =
  /**
   * Configuration for prettier
   * @memberof module:@the-/const-code
   * @namespace PrettierConfig
   */
  {
    arrowParens: 'always',
    jsxBracketSameLine: false,
    jsxSingleQuote: true,
    parser: 'babel',
    quoteProps: 'as-needed',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  }

Object.freeze(PrettierConfig)

module.exports = PrettierConfig
